"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/incentives", label: "Incentives" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-ps-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-[14px] font-semibold text-ps-black tracking-[-0.01em]"
          >
            Perry Studio
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-ps-gray hover:text-ps-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-[12px] font-semibold text-white bg-ps-black rounded-full px-4 py-1.5 hover:bg-ps-black/80 transition-colors"
            >
              Free Walkthrough
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -mr-2"
            aria-label="Open menu"
          >
            <div className="w-[18px] flex flex-col gap-[4px]">
              <span className="block h-[1.5px] bg-ps-black" />
              <span className="block h-[1.5px] bg-ps-black" />
            </div>
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={[...links, { href: "/contact", label: "Free Walkthrough" }]}
      />
    </>
  );
}
