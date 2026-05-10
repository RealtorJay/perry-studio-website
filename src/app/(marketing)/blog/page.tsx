import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Blog — Perry Studio",
  description: "Insights on building controls, energy efficiency, and optimization for DFW commercial buildings.",
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="pt-[52px]">
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>Insights</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black">
              Blog
            </h1>
          </FadeIn>

          <div className="mt-20 space-y-0">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block py-10 border-b border-ps-border hover:bg-ps-subtle/50 -mx-6 px-6 transition-colors"
                >
                  <h2 className="text-[24px] md:text-[32px] font-bold text-ps-black tracking-[-0.02em]">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 text-[17px] text-ps-gray leading-relaxed max-w-3xl">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="mt-3 text-[13px] text-ps-gray">
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-[19px] text-ps-gray">
                No posts yet. Check back soon.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
