import type { Metadata } from "next";
import CommercialServicesContent from "./CommercialServicesContent";

export const metadata: Metadata = {
  title: "Commercial Services — Perry Studio",
  description:
    "Building assessments, controls optimization, and ongoing monitoring for DFW commercial buildings. Find the waste, fix it, keep it fixed.",
};

export default function CommercialServicesPage() {
  return <CommercialServicesContent />;
}
