import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function PortalEnergy({
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
    .order("month", { ascending: true });

  const maxCost = Math.max(
    ...(energyData || []).map((e) => e.cost_dollars || 0),
    1
  );

  return (
    <div>
      <Link
        href={`/portal/buildings/${id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to {building?.name || "building"}
      </Link>

      <h1 className="mt-6 text-[28px] font-bold text-ps-black">
        Energy Data
      </h1>

      {energyData && energyData.length > 0 ? (
        <>
          {/* CSS bar chart */}
          <div className="mt-8 border border-ps-border rounded-xl p-6">
            <h2 className="text-[16px] font-semibold text-ps-black mb-6">
              Monthly Energy Cost
            </h2>
            <div className="flex items-end gap-2 h-48">
              {energyData.map((e) => {
                const height = ((e.cost_dollars || 0) / maxCost) * 100;
                return (
                  <div
                    key={e.id}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-[11px] text-ps-gray">
                      {e.cost_dollars != null ? `$${(e.cost_dollars / 1000).toFixed(1)}k` : ""}
                    </span>
                    <div
                      className="w-full bg-ps-black rounded-t-sm min-h-[2px]"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    />
                    <span className="text-[10px] text-ps-gray">
                      {new Date(e.month).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data table */}
          <div className="mt-8 border border-ps-border rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-ps-subtle">
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Month
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    kWh
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Cost
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Waste
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Savings
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Health
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...energyData].reverse().map((e) => (
                  <tr key={e.id} className="border-t border-ps-border">
                    <td className="px-4 py-3 text-[14px] text-ps-black">
                      {new Date(e.month).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-ps-gray">
                      {e.kwh_usage?.toLocaleString() ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-ps-gray">
                      {e.cost_dollars != null
                        ? `$${e.cost_dollars.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-red-600">
                      {e.waste_identified != null
                        ? `$${e.waste_identified.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-green-700">
                      {e.savings_achieved != null
                        ? `$${e.savings_achieved.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-ps-black font-semibold">
                      {e.health_score ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="mt-8 text-[14px] text-ps-gray">
          No energy data available yet.
        </p>
      )}
    </div>
  );
}
