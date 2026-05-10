"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface ContactDetailProps {
  contact: {
    id: string;
    status: string;
    notes: string | null;
  };
}

const statuses = ["new", "read", "replied", "archived"];

export default function ContactDetail({ contact }: ContactDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(contact.status);
  const [notes, setNotes] = useState(contact.notes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("contact_submissions")
      .update({ status, notes })
      .eq("id", contact.id);
    setSaving(false);
    router.refresh();
  };

  return (
    <div className="mt-10 border-t border-ps-border pt-8">
      <h2 className="text-[18px] font-semibold text-ps-black mb-4">
        Manage Submission
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black bg-white"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Internal Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black resize-none"
            placeholder="Add notes about this lead..."
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 bg-ps-black text-white rounded-full px-6 py-2.5 text-[14px] font-semibold hover:bg-ps-black/90 transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
