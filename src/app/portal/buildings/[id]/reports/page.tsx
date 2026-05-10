import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function PortalReports({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: building } = await supabase
    .from("buildings")
    .select("name")
    .eq("id", id)
    .single();

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("building_id", id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link
        href={`/portal/buildings/${id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to {building?.name || "building"}
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">Reports</h1>

      <div className="mt-8 space-y-3">
        {reports && reports.length > 0 ? (
          reports.map((r) => (
            <div
              key={r.id}
              className="border border-ps-border rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="text-[16px] font-semibold text-ps-black">
                  {r.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] font-semibold uppercase bg-ps-subtle text-ps-gray px-2 py-0.5 rounded-full">
                    {r.report_type.replace("_", " ")}
                  </span>
                  <span className="text-[13px] text-ps-gray">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
                {r.summary && (
                  <p className="text-[14px] text-ps-gray mt-2 leading-relaxed">
                    {r.summary}
                  </p>
                )}
              </div>
              {r.file_url && (
                <a
                  href={r.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ps-black text-white rounded-full px-5 py-2 text-[13px] font-semibold hover:bg-ps-black/90 transition-colors shrink-0"
                >
                  Download
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-[14px] text-ps-gray">No reports available yet.</p>
        )}
      </div>
    </div>
  );
}
