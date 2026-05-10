"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const basOptions = [
  "Trane Tracer",
  "Johnson Controls Metasys",
  "Siemens Desigo",
  "Honeywell EBI",
  "Niagara N4",
  "Other",
];

export default function AddBuildingForm({ clientId }: { clientId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    sqft: "",
    bas_platform: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    await supabase.from("buildings").insert({
      client_id: clientId,
      name: form.name,
      address: form.address,
      sqft: form.sqft ? parseInt(form.sqft) : null,
      bas_platform: form.bas_platform || null,
    });

    setForm({ name: "", address: "", sqft: "", bas_platform: "" });
    setOpen(false);
    setLoading(false);
    router.refresh();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-6 border border-dashed border-ps-border rounded-xl p-5 w-full text-center text-[14px] text-ps-gray hover:text-ps-black hover:border-ps-gray transition-colors"
      >
        + Add Building
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 border border-ps-border rounded-xl p-6 space-y-4"
    >
      <h3 className="text-[16px] font-semibold text-ps-black">
        Add New Building
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Building Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
            placeholder="Main Office Tower"
          />
        </div>
        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Address *
          </label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
            placeholder="123 Main St, Dallas, TX"
          />
        </div>
        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Square Footage
          </label>
          <input
            type="number"
            value={form.sqft}
            onChange={(e) => setForm({ ...form, sqft: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]"
            placeholder="50000"
          />
        </div>
        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            BAS Platform
          </label>
          <select
            value={form.bas_platform}
            onChange={(e) => setForm({ ...form, bas_platform: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] bg-white"
          >
            <option value="">Select platform</option>
            {basOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Building"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[14px] text-ps-gray hover:text-ps-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
