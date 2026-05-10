import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const severityColors: Record<string, string> = {
  low: "bg-ps-subtle text-ps-gray",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-orange-50 text-orange-700",
  critical: "bg-red-50 text-red-700",
};

const statusColors: Record<string, string> = {
  open: "bg-red-50 text-red-700",
  monitoring: "bg-amber-50 text-amber-700",
  resolved: "bg-green-50 text-green-700",
};

export default async function PortalFaults({
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

  const { data: faults } = await supabase
    .from("faults")
    .select("*")
    .eq("building_id", id)
    .order("detected_at", { ascending: false });

  const openCount = faults?.filter((f) => f.status === "open").length ?? 0;
  const totalImpact = faults?.reduce(
    (sum, f) => sum + (f.cost_impact || 0),
    0
  ) ?? 0;

  return (
    <div>
      <Link
        href={`/portal/buildings/${id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to {building?.name || "building"}
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">
        Fault History
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="border border-ps-border rounded-xl p-5">
          <p
            className={`text-[36px] font-bold ${openCount > 0 ? "text-red-600" : "text-ps-black"}`}
          >
            {openCount}
          </p>
          <p className="text-[13px] text-ps-gray mt-1">Open Faults</p>
        </div>
        <div className="border border-ps-border rounded-xl p-5">
          <p className="text-[36px] font-bold text-ps-black">
            ${totalImpact.toLocaleString()}
          </p>
          <p className="text-[13px] text-ps-gray mt-1">
            Total Estimated Impact
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {faults && faults.length > 0 ? (
          faults.map((f) => (
            <div key={f.id} className="border border-ps-border rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[16px] font-semibold text-ps-black">
                    {f.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${severityColors[f.severity] || ""}`}
                    >
                      {f.severity}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[f.status] || ""}`}
                    >
                      {f.status}
                    </span>
                    {f.cost_impact != null && (
                      <span className="text-[12px] text-ps-gray">
                        ${f.cost_impact.toLocaleString()} est. impact
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] text-ps-gray">
                    {new Date(f.detected_at).toLocaleDateString()}
                  </p>
                  {f.resolved_at && (
                    <p className="text-[12px] text-green-700">
                      Resolved{" "}
                      {new Date(f.resolved_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              {f.description && (
                <p className="text-[14px] text-ps-gray mt-3 leading-relaxed">
                  {f.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-[14px] text-ps-gray">No faults recorded.</p>
        )}
      </div>
    </div>
  );
}
