"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InviteClient() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    full_name: "",
    company: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to invite client");
      setLoading(false);
      return;
    }

    router.push("/admin/clients");
    router.refresh();
  };

  return (
    <div>
      <Link
        href="/admin/clients"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to clients
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">
        Invite Client
      </h1>
      <p className="mt-2 text-[14px] text-ps-gray">
        The client will receive an email to set their password.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-5">
        {error && (
          <p className="text-[14px] text-red-600 bg-red-50 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black"
            placeholder="client@company.com"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black"
            placeholder="ABC Properties"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black"
            placeholder="(555) 555-5555"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-ps-gold text-white rounded-full px-6 py-3 text-[14px] font-semibold hover:brightness-110 transition-all disabled:opacity-50"
        >
          {loading ? "Sending invite..." : "Send Invite"}
        </button>
      </form>
    </div>
  );
}
