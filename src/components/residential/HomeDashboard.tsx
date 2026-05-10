"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

function useLiveData() {
  const [data, setData] = useState({
    // Climate
    outsideTemp: 87.4,
    humidity: 48,
    hvacMode: "Cooling" as const,
    rooms: [
      { name: "Living Room", temp: 72.1, setpoint: 72, status: "normal" as const },
      { name: "Master Bedroom", temp: 71.4, setpoint: 71, status: "normal" as const },
      { name: "Kitchen", temp: 73.2, setpoint: 72, status: "warning" as const },
      { name: "Office", temp: 70.8, setpoint: 71, status: "normal" as const },
      { name: "Kids Room", temp: 72.0, setpoint: 72, status: "normal" as const },
      { name: "Garage", temp: 84.6, setpoint: 85, status: "normal" as const },
    ],
    // Security
    locks: [
      { name: "Front Door", locked: true },
      { name: "Back Door", locked: true },
      { name: "Garage Entry", locked: false },
      { name: "Side Gate", locked: true },
    ],
    alarmState: "Armed — Home" as string,
    cameras: [
      { name: "Front Porch", status: "online" as const },
      { name: "Backyard", status: "online" as const },
      { name: "Driveway", status: "online" as const },
      { name: "Garage", status: "offline" as const },
    ],
    // Energy
    currentDraw: 4.2,
    dailyCost: 8.74,
    solarProduction: 6.1,
    netEnergy: -1.9,
    monthlyUsage: [32, 28, 35, 30, 27, 33, 29, 31, 34, 26, 28, 30],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        outsideTemp: +(prev.outsideTemp + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity: Math.min(65, Math.max(35, prev.humidity + Math.round((Math.random() - 0.5) * 2))),
        currentDraw: +(Math.max(1.5, Math.min(8, prev.currentDraw + (Math.random() - 0.5) * 0.3))).toFixed(1),
        solarProduction: +(Math.max(0, Math.min(9, prev.solarProduction + (Math.random() - 0.5) * 0.2))).toFixed(1),
        rooms: prev.rooms.map((r) => ({
          ...r,
          temp: +(r.temp + (Math.random() - 0.5) * 0.15).toFixed(1),
        })),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return data;
}

const lockColors = {
  true: "bg-emerald-400",
  false: "bg-amber-400",
};

const cameraColors = {
  online: "bg-emerald-400",
  offline: "bg-red-400",
};

const statusDot = {
  normal: "bg-emerald-400",
  warning: "bg-amber-400",
  critical: "bg-red-400",
};

export default function HomeDashboard() {
  const data = useLiveData();
  const [activeTab, setActiveTab] = useState<"climate" | "security" | "energy">("climate");

  return (
    <section className="bg-[#0a0a0f] py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel light center>
              Home OS
            </SectionLabel>
            <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              Your home. One screen.
            </h2>
            <p className="mt-4 text-[19px] text-[#666] max-w-xl mx-auto">
              Every system in your home — climate, security, energy — unified
              into a single intelligent dashboard.
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
                  perry-home-os — 4821 Mockingbird Lane, Dallas TX
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
              {(["climate", "security", "energy"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab
                      ? "text-white border-b-2 border-white bg-[#111118]"
                      : "text-[#555] hover:text-[#888]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 min-h-[420px]">
              <AnimatePresence mode="wait">
                {activeTab === "climate" && (
                  <motion.div
                    key="climate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Top metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      <MetricCard
                        label="HVAC Mode"
                        value={data.hvacMode}
                        color="text-cyan-400"
                      />
                      <MetricCard
                        label="Outside"
                        value={`${data.outsideTemp}°F`}
                        color="text-[#666]"
                      />
                      <MetricCard
                        label="Humidity"
                        value={`${data.humidity}%`}
                        color="text-cyan-400"
                      />
                      <MetricCard
                        label="Active Zones"
                        value={`${data.rooms.length}`}
                        suffix={` / ${data.rooms.length}`}
                        color="text-emerald-400"
                      />
                    </div>

                    {/* Room zones */}
                    <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-4">
                        Room Temperatures
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.rooms.map((room) => (
                          <div
                            key={room.name}
                            className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#111118]"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${statusDot[room.status]}`}
                              />
                              <span className="text-[13px] text-[#888]">
                                {room.name}
                              </span>
                            </div>
                            <span className="text-[13px] font-mono text-white">
                              {room.temp}°
                              <span className="text-[#444] ml-1">
                                / {room.setpoint}°
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Alarm status */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      <MetricCard
                        label="Alarm"
                        value={data.alarmState}
                        color="text-emerald-400"
                      />
                      <MetricCard
                        label="Doors Locked"
                        value={`${data.locks.filter((l) => l.locked).length}`}
                        suffix={` / ${data.locks.length}`}
                        color={
                          data.locks.every((l) => l.locked)
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      />
                      <MetricCard
                        label="Cameras Online"
                        value={`${data.cameras.filter((c) => c.status === "online").length}`}
                        suffix={` / ${data.cameras.length}`}
                        color={
                          data.cameras.every((c) => c.status === "online")
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Locks */}
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-4">
                          Door Locks
                        </p>
                        <div className="space-y-3">
                          {data.locks.map((lock) => (
                            <div
                              key={lock.name}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${lockColors[String(lock.locked) as "true" | "false"]}`}
                                />
                                <span className="text-[13px] text-[#888]">
                                  {lock.name}
                                </span>
                              </div>
                              <span
                                className={`text-[12px] font-mono font-semibold ${
                                  lock.locked
                                    ? "text-emerald-400"
                                    : "text-amber-400"
                                }`}
                              >
                                {lock.locked ? "Locked" : "Unlocked"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cameras */}
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-4">
                          Cameras
                        </p>
                        <div className="space-y-3">
                          {data.cameras.map((cam) => (
                            <div
                              key={cam.name}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${cameraColors[cam.status]}`}
                                />
                                <span className="text-[13px] text-[#888]">
                                  {cam.name}
                                </span>
                              </div>
                              <span
                                className={`text-[12px] font-mono font-semibold ${
                                  cam.status === "online"
                                    ? "text-emerald-400"
                                    : "text-red-400"
                                }`}
                              >
                                {cam.status === "online" ? "Online" : "Offline"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "energy" && (
                  <motion.div
                    key="energy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Top metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      <MetricCard
                        label="Current Draw"
                        value={`${data.currentDraw}`}
                        suffix=" kW"
                        color="text-amber-400"
                      />
                      <MetricCard
                        label="Solar Output"
                        value={`${data.solarProduction}`}
                        suffix=" kW"
                        color="text-emerald-400"
                      />
                      <MetricCard
                        label="Net Energy"
                        value={`${data.netEnergy > 0 ? "+" : ""}${data.netEnergy}`}
                        suffix=" kW"
                        color={
                          data.netEnergy <= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      />
                      <MetricCard
                        label="Today's Cost"
                        value={`$${data.dailyCost}`}
                        color="text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Usage chart */}
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-3">
                          24-Hour Usage Profile
                        </p>
                        <div className="flex items-end gap-[3px] h-[80px]">
                          {Array.from({ length: 24 }, (_, i) => {
                            const base = i > 6 && i < 22 ? 50 : 20;
                            const peak = i > 14 && i < 20 ? 30 : 0;
                            const h = base + peak + Math.random() * 15;
                            return (
                              <div
                                key={i}
                                className="flex-1 rounded-sm bg-gradient-to-t from-amber-500/30 to-amber-400/60"
                                style={{ height: `${h}%` }}
                              />
                            );
                          })}
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-[10px] text-[#444] font-mono">
                            12am
                          </span>
                          <span className="text-[10px] text-[#444] font-mono">
                            12pm
                          </span>
                          <span className="text-[10px] text-[#444] font-mono">
                            11pm
                          </span>
                        </div>
                      </div>

                      {/* Monthly summary */}
                      <div className="bg-[#0d0d14] rounded-xl p-4 border border-[#1e1e2a]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-3">
                          Monthly Cost (kWh)
                        </p>
                        <div className="flex items-end gap-[3px] h-[80px]">
                          {data.monthlyUsage.map((v, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400/60"
                              style={{ height: `${(v / 40) * 100}%` }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-[10px] text-[#444] font-mono">
                            Jan
                          </span>
                          <span className="text-[10px] text-[#444] font-mono">
                            Dec
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Solar insight */}
                    <div className="mt-4 bg-[#0d0d14] rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
                          Energy Insight
                        </span>
                      </div>
                      <p className="text-[14px] text-[#999] leading-relaxed">
                        Your solar panels are currently producing more energy
                        than your home is consuming. Net surplus is being
                        credited back to your account. Based on today&apos;s
                        production, your estimated daily energy cost is $0.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className="px-5 py-3 border-t border-[#1e1e2a] bg-[#0d0d14] flex items-center justify-between">
              <span className="text-[10px] text-[#333] font-mono">
                Perry Studio Home OS v1.0
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
      <p
        className={`text-[24px] md:text-[28px] font-bold ${color} leading-none mt-2 font-mono`}
      >
        {value}
        {suffix && <span className="text-[14px] text-[#444]">{suffix}</span>}
      </p>
    </div>
  );
}
