import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminBlogList() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link
        href="/admin/cms"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to CMS
      </Link>

      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-ps-black">Blog Posts</h1>
        <Link
          href="/admin/cms/blog/new"
          className="bg-ps-gold text-white rounded-full px-5 py-2.5 text-[14px] font-semibold hover:brightness-110 transition-all"
        >
          New Post
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {posts && posts.length > 0 ? (
          posts.map((p) => (
            <Link
              key={p.id}
              href={`/admin/cms/blog/${p.id}`}
              className="block border border-ps-border rounded-xl p-5 hover:bg-ps-subtle transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-ps-black">
                  {p.title}
                </h3>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    p.published
                      ? "bg-green-50 text-green-700"
                      : "bg-ps-subtle text-ps-gray"
                  }`}
                >
                  {p.published ? "Published" : "Draft"}
                </span>
              </div>
              {p.excerpt && (
                <p className="text-[13px] text-ps-gray mt-1">{p.excerpt}</p>
              )}
              <p className="text-[12px] text-ps-gray mt-2">
                /{p.slug} · {new Date(p.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-[14px] text-ps-gray">
            No blog posts yet. Create your first one.
          </p>
        )}
      </div>
    </div>
  );
}
