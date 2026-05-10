"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

// Simulated live data
function useLiveData() {
  const [data, setData] = useState({
    healthScore: 87,
    activeFaults: 3,
    wasteIdentified: 4230,
    savingsYTD: 31450,
    supplyTemp: 55.2,
    returnTemp: 72.8,
    outsideTemp: 94.6,
    humidity: 42,
    kw: 284,
    kwTrend: -3.2,
    zones: [
      { name: "Floor 1 — Lobby", temp: 72.1, setpoint: 72, status: "normal" as const },
      { name: "Floor 2 — Office", temp: 74.8, setpoint: 73, status: "warning" as const },
      { name: "Floor 3 — Office", temp: 71.9, setpoint: 72, status: "normal" as const },
      { name: "Floor 4 — Executive", temp: 70.5, setpoint: 71, status: "normal" as const },
      { name: "Floor 5 — Server", temp: 68.2, setpoint: 68, status: "normal" as const },
    ],
    faults: [
      { id: 1, severity: "high" as const, title: "AHU-2 economizer stuck closed", time: "2m ago", savings: "$180/day" },
      { id: 2, severity: "medium" as const, title: "Floor 2 VAV-12 hunting", time: "1h ago", savings: "$45/day" },
      { id: 3, severity: "low" as const, title: "Sensor drift — OAT reading +3°F", time: "4h ago", savings: "$12/day" },
    ],
    aiInsight: "AHU-2 economizer has been stuck closed for 48 hours. Outside air is 68°F — free cooling is available but not being used. Estimated waste: $180/day. Recommended action: Check actuator linkage on the economizer damper.",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        supplyTemp: +(prev.supplyTemp + (Math.random() - 0.5) * 0.3).toFixed(1),
        returnTemp: +(prev.returnTemp + (Math.random() - 0.5) * 0.2).toFixed(1),
        outsideTemp: +(prev.outsideTemp + (Math.random() - 0.5) * 0.1).toFixed(1),
        humidity: Math.min(60, Math.max(30, prev.humidity + Math.round((Math.random() - 0.5) * 2))),
        kw: Math.max(200, Math.min(350, prev.kw + Math.round((Math.random() - 0.5) * 8))),
        zones: prev.zones.map((z) => ({
          ...z,
          temp: +(z.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        })),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return data;
}

const severityColors = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

const statusDot = {
  normal: "bg-emerald-400",
  warning: "bg-amber-400",
  critical: "bg-red-400",
};

export default function ControlPanel() {
  const data = useLiveData();
  const [activeTab, setActiveTab] = useState<"overview" | "faults" | "ai">("overview");

  return (
    <section className="bg-[#0a0a0f] py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel light center>
              Perry Studio Intelligence
            </SectionLabel>
            <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              Your building. In real time.
            </h2>
            <p className="mt-4 text-[19px] text-[#666] max-w-xl mx-auto">
              AI-powered monitoring that catches problems before they cost you money.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="scale">
          <div className="bg-[#111118] rounded-2xl border border-[#1e1e2a] shadow-2xl shadow-black/50 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e2a] bg-[#0d0d14]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-[#444] font-mono">
                  perry-studio-monitor — Commerce Tower, Dallas TX
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-[#1e1e2a]">
              {(["overview", "faults", "ai"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab
                      ? "text-white border-b-2 border-white bg-[#111118]"
                      : "text-[#555] hover:text-[#888]"
                  }`}
                >
                  {tab === "ai" ? "AI Insights" : tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 min-h-[420px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Top metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      <MetricCard
                        label="Health Score"
                        value={`${data.healthScore}`}
                        suffix="/100"
                        color="text-emerald-400"
                      />
                      <MetricCard
                        label="Active Faults"
                        value={`${data.activeFaults}`}
                        color="text-amber-400"
                      />
                      <MetricCard
                        label="Waste This Month"
                        value={`$${data.wasteIdentified.toLocaleString()}`}
                        color="text-red-400"
                      />
                      <MetricCard
                        label="Savings YTD"
                        value={`$${data.savingsYTD.toLocaleString()}`}
                        color="text-emerald-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Temps */}
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-3">
                          System Temps
                        </p>
                        <div className="space-y-3">
                          <TempRow label="Supply Air" value={data.supplyTemp} unit="°F" color="text-blue-400" />
                          <TempRow label="Return Air" value={data.returnTemp} unit="°F" color="text-orange-400" />
                          <TempRow label="Outside Air" value={data.outsideTemp} unit="°F" color="text-[#666]" />
                          <TempRow label="Humidity" value={data.humidity} unit="%" color="text-cyan-400" />
                        </div>
                      </div>

                      {/* Power */}
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-3">
                          Power Demand
                        </p>
                        <p className="text-[40px] font-bold text-white leading-none font-mono">
                          {data.kw}
                          <span className="text-[16px] text-[#555] ml-1">kW</span>
                        </p>
                        <p className={`text-[13px] mt-2 font-mono ${data.kwTrend < 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {data.kwTrend < 0 ? "↓" : "↑"} {Math.abs(data.kwTrend)}% vs last week
                        </p>
                        {/* Mini bar chart */}
                        <div className="flex items-end gap-[3px] mt-4 h-[60px]">
                          {Array.from({ length: 24 }, (_, i) => {
                            const h = 20 + Math.random() * 40 + (i > 6 && i < 18 ? 20 : 0);
                            return (
                              <div
                                key={i}
                                className="flex-1 rounded-sm bg-white/20"
                                style={{ height: `${h}%` }}
                              />
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-[#444] mt-1 font-mono">
                          24-hour demand profile
                        </p>
                      </div>

                      {/* Zones */}
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-3">
                          Zone Status
                        </p>
                        <div className="space-y-2.5">
                          {data.zones.map((zone) => (
                            <div
                              key={zone.name}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${statusDot[zone.status]}`} />
                                <span className="text-[12px] text-[#888] truncate max-w-[140px]">
                                  {zone.name}
                                </span>
                              </div>
                              <span className="text-[12px] font-mono text-white">
                                {zone.temp}°
                                <span className="text-[#444] ml-1">/ {zone.setpoint}°</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "faults" && (
                  <motion.div
                    key="faults"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-3">
                      {data.faults.map((fault) => (
                        <div
                          key={fault.id}
                          className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a] flex items-start gap-4"
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${severityColors[fault.severity]}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="text-[14px] font-semibold text-white">
                                {fault.title}
                              </p>
                              <span className="text-[11px] text-[#555] font-mono shrink-0">
                                {fault.time}
                              </span>
                            </div>
                            <p className="text-[13px] text-red-400/80 font-mono mt-1">
                              Wasting {fault.savings}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                      <div className="flex items-baseline justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555]">
                          Total Active Fault Cost
                        </p>
                        <p className="text-[24px] font-bold text-red-400 font-mono">
                          $237/day
                        </p>
                      </div>
                      <p className="text-[12px] text-[#444] mt-1">
                        ≈ $7,110/month if unresolved · $85,320/year
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "ai" && (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#0d0d14] rounded-xl p-5 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
                          AI Analysis — High Priority
                        </span>
                      </div>
                      <p className="text-[15px] text-[#ccc] leading-relaxed">
                        {data.aiInsight}
                      </p>
                      <div className="mt-4 flex gap-3">
                        <button className="text-[12px] font-semibold text-white bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
                          Schedule Fix
                        </button>
                        <button className="text-[12px] font-semibold text-[#555] bg-[#1a1a24] rounded-lg px-4 py-2 hover:bg-[#222] transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-2">
                          Energy Trend
                        </p>
                        <p className="text-[14px] text-[#999] leading-relaxed">
                          Energy costs are down 12% month-over-month. The
                          optimization work completed in March is delivering
                          projected savings. Summer cooling season will be the
                          real test.
                        </p>
                      </div>
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-2">
                          Predicted Issues
                        </p>
                        <p className="text-[14px] text-[#999] leading-relaxed">
                          Based on runtime patterns, AHU-1 fan bearing may need
                          replacement within 60 days. Current vibration signature
                          is within tolerance but trending upward.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-2">
                        Monthly Savings Projection
                      </p>
                      <div className="flex items-end gap-1 h-[80px] mt-2">
                        {[2800, 3100, 2900, 3400, 3200, 3800, 4100, 3900, 4500, 4200, 4800, 5200].map((v, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400/60"
                            style={{ height: `${(v / 5200) * 100}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] text-[#444] font-mono">Jan</span>
                        <span className="text-[10px] text-[#444] font-mono">Dec</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className="px-5 py-3 border-t border-[#1e1e2a] bg-[#0d0d14] flex items-center justify-between">
              <span className="text-[10px] text-[#333] font-mono">
                Perry Studio Intelligence v2.0
              </span>
              <span className="text-[10px] text-[#333] font-mono">
                Last sync: 3s ago
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: string;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555]">
        {label}
      </p>
      <p className={`text-[28px] md:text-[32px] font-bold ${color} leading-none mt-2 font-mono`}>
        {value}
        {suffix && <span className="text-[14px] text-[#444]">{suffix}</span>}
      </p>
    </div>
  );
}

function TempRow({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-[#666]">{label}</span>
      <span className={`text-[14px] font-mono font-semibold ${color}`}>
        {value}{unit}
      </span>
    </div>
  );
}
