import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import InsightsManager from "./InsightsManager";

export default async function AdminInsights({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: building } = await supabase
    .from("buildings")
    .select("name, address")
    .eq("id", id)
    .single();

  if (!building) return notFound();

  const { data: insights } = await supabase
    .from("ai_insights")
    .select("*")
    .eq("building_id", id)
    .order("generated_at", { ascending: false });

  return (
    <div>
      <Link
        href={`/admin/buildings/${id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to {building.name}
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="text-[28px] font-bold text-ps-black">{building.name}</h1>
        <p className="text-[14px] text-ps-gray mt-1">{building.address}</p>
      </div>

      <InsightsManager buildingId={id} existingInsights={insights || []} />
    </div>
  );
}
