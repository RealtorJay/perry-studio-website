import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PortalBuildingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: building } = await supabase
    .from("buildings")
    .select("*")
    .eq("id", id)
    .single();

  if (!building) return notFound();

  const [
    { count: reportCount },
    { count: openFaultCount },
    { data: latestEnergy },
  ] = await Promise.all([
    supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("building_id", id),
    supabase
      .from("faults")
      .select("*", { count: "exact", head: true })
      .eq("building_id", id)
      .eq("status", "open"),
    supabase
      .from("energy_data")
      .select("*")
      .eq("building_id", id)
      .order("month", { ascending: false })
      .limit(1),
  ]);

  const energy = latestEnergy?.[0];

  return (
    <div>
      <Link
        href="/portal"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← All buildings
      </Link>

      <div className="mt-6">
        <h1 className="text-[28px] font-bold text-ps-black">{building.name}</h1>
        <p className="text-[14px] text-ps-gray mt-1">{building.address}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-ps-border rounded-xl p-5">
          <p className="text-[36px] font-bold text-ps-black">
            {energy?.health_score ?? "—"}
          </p>
          <p className="text-[13px] text-ps-gray mt-1">Health Score</p>
        </div>
        <div className="border border-ps-border rounded-xl p-5">
          <p className="text-[36px] font-bold text-ps-black">
            {reportCount ?? 0}
          </p>
          <p className="text-[13px] text-ps-gray mt-1">Reports</p>
        </div>
        <div className="border border-ps-border rounded-xl p-5">
          <p
            className={`text-[36px] font-bold ${(openFaultCount ?? 0) > 0 ? "text-red-600" : "text-ps-black"}`}
          >
            {openFaultCount ?? 0}
          </p>
          <p className="text-[13px] text-ps-gray mt-1">Open Faults</p>
        </div>
        {energy?.waste_identified != null && (
          <div className="border border-ps-border rounded-xl p-5">
            <p className="text-[36px] font-bold text-ps-black">
              ${energy.waste_identified.toLocaleString()}
            </p>
            <p className="text-[13px] text-ps-gray mt-1">Waste Identified</p>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href={`/portal/buildings/${id}/insights`}
          className="border-2 border-ps-black/20 bg-ps-black/5 rounded-xl p-6 hover:bg-ps-black/10 transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">
            AI Insights
          </p>
          <p className="text-[13px] text-ps-gray mt-1">
            AI-powered recommendations and analysis
          </p>
        </Link>
        <Link
          href={`/portal/buildings/${id}/reports`}
          className="border border-ps-border rounded-xl p-6 hover:bg-ps-subtle transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">Reports</p>
          <p className="text-[13px] text-ps-gray mt-1">
            View and download reports
          </p>
        </Link>
        <Link
          href={`/portal/buildings/${id}/energy`}
          className="border border-ps-border rounded-xl p-6 hover:bg-ps-subtle transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">Energy</p>
          <p className="text-[13px] text-ps-gray mt-1">
            Monthly energy metrics
          </p>
        </Link>
        <Link
          href={`/portal/buildings/${id}/faults`}
          className="border border-ps-border rounded-xl p-6 hover:bg-ps-subtle transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">Faults</p>
          <p className="text-[13px] text-ps-gray mt-1">Fault history</p>
        </Link>
      </div>
    </div>
  );
}
