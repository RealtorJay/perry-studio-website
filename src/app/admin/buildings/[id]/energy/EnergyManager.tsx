"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface EnergyEntry {
  id: string;
  month: string;
  kwh_usage: number | null;
  cost_dollars: number | null;
  waste_identified: number | null;
  savings_achieved: number | null;
  health_score: number | null;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    if (values.length !== headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, j) => {
      row[h] = values[j];
    });
    rows.push(row);
  }

  return rows;
}

function mapColumn(row: Record<string, string>, candidates: string[]): string {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== "") return row[key];
  }
  return "";
}

export default function EnergyManager({
  buildingId,
  energyData,
}: {
  buildingId: string;
  energyData: EnergyEntry[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [aiStatus, setAiStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    month: "",
    kwh_usage: "",
    cost_dollars: "",
    waste_identified: "",
    savings_achieved: "",
    health_score: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    await supabase.from("energy_data").insert({
      building_id: buildingId,
      month: form.month + "-01",
      kwh_usage: form.kwh_usage ? parseFloat(form.kwh_usage) : null,
      cost_dollars: form.cost_dollars ? parseFloat(form.cost_dollars) : null,
      waste_identified: form.waste_identified
        ? parseFloat(form.waste_identified)
        : null,
      savings_achieved: form.savings_achieved
        ? parseFloat(form.savings_achieved)
        : null,
      health_score: form.health_score ? parseInt(form.health_score) : null,
    });

    setForm({
      month: "",
      kwh_usage: "",
      cost_dollars: "",
      waste_identified: "",
      savings_achieved: "",
      health_score: "",
    });
    setShowForm(false);
    setLoading(false);
    router.refresh();
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);
    setAiStatus(null);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        setUploadStatus("No data rows found in CSV.");
        setUploading(false);
        return;
      }

      const supabase = createClient();
      let inserted = 0;
      let skipped = 0;

      for (const row of rows) {
        // Flexible column matching
        const month = mapColumn(row, ["month", "date", "period"]);
        const kwh = mapColumn(row, [
          "kwh_usage",
          "kwh",
          "usage",
          "energy",
          "consumption",
        ]);
        const cost = mapColumn(row, [
          "cost_dollars",
          "cost",
          "amount",
          "bill",
          "total",
        ]);
        const waste = mapColumn(row, [
          "waste_identified",
          "waste",
          "waste_dollars",
        ]);
        const savings = mapColumn(row, [
          "savings_achieved",
          "savings",
          "savings_dollars",
        ]);
        const health = mapColumn(row, [
          "health_score",
          "health",
          "score",
        ]);

        if (!month) {
          skipped++;
          continue;
        }

        // Parse month — handle YYYY-MM, YYYY-MM-DD, MM/YYYY, etc.
        let monthDate: string;
        if (/^\d{4}-\d{2}$/.test(month)) {
          monthDate = month + "-01";
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(month)) {
          monthDate = month.slice(0, 7) + "-01";
        } else {
          const parsed = new Date(month);
          if (isNaN(parsed.getTime())) {
            skipped++;
            continue;
          }
          monthDate = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-01`;
        }

        const cleanNum = (v: string) => {
          if (!v) return null;
          const n = parseFloat(v.replace(/[$,]/g, ""));
          return isNaN(n) ? null : n;
        };

        const { error } = await supabase.from("energy_data").insert({
          building_id: buildingId,
          month: monthDate,
          kwh_usage: cleanNum(kwh),
          cost_dollars: cleanNum(cost),
          waste_identified: cleanNum(waste),
          savings_achieved: cleanNum(savings),
          health_score: health ? parseInt(health) || null : null,
        });

        if (error) {
          skipped++;
        } else {
          inserted++;
        }
      }

      setUploadStatus(
        `Uploaded ${inserted} row${inserted !== 1 ? "s" : ""}${skipped > 0 ? `, ${skipped} skipped` : ""}.`
      );

      // Auto-trigger AI analysis if we inserted data
      if (inserted > 0) {
        setAiStatus("Generating AI insights...");
        try {
          const res = await fetch("/api/ai/insights", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ building_id: buildingId }),
          });
          if (res.ok) {
            setAiStatus("AI insights generated — view them in the Insights tab.");
          } else {
            const data = await res.json();
            setAiStatus(
              data.error === "Admin access required"
                ? "AI insights require an API key. Add ANTHROPIC_API_KEY to .env.local."
                : `AI analysis skipped: ${data.error || "unknown error"}`
            );
          }
        } catch {
          setAiStatus("AI analysis skipped — could not reach the API.");
        }
      }

      router.refresh();
    } catch {
      setUploadStatus("Failed to parse CSV file.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="mt-8">
      {/* CSV Upload */}
      <div className="mb-8 border border-dashed border-ps-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-semibold text-ps-black">
              Upload Energy Data
            </h3>
            <p className="text-[13px] text-ps-gray mt-1">
              CSV with columns: month, kwh, cost, waste, savings, health.
              Flexible column names accepted.
            </p>
          </div>
          <label
            className={`shrink-0 bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold cursor-pointer hover:bg-ps-black/90 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            {uploading ? "Uploading..." : "Upload CSV"}
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>
        </div>
        {uploadStatus && (
          <p className="mt-3 text-[13px] text-ps-gold font-medium">
            {uploadStatus}
          </p>
        )}
        {aiStatus && (
          <p className="mt-1 text-[13px] text-ps-gray">
            {aiStatus}
          </p>
        )}
      </div>

      {/* Data table */}
      {energyData.length > 0 ? (
        <div className="border border-ps-border rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ps-subtle">
                <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                  Month
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                  kWh
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                  Cost
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide hidden md:table-cell">
                  Waste
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide hidden md:table-cell">
                  Savings
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                  Health
                </th>
              </tr>
            </thead>
            <tbody>
              {energyData.map((e) => (
                <tr key={e.id} className="border-t border-ps-border">
                  <td className="px-4 py-3 text-[14px] text-ps-black">
                    {new Date(e.month).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray">
                    {e.kwh_usage?.toLocaleString() ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray">
                    {e.cost_dollars != null
                      ? `$${e.cost_dollars.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray hidden md:table-cell">
                    {e.waste_identified != null
                      ? `$${e.waste_identified.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray hidden md:table-cell">
                    {e.savings_achieved != null
                      ? `$${e.savings_achieved.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-black font-semibold">
                    {e.health_score ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[14px] text-ps-gray">No energy data yet.</p>
      )}

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 border border-ps-border rounded-xl p-6 space-y-4"
        >
          <h3 className="text-[16px] font-semibold text-ps-black">
            Add Monthly Data
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Month *
              </label>
              <input
                type="month"
                required
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                kWh Usage
              </label>
              <input
                type="number"
                value={form.kwh_usage}
                onChange={(e) => setForm({ ...form, kwh_usage: e.target.value })}
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Cost ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.cost_dollars}
                onChange={(e) =>
                  setForm({ ...form, cost_dollars: e.target.value })
                }
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Waste ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.waste_identified}
                onChange={(e) =>
                  setForm({ ...form, waste_identified: e.target.value })
                }
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Savings ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.savings_achieved}
                onChange={(e) =>
                  setForm({ ...form, savings_achieved: e.target.value })
                }
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Health Score (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.health_score}
                onChange={(e) =>
                  setForm({ ...form, health_score: e.target.value })
                }
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Data"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-[14px] text-ps-gray"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 border border-dashed border-ps-border rounded-xl p-5 w-full text-center text-[14px] text-ps-gray hover:text-ps-black hover:border-ps-gray transition-colors"
        >
          + Add Monthly Data Manually
        </button>
      )}
    </div>
  );
}
