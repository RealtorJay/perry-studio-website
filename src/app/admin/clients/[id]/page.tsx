import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddBuildingForm from "./AddBuildingForm";

export default async function ClientDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) return notFound();

  const { data: buildings } = await supabase
    .from("buildings")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link
        href="/admin/clients"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to clients
      </Link>

      <div className="mt-6">
        <h1 className="text-[28px] font-bold text-ps-black">
          {client.full_name || "Unnamed Client"}
        </h1>
        <p className="text-[14px] text-ps-gray mt-1">
          {client.company || "No company"} · Joined{" "}
          {new Date(client.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-ps-border rounded-xl p-4">
          <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
            Phone
          </p>
          <p className="text-[16px] text-ps-black mt-1">
            {client.phone || "—"}
          </p>
        </div>
      </div>

      {/* Buildings */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-semibold text-ps-black">
            Buildings
          </h2>
        </div>

        {buildings && buildings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buildings.map((b) => (
              <Link
                key={b.id}
                href={`/admin/buildings/${b.id}`}
                className="border border-ps-border rounded-xl p-5 hover:bg-ps-subtle transition-colors"
              >
                <h3 className="text-[16px] font-semibold text-ps-black">
                  {b.name}
                </h3>
                <p className="text-[14px] text-ps-gray mt-1">{b.address}</p>
                <div className="mt-3 flex gap-4 text-[13px] text-ps-gray">
                  {b.sqft && <span>{b.sqft.toLocaleString()} sqft</span>}
                  {b.bas_platform && <span>{b.bas_platform}</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-ps-gray">
            No buildings yet. Add the first one below.
          </p>
        )}

        <AddBuildingForm clientId={id} />
      </div>
    </div>
  );
}
