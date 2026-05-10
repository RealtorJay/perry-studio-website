import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Perry Studio",
  description:
    "Schedule a free building walkthrough. DFW-based building automation consulting — no cost, no commitment, just answers.",
};

export default function ContactPage() {
  return <ContactContent />;
}
