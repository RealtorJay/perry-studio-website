"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-white" />
      <div className="relative h-full flex flex-col px-6 pt-4">
        <div className="flex items-center justify-between h-[52px]">
          <Link
            href="/"
            onClick={onClose}
            className="text-[14px] font-medium text-ps-black"
          >
            Perry Studio
          </Link>
          <button
            onClick={onClose}
            className="p-2 -mr-2"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M1 1L17 17M17 1L1 17"
                stroke="#1D1D1F"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-8 mt-16">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-[32px] font-semibold text-ps-black tracking-[-0.03em]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
