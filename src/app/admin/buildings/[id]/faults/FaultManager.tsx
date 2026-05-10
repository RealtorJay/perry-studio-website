"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Fault {
  id: string;
  title: string;
  description: string | null;
  severity: string;
  status: string;
  detected_at: string;
  resolved_at: string | null;
  cost_impact: number | null;
}

const severityColors: Record<string, string> = {
  low: "bg-ps-subtle text-ps-gray",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-orange-50 text-orange-700",
  critical: "bg-red-50 text-red-700",
};

const statusColors: Record<string, string> = {
  open: "bg-red-50 text-red-700",
  monitoring: "bg-amber-50 text-amber-700",
  resolved: "bg-green-50 text-green-700",
};

export default function FaultManager({
  buildingId,
  faults,
}: {
  buildingId: string;
  faults: Fault[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "medium",
    cost_impact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    await supabase.from("faults").insert({
      building_id: buildingId,
      title: form.title,
      description: form.description || null,
      severity: form.severity,
      cost_impact: form.cost_impact ? parseFloat(form.cost_impact) : null,
    });

    setForm({ title: "", description: "", severity: "medium", cost_impact: "" });
    setShowForm(false);
    setLoading(false);
    router.refresh();
  };

  const handleStatusChange = async (faultId: string, newStatus: string) => {
    const supabase = createClient();
    await supabase
      .from("faults")
      .update({
        status: newStatus,
        resolved_at: newStatus === "resolved" ? new Date().toISOString() : null,
      })
      .eq("id", faultId);
    router.refresh();
  };

  return (
    <div className="mt-8">
      {faults.length > 0 ? (
        <div className="space-y-3">
          {faults.map((f) => (
            <div
              key={f.id}
              className="border border-ps-border rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-ps-black">
                    {f.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${severityColors[f.severity] || ""}`}
                    >
                      {f.severity}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[f.status] || ""}`}
                    >
                      {f.status}
                    </span>
                    <span className="text-[12px] text-ps-gray">
                      {new Date(f.detected_at).toLocaleDateString()}
                    </span>
                    {f.cost_impact != null && (
                      <span className="text-[12px] text-ps-gray">
                        ${f.cost_impact.toLocaleString()} impact
                      </span>
                    )}
                  </div>
                  {f.description && (
                    <p className="text-[13px] text-ps-gray mt-2">
                      {f.description}
                    </p>
                  )}
                </div>
                <select
                  value={f.status}
                  onChange={(e) => handleStatusChange(f.id, e.target.value)}
                  className="text-[12px] border border-ps-border rounded-lg px-2 py-1 bg-white shrink-0"
                >
                  <option value="open">Open</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[14px] text-ps-gray">No faults recorded.</p>
      )}

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 border border-ps-border rounded-xl p-6 space-y-4"
        >
          <h3 className="text-[16px] font-semibold text-ps-black">Add Fault</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
                placeholder="e.g., AHU-2 economizer stuck"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Severity
              </label>
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] bg-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-ps-black mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] resize-none"
            />
          </div>
          <div className="max-w-xs">
            <label className="block text-[14px] font-medium text-ps-black mb-1">
              Estimated Cost Impact ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={form.cost_impact}
              onChange={(e) => setForm({ ...form, cost_impact: e.target.value })}
              className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Fault"}
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
          + Add Fault
        </button>
      )}
    </div>
  );
}
