import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function PortalDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: buildings } = await supabase
    .from("buildings")
    .select("*, faults(count), energy_data(health_score)")
    .eq("client_id", user?.id || "")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-[28px] font-bold text-ps-black">Your Buildings</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {buildings && buildings.length > 0 ? (
          buildings.map((b) => {
            const openFaults = (b.faults as { count: number }[])?.[0]?.count ?? 0;
            const energyRecords = b.energy_data as { health_score: number | null }[] | null;
            const latestHealth = energyRecords?.[0]?.health_score;

            return (
              <Link
                key={b.id}
                href={`/portal/buildings/${b.id}`}
                className="border border-ps-border rounded-xl p-6 hover:bg-ps-subtle transition-colors"
              >
                <h2 className="text-[18px] font-semibold text-ps-black">
                  {b.name}
                </h2>
                <p className="text-[14px] text-ps-gray mt-1">{b.address}</p>

                <div className="mt-4 flex gap-6">
                  {latestHealth != null && (
                    <div>
                      <p className="text-[24px] font-bold text-ps-black">
                        {latestHealth}
                      </p>
                      <p className="text-[12px] text-ps-gray">Health Score</p>
                    </div>
                  )}
                  <div>
                    <p
                      className={`text-[24px] font-bold ${openFaults > 0 ? "text-red-600" : "text-ps-black"}`}
                    >
                      {openFaults}
                    </p>
                    <p className="text-[12px] text-ps-gray">Open Faults</p>
                  </div>
                  {b.sqft && (
                    <div>
                      <p className="text-[24px] font-bold text-ps-black">
                        {(b.sqft / 1000).toFixed(0)}K
                      </p>
                      <p className="text-[12px] text-ps-gray">sqft</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-20">
            <h2 className="text-[24px] font-semibold text-ps-black">
              No buildings yet
            </h2>
            <p className="mt-2 text-[16px] text-ps-gray">
              Your buildings will appear here once Perry Studio sets up your
              account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
