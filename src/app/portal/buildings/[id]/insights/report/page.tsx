import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PrintButton from "./PrintButton";

interface Recommendation {
  priority: string;
  title: string;
  description: string;
  estimated_savings: string | null;
}

export default async function InsightReport({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: building } = await supabase
    .from("buildings")
    .select("name, address, sqft, bas_platform")
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
  if (!insight) return notFound();

  const { data: latestEnergy } = await supabase
    .from("energy_data")
    .select("*")
    .eq("building_id", id)
    .order("month", { ascending: false })
    .limit(1);

  const energy = latestEnergy?.[0];

  const { count: openFaults } = await supabase
    .from("faults")
    .select("*", { count: "exact", head: true })
    .eq("building_id", id)
    .eq("status", "open");

  const reportDate = new Date(insight.generated_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="max-w-3xl mx-auto px-8 py-16 print:px-0 print:py-0">
      {/* Print button — hidden when printing */}
      <div className="print:hidden mb-8 flex justify-end">
        <PrintButton />
      </div>

      {/* Header */}
      <div className="border-b-2 border-ps-black pb-6 mb-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ps-gold">
          Perry Studio — Monthly Building Report
        </p>
        <h1 className="mt-3 text-[32px] font-bold text-ps-black">
          {building.name}
        </h1>
        <p className="text-[15px] text-ps-gray mt-1">{building.address}</p>
        <div className="mt-4 flex gap-6 text-[13px] text-ps-gray">
          <span>Report Date: {reportDate}</span>
          {building.sqft && (
            <span>{building.sqft.toLocaleString()} sqft</span>
          )}
          {building.bas_platform && <span>{building.bas_platform}</span>}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border border-ps-border rounded-lg p-4 text-center">
          <p className="text-[28px] font-bold text-ps-black">
            {energy?.health_score ?? "—"}
          </p>
          <p className="text-[12px] text-ps-gray mt-1">Health Score</p>
        </div>
        <div className="border border-ps-border rounded-lg p-4 text-center">
          <p className="text-[28px] font-bold text-ps-black">
            {openFaults ?? 0}
          </p>
          <p className="text-[12px] text-ps-gray mt-1">Open Issues</p>
        </div>
        <div className="border border-ps-border rounded-lg p-4 text-center">
          <p className="text-[28px] font-bold text-ps-gold">
            {insight.estimated_savings
              ? `$${Number(insight.estimated_savings).toLocaleString()}`
              : "—"}
          </p>
          <p className="text-[12px] text-ps-gray mt-1">Est. Annual Savings</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-10">
        <h2 className="text-[14px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
          Executive Summary
        </h2>
        <p className="text-[17px] text-ps-black leading-relaxed">
          {insight.summary}
        </p>
      </div>

      {/* Recommendations */}
      <div className="mb-10">
        <h2 className="text-[14px] font-semibold uppercase tracking-wider text-ps-gray mb-4">
          Recommendations
        </h2>
        <div className="space-y-4">
          {(insight.recommendations as Recommendation[]).map(
            (rec, i) => (
              <div key={i} className="border-l-3 border-ps-gold pl-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[15px] font-semibold text-ps-black">
                    {i + 1}. {rec.title}
                    <span className="ml-2 text-[11px] font-medium uppercase text-ps-gray">
                      ({rec.priority} priority)
                    </span>
                  </h3>
                  {rec.estimated_savings && (
                    <span className="text-[13px] font-semibold text-ps-gold shrink-0">
                      {rec.estimated_savings}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[14px] text-ps-gray leading-relaxed">
                  {rec.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Energy & Faults */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        {insight.energy_trend && (
          <div>
            <h2 className="text-[14px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
              Energy Trend
            </h2>
            <p className="text-[14px] text-ps-black leading-relaxed">
              {insight.energy_trend}
            </p>
          </div>
        )}
        {insight.fault_analysis && (
          <div>
            <h2 className="text-[14px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
              Fault Analysis
            </h2>
            <p className="text-[14px] text-ps-black leading-relaxed">
              {insight.fault_analysis}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-ps-border pt-6 mt-16 text-center">
        <p className="text-[13px] text-ps-gray">
          Prepared by Perry Studio · jordan@perrystudio.com ·
          Dallas–Fort Worth
        </p>
        <p className="text-[11px] text-ps-gray mt-1">
          This report was generated with AI-assisted analysis and reviewed by
          your building controls engineer.
        </p>
      </div>
    </div>
  );
}
