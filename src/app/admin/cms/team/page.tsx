"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  visible: boolean;
  sort_order: number;
}

export default function AdminTeam() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", title: "", bio: "" });

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order");
      setMembers(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("team_members").insert({
      name: form.name,
      title: form.title,
      bio: form.bio || null,
      sort_order: members.length,
    });
    setForm({ name: "", title: "", bio: "" });
    setShowForm(false);
    setSaving(false);
    router.refresh();
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order");
    setMembers(data || []);
  };

  if (loading) return <div className="text-[14px] text-ps-gray">Loading...</div>;

  return (
    <div>
      <Link href="/admin/cms" className="text-[13px] text-ps-gray hover:text-ps-black transition-colors">
        ← Back to CMS
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">Team Members</h1>

      <div className="mt-8 space-y-3">
        {members.map((m) => (
          <div key={m.id} className="border border-ps-border rounded-xl p-4">
            <h3 className="text-[15px] font-semibold text-ps-black">{m.name}</h3>
            <p className="text-[13px] text-ps-gray">{m.title}</p>
            {m.bio && <p className="text-[13px] text-ps-gray mt-2">{m.bio}</p>}
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleAdd} className="mt-6 border border-ps-border rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">Name *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]" />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-ps-black mb-1">Title *</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px]" placeholder="e.g., BAS Technician" />
            </div>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-ps-black mb-1">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full border border-ps-border rounded-lg px-3 py-2 text-[14px] resize-none" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-ps-black text-white rounded-full px-5 py-2 text-[14px] font-semibold disabled:opacity-50">
              {saving ? "Adding..." : "Add Member"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-[14px] text-ps-gray">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="mt-6 border border-dashed border-ps-border rounded-xl p-5 w-full text-center text-[14px] text-ps-gray hover:text-ps-black hover:border-ps-gray transition-colors">
          + Add Team Member
        </button>
      )}
    </div>
  );
}
