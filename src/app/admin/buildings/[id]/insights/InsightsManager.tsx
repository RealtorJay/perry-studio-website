"use client";

import { useState } from "react";

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

interface Insight {
  id: string;
  summary: string;
  recommendations: Recommendation[];
  energy_trend: string | null;
  fault_analysis: string | null;
  estimated_savings: number | null;
  generated_at: string;
}

export default function InsightsManager({
  buildingId,
  existingInsights,
}: {
  buildingId: string;
  existingInsights: Insight[];
}) {
  const [insights, setInsights] = useState<Insight[]>(existingInsights);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ building_id: buildingId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate insights");
        return;
      }

      setInsights([data.insight, ...insights]);
    } catch {
      setError("Network error — failed to generate insights");
    } finally {
      setGenerating(false);
    }
  };

  const latest = insights[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[20px] font-bold text-ps-black">AI Insights</h2>
          <p className="text-[13px] text-ps-gray mt-1">
            {insights.length} insight{insights.length !== 1 ? "s" : ""}{" "}
            generated
          </p>
        </div>
        <button
          onClick={generateInsights}
          disabled={generating}
          className="btn-gold text-[14px] !px-6 !py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? "Generating..." : "Generate New Insights"}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-[14px] text-red-800">{error}</p>
        </div>
      )}

      {!latest ? (
        <div className="border border-ps-border rounded-xl p-10 text-center">
          <p className="text-[16px] text-ps-gray">
            No insights generated yet. Click the button above to analyze this
            building&apos;s data.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Latest insight */}
          <div className="bg-ps-subtle rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray">
                Executive Summary
              </h3>
              <span className="text-[11px] text-ps-gray">
                {new Date(latest.generated_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-[17px] text-ps-black leading-relaxed">
              {latest.summary}
            </p>
            {latest.estimated_savings && (
              <p className="mt-3 text-[14px] text-ps-gold font-semibold">
                Estimated savings: $
                {Number(latest.estimated_savings).toLocaleString()}/year
              </p>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
              Recommendations
            </h3>
            <div className="space-y-2">
              {(latest.recommendations as Recommendation[]).map((rec, i) => (
                <div
                  key={i}
                  className="border border-ps-border rounded-lg p-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${priorityColors[rec.priority] || "bg-gray-100 text-gray-800"}`}
                      >
                        {rec.priority}
                      </span>
                      <span className="text-[14px] font-semibold text-ps-black">
                        {rec.title}
                      </span>
                    </div>
                    <p className="text-[13px] text-ps-gray leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                  {rec.estimated_savings && (
                    <span className="text-[13px] font-semibold text-ps-gold shrink-0">
                      {rec.estimated_savings}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Trend & Fault */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latest.energy_trend && (
              <div className="border border-ps-border rounded-lg p-4">
                <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-2">
                  Energy Trend
                </h3>
                <p className="text-[13px] text-ps-black leading-relaxed">
                  {latest.energy_trend}
                </p>
              </div>
            )}
            {latest.fault_analysis && (
              <div className="border border-ps-border rounded-lg p-4">
                <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-2">
                  Fault Analysis
                </h3>
                <p className="text-[13px] text-ps-black leading-relaxed">
                  {latest.fault_analysis}
                </p>
              </div>
            )}
          </div>

          {/* History */}
          {insights.length > 1 && (
            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ps-gray mb-3">
                Previous Insights
              </h3>
              <div className="space-y-2">
                {insights.slice(1).map((insight) => (
                  <div
                    key={insight.id}
                    className="border border-ps-border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-ps-gray">
                        {new Date(insight.generated_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                      {insight.estimated_savings && (
                        <span className="text-[12px] font-semibold text-ps-gold">
                          Est. savings: $
                          {Number(insight.estimated_savings).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-ps-gray leading-relaxed">
                      {insight.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
