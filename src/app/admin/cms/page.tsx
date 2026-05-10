import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const pages = [
  { slug: "home", label: "Homepage", description: "Hero, stats, services, and more" },
  { slug: "services", label: "Services", description: "Service details and pricing" },
  { slug: "about", label: "About", description: "Company story and mission" },
  { slug: "contact", label: "Contact", description: "Contact info and form labels" },
];

export default async function CmsOverview() {
  const supabase = await createClient();

  const [
    { count: blogCount },
    { count: testimonialCount },
    { count: teamCount },
  ] = await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("team_members").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="text-[28px] font-bold text-ps-black">Content Management</h1>

      <div className="mt-8">
        <h2 className="text-[18px] font-semibold text-ps-black mb-4">Pages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={`/admin/cms/${p.slug}`}
              className="border border-ps-border rounded-xl p-5 hover:bg-ps-subtle transition-colors"
            >
              <h3 className="text-[16px] font-semibold text-ps-black">
                {p.label}
              </h3>
              <p className="text-[13px] text-ps-gray mt-1">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-[18px] font-semibold text-ps-black mb-4">
          Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/cms/blog"
            className="border border-ps-border rounded-xl p-5 hover:bg-ps-subtle transition-colors"
          >
            <h3 className="text-[16px] font-semibold text-ps-black">Blog</h3>
            <p className="text-[13px] text-ps-gray mt-1">
              {blogCount ?? 0} posts
            </p>
          </Link>
          <Link
            href="/admin/cms/testimonials"
            className="border border-ps-border rounded-xl p-5 hover:bg-ps-subtle transition-colors"
          >
            <h3 className="text-[16px] font-semibold text-ps-black">
              Testimonials
            </h3>
            <p className="text-[13px] text-ps-gray mt-1">
              {testimonialCount ?? 0} entries
            </p>
          </Link>
          <Link
            href="/admin/cms/team"
            className="border border-ps-border rounded-xl p-5 hover:bg-ps-subtle transition-colors"
          >
            <h3 className="text-[16px] font-semibold text-ps-black">Team</h3>
            <p className="text-[13px] text-ps-gray mt-1">
              {teamCount ?? 0} members
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
