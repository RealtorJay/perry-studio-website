"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface CmsSectionEditorProps {
  page: string;
  sectionKey: string;
  label: string;
  fields: string[];
  initialData: Record<string, string>;
}

export default function CmsSectionEditor({
  page,
  sectionKey,
  label,
  fields,
  initialData,
}: CmsSectionEditorProps) {
  const [data, setData] = useState<Record<string, string>>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();

    await supabase.from("cms_sections").upsert(
      {
        page,
        section_key: sectionKey,
        content: data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page,section_key" }
    );

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="border border-ps-border rounded-xl p-6">
      <h3 className="text-[16px] font-semibold text-ps-black mb-4">{label}</h3>

      <div className="space-y-4">
        {fields.map((field) => {
          const isLong =
            field === "body" ||
            field === "subtitle" ||
            field === "headline";

          return (
            <div key={field}>
              <label className="block text-[14px] font-medium text-ps-black mb-1 capitalize">
                {field.replace(/_/g, " ")}
              </label>
              {isLong ? (
                <textarea
                  value={data[field] || ""}
                  onChange={(e) =>
                    setData({ ...data, [field]: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] text-ps-black resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={data[field] || ""}
                  onChange={(e) =>
                    setData({ ...data, [field]: e.target.value })
                  }
                  className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] text-ps-black"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {saved && (
          <span className="text-[13px] text-green-600">Saved</span>
        )}
      </div>
    </div>
  );
}
