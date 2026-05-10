import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BuildingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: building } = await supabase
    .from("buildings")
    .select("*, profiles(full_name, company)")
    .eq("id", id)
    .single();

  if (!building) return notFound();

  const [{ count: reportCount }, { count: faultCount }, { data: recentEnergy }] =
    await Promise.all([
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

  const profile = building.profiles as { full_name: string; company: string } | null;

  return (
    <div>
      <Link
        href={`/admin/clients/${building.client_id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to client
      </Link>

      <div className="mt-6">
        <h1 className="text-[28px] font-bold text-ps-black">{building.name}</h1>
        <p className="text-[14px] text-ps-gray mt-1">
          {building.address} · {profile?.full_name || "Unknown client"}
          {profile?.company ? ` (${profile.company})` : ""}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-ps-border rounded-xl p-4">
          <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
            Size
          </p>
          <p className="text-[20px] font-bold text-ps-black mt-1">
            {building.sqft ? `${building.sqft.toLocaleString()} sqft` : "—"}
          </p>
        </div>
        <div className="border border-ps-border rounded-xl p-4">
          <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
            BAS Platform
          </p>
          <p className="text-[20px] font-bold text-ps-black mt-1">
            {building.bas_platform || "—"}
          </p>
        </div>
        <div className="border border-ps-border rounded-xl p-4">
          <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
            Reports
          </p>
          <p className="text-[20px] font-bold text-ps-black mt-1">
            {reportCount ?? 0}
          </p>
        </div>
        <div className="border border-ps-border rounded-xl p-4">
          <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
            Open Faults
          </p>
          <p className="text-[20px] font-bold text-ps-black mt-1">
            {faultCount ?? 0}
          </p>
        </div>
      </div>

      {recentEnergy && recentEnergy[0] && (
        <div className="mt-4 border border-ps-border rounded-xl p-4">
          <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
            Latest Health Score
          </p>
          <p className="text-[36px] font-bold text-ps-black mt-1">
            {recentEnergy[0].health_score ?? "—"}
            <span className="text-[16px] text-ps-gray font-normal">/100</span>
          </p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href={`/admin/buildings/${id}/insights`}
          className="border-2 border-ps-black/20 bg-ps-black/5 rounded-xl p-6 hover:bg-ps-black/10 transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">
            AI Insights
          </p>
          <p className="text-[13px] text-ps-gray mt-1">
            Generate AI-powered analysis and recommendations
          </p>
        </Link>
        <Link
          href={`/admin/buildings/${id}/reports`}
          className="border border-ps-border rounded-xl p-6 hover:bg-ps-subtle transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">Reports</p>
          <p className="text-[13px] text-ps-gray mt-1">
            Upload and manage reports
          </p>
        </Link>
        <Link
          href={`/admin/buildings/${id}/energy`}
          className="border border-ps-border rounded-xl p-6 hover:bg-ps-subtle transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">Energy Data</p>
          <p className="text-[13px] text-ps-gray mt-1">
            Monthly energy metrics
          </p>
        </Link>
        <Link
          href={`/admin/buildings/${id}/faults`}
          className="border border-ps-border rounded-xl p-6 hover:bg-ps-subtle transition-colors text-center"
        >
          <p className="text-[18px] font-semibold text-ps-black">Faults</p>
          <p className="text-[13px] text-ps-gray mt-1">
            Fault detection history
          </p>
        </Link>
      </div>
    </div>
  );
}
