import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} — Perry Studio`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return notFound();

  // Simple markdown-to-html (paragraphs, headers, bold, italic)
  const html = post.content
    .split("\n\n")
    .map((block: string) => {
      if (block.startsWith("### "))
        return `<h3 class="text-[24px] font-semibold text-ps-black mt-10 mb-4">${block.slice(4)}</h3>`;
      if (block.startsWith("## "))
        return `<h2 class="text-[28px] font-semibold text-ps-black mt-12 mb-4">${block.slice(3)}</h2>`;
      if (block.startsWith("# "))
        return `<h1 class="text-[32px] font-bold text-ps-black mt-12 mb-4">${block.slice(2)}</h1>`;
      return `<p class="text-[19px] text-ps-gray leading-relaxed mb-6">${block
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ps-black">$1</strong>')
        .replace(/\*(.*?)\*/g, "<em>$1</em>")}</p>`;
    })
    .join("");

  return (
    <div className="pt-[52px]">
      <article className="py-32 md:py-40 px-6">
        <div className="max-w-[680px] mx-auto">
          <Link
            href="/blog"
            className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
          >
            ← All posts
          </Link>

          <h1 className="mt-8 text-[36px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-ps-black">
            {post.title}
          </h1>

          <p className="mt-4 text-[14px] text-ps-gray">
            {new Date(post.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div
            className="mt-12"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>
    </div>
  );
}
