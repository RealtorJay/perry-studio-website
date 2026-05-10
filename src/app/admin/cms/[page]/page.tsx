import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import CmsSectionEditor from "./CmsSectionEditor";

const pageSections: Record<string, { key: string; label: string; fields: string[] }[]> = {
  home: [
    { key: "hero", label: "Hero", fields: ["headline", "subtitle", "cta_text", "cta_link"] },
    { key: "problem", label: "Problem Section", fields: ["label", "headline", "body"] },
    { key: "how_it_works", label: "How It Works", fields: ["headline"] },
    { key: "platform", label: "Platform", fields: ["headline", "subtitle"] },
    { key: "cta", label: "CTA Section", fields: ["headline", "subtitle", "button_text"] },
  ],
  services: [
    { key: "hero", label: "Hero", fields: ["headline", "subtitle"] },
  ],
  about: [
    { key: "hero", label: "Hero", fields: ["headline"] },
    { key: "mission", label: "Mission", fields: ["headline", "body"] },
  ],
  contact: [
    { key: "info", label: "Contact Info", fields: ["email", "phone", "service_area"] },
  ],
};

export default async function CmsPageEditor({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const supabase = await createClient();

  const sections = pageSections[page] || [];

  const { data: existing } = await supabase
    .from("cms_sections")
    .select("*")
    .eq("page", page);

  const existingMap = Object.fromEntries(
    (existing || []).map((s) => [s.section_key, s])
  );

  return (
    <div>
      <Link
        href="/admin/cms"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to CMS
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black capitalize">
        {page} Page
      </h1>

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <CmsSectionEditor
            key={section.key}
            page={page}
            sectionKey={section.key}
            label={section.label}
            fields={section.fields}
            initialData={existingMap[section.key]?.content || {}}
          />
        ))}
      </div>
    </div>
  );
}
