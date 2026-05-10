"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const reportTypes = [
  { value: "energy_audit", label: "Energy Audit" },
  { value: "monthly", label: "Monthly Report" },
  { value: "quarterly", label: "Quarterly Report" },
  { value: "rcx", label: "Retro-Commissioning" },
  { value: "fault_summary", label: "Fault Summary" },
];

interface Report {
  id: string;
  title: string;
  report_type: string;
  summary: string | null;
  file_url: string | null;
  created_at: string;
}

export default function ReportManager({
  buildingId,
  reports,
}: {
  buildingId: string;
  reports: Report[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    report_type: "energy_audit",
    summary: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    let fileUrl: string | null = null;

    if (file) {
      const filePath = `${buildingId}/${Date.now()}-${file.name}`;
      const { data: uploadData } = await supabase.storage
        .from("reports")
        .upload(filePath, file);

      if (uploadData) {
        const { data: urlData } = supabase.storage
          .from("reports")
          .getPublicUrl(filePath);
        fileUrl = urlData.publicUrl;
      }
    }

    await supabase.from("reports").insert({
      building_id: buildingId,
      title: form.title,
      report_type: form.report_type,
      summary: form.summary || null,
      file_url: fileUrl,
    });

    setForm({ title: "", report_type: "energy_audit", summary: "" });
    setFile(null);
    setShowForm(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="mt-8">
      {reports.length > 0 ? (
        <div className="space-y-3">
          {reports.map((r) => (
            <div
              key={r.id}
              className="border border-ps-border rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-[15px] font-semibold text-ps-black">
                  {r.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] font-semibold uppercase bg-ps-subtle text-ps-gray px-2 py-0.5 rounded-full">
                    {r.report_type.replace("_", " ")}
                  </span>
                  <span className="text-[13px] text-ps-gray">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
                {r.summary && (
                  <p className="text-[13px] text-ps-gray mt-2">{r.summary}</p>
                )}
              </div>
              {r.file_url && (
                <a
                  href={r.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-ps-gold hover:opacity-80 shrink-0"
                >
                  Download →
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[14px] text-ps-gray">No reports yet.</p>
      )}

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 border border-ps-border rounded-xl p-6 space-y-4"
        >
          <h3 className="text-[16px] font-semibold text-ps-black">
            Add Report
          </h3>
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
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">
                Type
              </label>
              <select
                value={form.report_type}
                onChange={(e) =>
                  setForm({ ...form, report_type: e.target.value })
                }
                className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] bg-white"
              >
                {reportTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-ps-black mb-1">
              Summary
            </label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={2}
              className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] resize-none"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-ps-black mb-1">
              PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-[14px]"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Add Report"}
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
          + Add Report
        </button>
      )}
    </div>
  );
}
