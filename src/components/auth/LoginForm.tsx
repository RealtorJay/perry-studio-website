"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Check role to redirect appropriately
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        router.push("/admin");
      } else {
        router.push(redirect);
      }
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="block text-[14px] font-medium text-ps-black mb-12">
        Perry Studio
      </Link>

      <h1 className="text-[32px] font-bold tracking-[-0.03em] text-ps-black">
        Sign in
      </h1>
      <p className="mt-2 text-[16px] text-ps-gray">
        Access your building dashboard
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && (
          <p className="text-[14px] text-red-600 bg-red-50 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ps-black text-white rounded-full py-3 text-[16px] font-semibold hover:bg-ps-black/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-[14px] text-ps-gray text-center">
        <Link href="/" className="hover:text-ps-black transition-colors">
          ← Back to perrystudio.com
        </Link>
      </p>
    </div>
  );
}
