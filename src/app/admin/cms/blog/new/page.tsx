"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    });
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    await supabase.from("blog_posts").insert({
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
    });

    router.push("/admin/cms/blog");
    router.refresh();
  };

  return (
    <div>
      <Link
        href="/admin/cms/blog"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to blog
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">New Post</h1>

      <form className="mt-8 space-y-5 max-w-3xl">
        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Title
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black"
            placeholder="Post title"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Slug
          </label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-gray"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black resize-none"
            placeholder="Short description for listings"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Content (Markdown)
          </label>
          <textarea
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={16}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black font-mono resize-y"
            placeholder="Write your post in markdown..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="bg-ps-gold text-white rounded-full px-6 py-2.5 text-[14px] font-semibold hover:brightness-110 transition-all disabled:opacity-50"
          >
            Publish
          </button>
          <button
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="bg-ps-black text-white rounded-full px-6 py-2.5 text-[14px] font-semibold disabled:opacity-50"
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
}
