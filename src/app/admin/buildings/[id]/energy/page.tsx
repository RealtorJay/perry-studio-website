import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import EnergyManager from "./EnergyManager";

export default async function AdminBuildingEnergy({
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

  const { data: energyData } = await supabase
    .from("energy_data")
    .select("*")
    .eq("building_id", id)
    .order("month", { ascending: false });

  return (
    <div>
      <Link
        href={`/admin/buildings/${id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to {building?.name || "building"}
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">Energy Data</h1>

      <EnergyManager buildingId={id} energyData={energyData || []} />
    </div>
  );
}
