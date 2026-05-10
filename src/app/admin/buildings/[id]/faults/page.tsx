import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import FaultManager from "./FaultManager";

export default async function AdminBuildingFaults({
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

  return (
    <div>
      <Link
        href={`/admin/buildings/${id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to {building?.name || "building"}
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">Faults</h1>

      <FaultManager buildingId={id} faults={faults || []} />
    </div>
  );
}
