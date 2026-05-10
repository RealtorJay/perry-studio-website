import type { Metadata } from "next";
import IncentivesContent from "./IncentivesContent";

export const metadata: Metadata = {
  title: "Tax Incentives & Financing — Perry Studio",
  description:
    "Federal tax deductions, Oncor utility rebates, PACE financing, and sustainability incentives for DFW commercial building energy optimization.",
};

export default function IncentivesPage() {
  return <IncentivesContent />;
}
