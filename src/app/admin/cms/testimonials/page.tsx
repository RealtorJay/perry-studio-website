"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  quote: string;
  building_type: string | null;
  visible: boolean;
  sort_order: number;
}

export default function AdminTestimonials() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    client_name: "",
    company: "",
    quote: "",
    building_type: "",
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order");
      setItems(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("testimonials").insert({
      client_name: form.client_name,
      company: form.company || null,
      quote: form.quote,
      building_type: form.building_type || null,
      sort_order: items.length,
    });
    setForm({ client_name: "", company: "", quote: "", building_type: "" });
    setShowForm(false);
    setSaving(false);
    router.refresh();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order");
    setItems(data || []);
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    const supabase = createClient();
    await supabase.from("testimonials").update({ visible: !visible }).eq("id", id);
    setItems(items.map((i) => (i.id === id ? { ...i, visible: !visible } : i)));
  };

  if (loading) return <div className="text-[14px] text-ps-gray">Loading...</div>;

  return (
    <div>
      <Link href="/admin/cms" className="text-[13px] text-ps-gray hover:text-ps-black transition-colors">
        ← Back to CMS
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">Testimonials</h1>

      <div className="mt-8 space-y-3">
        {items.map((t) => (
          <div key={t.id} className="border border-ps-border rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[15px] text-ps-black leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-[13px] text-ps-gray mt-2">
                — {t.client_name}{t.company ? `, ${t.company}` : ""}
              </p>
            </div>
            <button
              onClick={() => toggleVisibility(t.id, t.visible)}
              className={`text-[12px] px-2 py-0.5 rounded-full shrink-0 ${
                t.visible ? "bg-green-50 text-green-700" : "bg-ps-subtle text-ps-gray"
              }`}
            >
              {t.visible ? "Visible" : "Hidden"}
            </button>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleAdd} className="mt-6 border border-ps-border rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">Client Name *</label>
              <input type="text" required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]" />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">Company</label>
              <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]" />
            </div>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-ps-black mb-1">Quote *</label>
            <textarea required value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] resize-none" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold disabled:opacity-50">
              {saving ? "Adding..." : "Add Testimonial"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-[14px] text-ps-gray">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="mt-6 border border-dashed border-ps-border rounded-xl p-5 w-full text-center text-[14px] text-ps-gray hover:text-ps-black hover:border-ps-gray transition-colors">
          + Add Testimonial
        </button>
      )}
    </div>
  );
}
