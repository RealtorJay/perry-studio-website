import type { Metadata } from "next";
import ServicesOverview from "./ServicesOverview";

export const metadata: Metadata = {
  title: "Services — Perry Studio",
  description:
    "Intelligent systems for commercial buildings and modern homes. Building controls optimization and smart home integration in DFW.",
};

export default function ServicesPage() {
  return <ServicesOverview />;
}
