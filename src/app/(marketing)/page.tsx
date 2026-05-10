import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Problem from "@/components/home/Problem";
import Services from "@/components/home/Services";
import Equipment from "@/components/home/Equipment";
import HowItWorks from "@/components/home/HowItWorks";
import ControlPanel from "@/components/home/ControlPanel";
import WhyUs from "@/components/home/WhyUs";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Problem />
      <Services />
      <Equipment />
      <HowItWorks />
      <ControlPanel />
      <WhyUs />
      <CTA />
    </>
  );
}
