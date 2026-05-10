import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Auth check — admin only
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { building_id } = await request.json();

    if (!building_id) {
      return NextResponse.json(
        { error: "building_id is required" },
        { status: 400 }
      );
    }

    // Fetch all building data
    const [
      { data: building },
      { data: energyData },
      { data: faults },
      { data: reports },
    ] = await Promise.all([
      supabaseAdmin
        .from("buildings")
        .select("*, profiles(full_name, company)")
        .eq("id", building_id)
        .single(),
      supabaseAdmin
        .from("energy_data")
        .select("*")
        .eq("building_id", building_id)
        .order("month", { ascending: true }),
      supabaseAdmin
        .from("faults")
        .select("*")
        .eq("building_id", building_id)
        .order("detected_at", { ascending: false }),
      supabaseAdmin
        .from("reports")
        .select("id, title, report_type, created_at")
        .eq("building_id", building_id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    if (!building) {
      return NextResponse.json(
        { error: "Building not found" },
        { status: 404 }
      );
    }

    // Build the prompt with all available data
    const openFaults = faults?.filter((f) => f.status === "open") || [];
    const monitoringFaults =
      faults?.filter((f) => f.status === "monitoring") || [];
    const resolvedFaults =
      faults?.filter((f) => f.status === "resolved") || [];
    const totalFaultCost =
      openFaults.reduce(
        (sum, f) => sum + (parseFloat(f.cost_impact) || 0),
        0
      ) +
      monitoringFaults.reduce(
        (sum, f) => sum + (parseFloat(f.cost_impact) || 0),
        0
      );

    const prompt = `You are an AI building controls analyst for Perry Studio, a building automation company in DFW. Analyze the following building data and provide actionable insights for the building owner. Write in plain English — no jargon. The owner cares about money, comfort, and keeping tenants happy.

BUILDING:
- Name: ${building.name}
- Address: ${building.address}
- Size: ${building.sqft ? `${building.sqft.toLocaleString()} sqft` : "Unknown"}
- Controls Platform: ${building.bas_platform || "Unknown"}
- Owner: ${(building.profiles as { full_name: string })?.full_name || "Unknown"}

ENERGY DATA (monthly):
${
  energyData && energyData.length > 0
    ? energyData
        .map(
          (e) =>
            `- ${e.month}: ${e.kwh_usage ? `${e.kwh_usage} kWh` : "no usage data"}, Cost: ${e.cost_dollars ? `$${e.cost_dollars}` : "n/a"}, Waste: ${e.waste_identified ? `$${e.waste_identified}` : "n/a"}, Savings: ${e.savings_achieved ? `$${e.savings_achieved}` : "n/a"}, Health: ${e.health_score ?? "n/a"}/100`
        )
        .join("\n")
    : "No energy data available yet."
}

ACTIVE FAULTS (${openFaults.length} open, ${monitoringFaults.length} monitoring):
${
  openFaults.length > 0 || monitoringFaults.length > 0
    ? [...openFaults, ...monitoringFaults]
        .map(
          (f) =>
            `- [${f.severity.toUpperCase()}] ${f.title}: ${f.description || "No description"} (Est. impact: ${f.cost_impact ? `$${f.cost_impact}` : "unknown"})`
        )
        .join("\n")
    : "No active faults."
}

RESOLVED FAULTS: ${resolvedFaults.length} total
ESTIMATED ACTIVE FAULT COST: $${totalFaultCost.toLocaleString()}

Respond with a JSON object (no markdown, no code fences) with this exact structure:
{
  "summary": "2-3 sentence executive summary of building health and what needs attention. Write for a building owner, not a technician.",
  "recommendations": [
    {
      "priority": "high" | "medium" | "low",
      "title": "Short action item title",
      "description": "What to do and why it matters, in plain English",
      "estimated_savings": "Dollar amount or range if applicable, or null"
    }
  ],
  "energy_trend": "1-2 sentences about the energy cost trend — is it going up, down, or stable? Any seasonal patterns?",
  "fault_analysis": "1-2 sentences about the fault situation. What's the biggest risk right now?",
  "estimated_savings": number or null (total estimated annual savings if all recommendations are implemented)
}

Give 3-5 recommendations, ordered by priority. Be specific and actionable. If data is limited, say so and recommend what data to start collecting.`;

    const anthropic = new Anthropic();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    let insights;
    try {
      insights = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: responseText },
        { status: 500 }
      );
    }

    // Store in database
    const { data: saved, error: saveError } = await supabaseAdmin
      .from("ai_insights")
      .insert({
        building_id,
        summary: insights.summary,
        recommendations: insights.recommendations,
        energy_trend: insights.energy_trend,
        fault_analysis: insights.fault_analysis,
        estimated_savings: insights.estimated_savings,
      })
      .select()
      .single();

    if (saveError) {
      return NextResponse.json(
        { error: saveError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ insight: saved });
  } catch (err) {
    console.error("AI insights error:", err);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
