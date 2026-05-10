"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: false,
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || "",
          content: data.content,
          published: data.published,
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    const supabase = createClient();
    const published = publish !== undefined ? publish : form.published;

    await supabase
      .from("blog_posts")
      .update({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content: form.content,
        published,
        published_at: published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSaving(false);
    router.push("/admin/cms/blog");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="text-[14px] text-ps-gray">Loading...</div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/cms/blog"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to blog
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">Edit Post</h1>

      <div className="mt-8 space-y-5 max-w-3xl">
        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Slug
          </label>
          <input
            type="text"
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
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-ps-black mb-1">
            Content (Markdown)
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={16}
            className="w-full border border-ps-border rounded-lg px-4 py-3 text-[14px] text-ps-black font-mono resize-y"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="bg-ps-gold text-white rounded-full px-6 py-2.5 text-[14px] font-semibold hover:brightness-110 disabled:opacity-50"
          >
            {form.published ? "Update" : "Publish"}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="bg-ps-black text-white rounded-full px-6 py-2.5 text-[14px] font-semibold disabled:opacity-50"
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
}
