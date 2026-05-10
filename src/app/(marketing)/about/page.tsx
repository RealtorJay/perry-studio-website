import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Perry Studio",
  description:
    "Jordan McClelland — licensed real estate professional and building controls technician. Building intelligence that speaks the language of building owners.",
};

export default function AboutPage() {
  return <AboutContent />;
}
