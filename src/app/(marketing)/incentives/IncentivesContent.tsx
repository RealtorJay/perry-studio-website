"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { staggerContainerSlow, viewportConfig } from "@/lib/animations";

const federalIncentives = [
  {
    name: "Section 179D Deduction",
    amount: "Up to $5.00/sqft",
    description:
      "The Energy Efficient Commercial Building Deduction allows building owners to deduct up to $5.00 per square foot for energy-efficient improvements. BAS optimization and retro-commissioning qualify when they achieve 25%+ energy reduction. For a 100,000 sqft building, that's up to a $500,000 tax deduction.",
    status: "Active — Enhanced by Inflation Reduction Act",
    qualifier: "Commercial building owners who achieve 25%+ energy savings vs. ASHRAE baseline",
  },
  {
    name: "Accelerated Depreciation (MACRS)",
    amount: "5-year write-off",
    description:
      "Building controls equipment — controllers, sensors, actuators, and automation hardware — qualifies for 5-year accelerated depreciation under MACRS. Combined with bonus depreciation, you may be able to deduct the full cost of controls upgrades in the first year.",
    status: "Active — Bonus depreciation phasing down annually",
    qualifier: "Controls hardware and automation equipment installed in commercial buildings",
  },
  {
    name: "Inflation Reduction Act Credits",
    amount: "Up to 30% ITC",
    description:
      "The IRA expanded Investment Tax Credits for commercial energy efficiency projects. Qualifying building envelope, HVAC, and controls improvements can receive up to 30% tax credits when prevailing wage and apprenticeship requirements are met.",
    status: "Active through 2032",
    qualifier: "Commercial energy efficiency improvements meeting IRA requirements",
  },
];

const localIncentives = [
  {
    name: "Oncor Commercial Solutions",
    amount: "$0.04–$0.16/kWh saved",
    description:
      "Oncor's Commercial Solutions program provides rebates based on verified energy savings from efficiency improvements. BAS optimization, retro-commissioning, and controls upgrades qualify. Rebates are calculated per kWh of verified annual energy savings — a building saving 200,000 kWh/year could receive $8,000–$32,000 in rebates.",
    status: "Active — Apply before project completion",
    qualifier: "Commercial buildings in Oncor service territory (most of DFW)",
  },
  {
    name: "Texas PACE Financing",
    amount: "100% project financing",
    description:
      "Property Assessed Clean Energy (PACE) financing covers 100% of energy improvement project costs with no money down. Payments are assessed through your property tax bill over 10–25 years. No personal guarantee required — the loan stays with the building if sold.",
    status: "Active in Dallas, Fort Worth, and most DFW municipalities",
    qualifier: "Commercial and industrial property owners (no residential)",
  },
  {
    name: "Dallas Green Building Program",
    amount: "Expedited permitting + fee reductions",
    description:
      "The City of Dallas offers expedited permitting and reduced fees for projects that meet green building standards. Energy efficiency improvements through BAS optimization can qualify when documented with verified savings data.",
    status: "Active",
    qualifier: "Commercial projects within Dallas city limits",
  },
];

const financingOptions = [
  {
    name: "C-PACE Financing",
    benefit: "No money down, stays with the building",
    description:
      "Commercial PACE covers 100% of your project cost. Payments are made through your property tax bill over 10–25 years at fixed rates. If you sell the building, the PACE assessment transfers to the new owner — it's not personal debt.",
  },
  {
    name: "Performance Contracting",
    benefit: "Pay from guaranteed savings",
    description:
      "Perry Studio can structure performance-based contracts where our fees are paid from verified energy savings. If we don't save you money, you don't pay. We guarantee the savings and share the results.",
  },
  {
    name: "SBA 504 Green Loans",
    benefit: "Below-market rates, 10-25 year terms",
    description:
      "The SBA 504 program offers favorable financing for energy efficiency improvements to commercial buildings. Low fixed rates, long terms, and only 10% down payment required.",
  },
  {
    name: "Utility On-Bill Financing",
    benefit: "Repay through your electric bill",
    description:
      "Some Texas utilities offer on-bill financing where improvement costs are added to your monthly electric bill. Payments are typically less than the energy savings — so your bill goes down from day one.",
  },
];

const roiData = [
  { label: "Typical energy reduction", value: "15–30%" },
  { label: "Payback after incentives", value: "1–3 years" },
  { label: "Value created per $1 saved", value: "$12–$20" },
  { label: "DFW avg. electricity rate", value: "$0.09/kWh" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function IncentivesContent() {
  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="py-32 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f3] to-white" />
        <div className="relative max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel center>Incentives & Financing</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black text-center">
              Your building upgrade
              <br />
              pays for itself.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-[680px] mx-auto text-center">
              Between federal tax deductions, utility rebates, and creative
              financing — most building owners pay little to nothing out of
              pocket for controls optimization. Here&apos;s how.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ROI snapshot */}
      <section className="bg-ps-black py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainerSlow}
        >
          {roiData.map((item) => (
            <motion.div key={item.label} variants={cardVariants}>
              <p className="text-[32px] md:text-[40px] font-bold text-white leading-none">
                {item.value}
              </p>
              <p className="mt-3 text-[14px] text-[#888]">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Federal Incentives */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>Federal Incentives</SectionLabel>
            <h2 className="mt-6 text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-ps-black">
              Tax deductions and credits.
            </h2>
            <p className="mt-4 text-[19px] text-ps-gray max-w-2xl">
              The federal government wants you to make your building more
              efficient. These programs put real money back in your pocket.
            </p>
          </FadeIn>

          <motion.div
            className="mt-12 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainerSlow}
          >
            {federalIncentives.map((item) => (
              <motion.div
                key={item.name}
                variants={cardVariants}
                className="bg-white border border-ps-border rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-ps-black">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-[16px] text-ps-gray leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-3 text-[13px] text-ps-gray">
                      <span className="font-semibold text-ps-black">Who qualifies:</span>{" "}
                      {item.qualifier}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[24px] md:text-[28px] font-bold text-ps-gold">
                      {item.amount}
                    </p>
                    <p className="text-[12px] text-emerald-600 font-semibold mt-1">
                      {item.status}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Local / DFW Incentives */}
      <section className="py-24 md:py-32 px-6 bg-ps-warm">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>DFW Local Incentives</SectionLabel>
            <h2 className="mt-6 text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-ps-black">
              Texas-specific programs.
            </h2>
            <p className="mt-4 text-[19px] text-ps-gray max-w-2xl">
              Oncor rebates, PACE financing, and local green building programs
              available right here in DFW.
            </p>
          </FadeIn>

          <motion.div
            className="mt-12 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainerSlow}
          >
            {localIncentives.map((item) => (
              <motion.div
                key={item.name}
                variants={cardVariants}
                className="bg-white border border-ps-border rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-ps-black">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-[16px] text-ps-gray leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-3 text-[13px] text-ps-gray">
                      <span className="font-semibold text-ps-black">Who qualifies:</span>{" "}
                      {item.qualifier}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[24px] md:text-[28px] font-bold text-ps-gold">
                      {item.amount}
                    </p>
                    <p className="text-[12px] text-emerald-600 font-semibold mt-1">
                      {item.status}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>Financing</SectionLabel>
            <h2 className="mt-6 text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-ps-black">
              Pay nothing upfront.
            </h2>
            <p className="mt-4 text-[19px] text-ps-gray max-w-2xl">
              Multiple paths to finance your building optimization with zero out
              of pocket. Pick the one that fits your situation.
            </p>
          </FadeIn>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainerSlow}
          >
            {financingOptions.map((item) => (
              <motion.div
                key={item.name}
                variants={cardVariants}
                className="border border-ps-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-[20px] font-bold text-ps-black">
                  {item.name}
                </h3>
                <p className="text-[14px] font-semibold text-ps-gold mt-1">
                  {item.benefit}
                </p>
                <p className="mt-3 text-[15px] text-ps-gray leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Property Value Impact */}
      <section className="bg-ps-black py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center">
              <SectionLabel light center>
                Property Value Impact
              </SectionLabel>
              <h2 className="mt-6 text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-white">
                Every dollar saved increases
                <br />
                your building&apos;s value.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 max-w-3xl mx-auto bg-[#111118] rounded-xl border border-[#1e1e2a] p-8">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-6">
                Cap Rate Math — How Energy Savings Affect Property Value
              </p>
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#1e1e2a] pb-4">
                  <span className="text-[15px] text-[#888]">
                    Annual energy savings from optimization
                  </span>
                  <span className="text-[20px] font-bold text-white font-mono">
                    $40,000
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-[#1e1e2a] pb-4">
                  <span className="text-[15px] text-[#888]">
                    Direct increase to Net Operating Income (NOI)
                  </span>
                  <span className="text-[20px] font-bold text-emerald-400 font-mono">
                    +$40,000
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-[#1e1e2a] pb-4">
                  <span className="text-[15px] text-[#888]">
                    At a 6% cap rate, property value increase
                  </span>
                  <span className="text-[28px] font-bold text-white font-mono">
                    +$666,667
                  </span>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-[15px] text-[#ccc] leading-relaxed">
                    A $40,000 annual energy savings doesn&apos;t just save you
                    $40K/year — it increases your building&apos;s market value by
                    over <span className="text-white font-bold">$650,000</span>{" "}
                    at a typical DFW cap rate. This is the number your
                    appraiser, lender, and buyers will see.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 md:py-32 px-6 bg-ps-warm">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>Sustainability</SectionLabel>
            <h2 className="mt-6 text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-ps-black">
              Why this matters beyond dollars.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-ps-border">
                <p className="text-[40px] font-bold text-ps-gold leading-none">
                  30%
                </p>
                <p className="text-[14px] font-semibold text-ps-black mt-2">
                  of commercial energy is wasted
                </p>
                <p className="text-[14px] text-ps-gray mt-2 leading-relaxed">
                  Commercial buildings consume 35% of U.S. electricity. Nearly a
                  third of that is wasted through inefficient controls, drifted
                  sensors, and poor scheduling.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-ps-border">
                <p className="text-[40px] font-bold text-ps-gold leading-none">
                  ESG
                </p>
                <p className="text-[14px] font-semibold text-ps-black mt-2">
                  reporting for institutional owners
                </p>
                <p className="text-[14px] text-ps-gray mt-2 leading-relaxed">
                  REITs and institutional investors increasingly require ESG
                  reporting. Verified energy reductions from controls
                  optimization provide documented, auditable sustainability
                  metrics.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-ps-border">
                <p className="text-[40px] font-bold text-ps-gold leading-none">
                  LEED
                </p>
                <p className="text-[14px] font-semibold text-ps-black mt-2">
                  O+M credits through optimization
                </p>
                <p className="text-[14px] text-ps-gray mt-2 leading-relaxed">
                  BAS optimization contributes to LEED for Existing Buildings:
                  Operations &amp; Maintenance credits — including Energy &amp;
                  Atmosphere, Indoor Environmental Quality, and ongoing
                  commissioning.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stacking Example */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel center>Real Example</SectionLabel>
            <h2 className="mt-6 text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-ps-black text-center">
              How it all stacks together.
            </h2>
            <p className="mt-4 text-[19px] text-ps-gray max-w-2xl mx-auto text-center">
              A real scenario for a 100,000 sqft Class B office building in
              Dallas. Watch how incentives transform the economics.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="bg-[#111118] rounded-2xl border border-[#1e1e2a] p-6 md:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555] mb-6">
                  100,000 sqft Office — Dallas, TX
                </p>
                <div className="space-y-4">
                  <Row
                    label="Project cost (controls optimization + sensors + monitoring)"
                    value="$175,000"
                    color="text-white"
                    bold
                  />
                  <Row
                    label="Less: Oncor rebate (200,000 kWh saved × $0.06/kWh)"
                    value="−$12,000"
                    color="text-emerald-400"
                  />
                  <Row
                    label="Less: Section 179D deduction ($1.00/sqft × 25% tax rate)"
                    value="−$25,000"
                    color="text-emerald-400"
                  />
                  <Row
                    label="Less: Section 179 expensing ($80K hardware × 25% tax rate)"
                    value="−$20,000"
                    color="text-emerald-400"
                  />
                  <div className="border-t border-[#1e1e2a] pt-4">
                    <Row
                      label="Net effective cost"
                      value="$118,000"
                      color="text-white"
                      bold
                    />
                  </div>
                  <div className="border-t border-[#1e1e2a] pt-4 space-y-3">
                    <Row
                      label="Annual energy savings (22% reduction)"
                      value="$49,500/yr"
                      color="text-emerald-400"
                      bold
                    />
                    <Row
                      label="Payback on net cost"
                      value="2.4 years"
                      color="text-white"
                    />
                    <Row
                      label="Property value increase ($49.5K ÷ 7.5% cap rate)"
                      value="+$660,000"
                      color="text-white"
                      bold
                    />
                    <Row
                      label="Return on investment (value created vs. net cost)"
                      value="5.6×"
                      color="text-white"
                    />
                  </div>
                </div>

                <div className="mt-6 bg-white/5 rounded-lg p-4">
                  <p className="text-[14px] text-[#ccc] leading-relaxed">
                    <span className="text-white font-bold">
                      With C-PACE financing:
                    </span>{" "}
                    Zero upfront cost. Annual PACE payment of ~$16,600 vs.
                    $49,500 in savings ={" "}
                    <span className="text-emerald-400 font-bold">
                      $32,900 positive cash flow from day one.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ps-black py-32 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.03] rounded-full blur-[100px]" />
        <div className="relative max-w-6xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-[36px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-white">
              Let us show you the
              <br />
              numbers.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-[19px] text-[#888] max-w-lg mx-auto">
              We&apos;ll walk your building, quantify the waste, and map out
              exactly which incentives and financing options apply to your
              situation.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact" className="btn-gold mt-10">
              Schedule Your Free Walkthrough
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  color,
  bold,
}: {
  label: string;
  value: string;
  color: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[14px] text-[#888]">{label}</span>
      <span
        className={`text-[18px] font-mono shrink-0 ${color} ${bold ? "font-bold" : "font-semibold"}`}
      >
        {value}
      </span>
    </div>
  );
}
