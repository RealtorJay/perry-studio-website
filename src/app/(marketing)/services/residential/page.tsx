import type { Metadata } from "next";
import ResidentialServicesContent from "./ResidentialServicesContent";

export const metadata: Metadata = {
  title: "Residential Smart Home Services — Perry Studio",
  description:
    "A unified smart home system for your home. Dedicated network, wall-recessed control panels, HVAC, security, and lighting — all working as one intelligent system.",
};

export default function ResidentialServicesPage() {
  return <ResidentialServicesContent />;
}
