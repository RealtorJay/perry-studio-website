import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-green-100 text-green-800",
};

interface Recommendation {
  priority: string;
  title: string;
  description: string;
  estimated_savings: string | null;
}

export default async function PortalInsights({
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
    .order("generated_at", { ascending: false })
    .limit(1);

  const insight = insights?.[0];

  return (
    <div>
      <Link
        href={`/portal/buildings/${id}`}
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to {building.name}
      </Link>

      <div className="mt-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-bold text-ps-black">AI Insights</h1>
          <span className="text-[11px] font-semibold uppercase tracking-wider bg-ps-gold/10 text-ps-gold px-2 py-0.5 rounded-full">
            AI-Powered
          </span>
        </div>
        <p className="text-[14px] text-ps-gray mt-1">
          {building.name} · {building.address}
        </p>
      </div>

      {!insight ? (
        <div className="mt-12 border border-ps-border rounded-xl p-10 text-center">
          <p className="text-[18px] font-semibold text-ps-black">
            No insights generated yet
          </p>
          <p className="text-[14px] text-ps-gray mt-2">
            Your building controls engineer will generate AI insights during
            your next monitoring review.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {/* Summary */}
          <div className="bg-ps-subtle rounded-xl p-6 md:p-8">
            <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
              Executive Summary
            </h2>
            <p className="text-[19px] text-ps-black leading-relaxed">
              {insight.summary}
            </p>
            {insight.estimated_savings && (
              <div className="mt-4 pt-4 border-t border-ps-border">
                <p className="text-[13px] text-ps-gray">
                  Estimated annual savings if all recommendations are
                  implemented
                </p>
                <p className="text-[32px] font-bold text-ps-gold mt-1">
                  ${Number(insight.estimated_savings).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-4">
              Recommendations
            </h2>
            <div className="space-y-3">
              {(insight.recommendations as Recommendation[]).map(
                (rec, i) => (
                  <div
                    key={i}
                    className="border border-ps-border rounded-xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full ${priorityColors[rec.priority] || "bg-gray-100 text-gray-800"}`}
                          >
                            {rec.priority}
                          </span>
                          <h3 className="text-[16px] font-semibold text-ps-black">
                            {rec.title}
                          </h3>
                        </div>
                        <p className="text-[15px] text-ps-gray leading-relaxed">
                          {rec.description}
                        </p>
                      </div>
                      {rec.estimated_savings && (
                        <div className="text-right shrink-0">
                          <p className="text-[11px] text-ps-gray">Savings</p>
                          <p className="text-[16px] font-bold text-ps-gold">
                            {rec.estimated_savings}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Energy Trend & Fault Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insight.energy_trend && (
              <div className="border border-ps-border rounded-xl p-5">
                <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
                  Energy Trend
                </h2>
                <p className="text-[15px] text-ps-black leading-relaxed">
                  {insight.energy_trend}
                </p>
              </div>
            )}
            {insight.fault_analysis && (
              <div className="border border-ps-border rounded-xl p-5">
                <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
                  Fault Analysis
                </h2>
                <p className="text-[15px] text-ps-black leading-relaxed">
                  {insight.fault_analysis}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-6">
            <Link
              href={`/portal/buildings/${id}/insights/report`}
              className="text-[14px] font-semibold text-ps-gold hover:opacity-80 transition-opacity"
            >
              View Printable Report →
            </Link>
            <p className="text-[12px] text-ps-gray">
              Generated{" "}
              {new Date(insight.generated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
