import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ps-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-[18px] font-semibold">Perry Studio</p>
            <p className="text-[14px] text-[#888] mt-2 max-w-sm leading-relaxed">
              Building Intelligence That Pays For Itself. AI-powered controls
              optimization for DFW commercial buildings.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-[13px] text-[#666]">
              <a
                href="mailto:jordan@perrystudio.com"
                className="hover:text-white transition-colors"
              >
                jordan@perrystudio.com
              </a>
              <a
                href="tel:+14695555555"
                className="hover:text-white transition-colors"
              >
                (469) 555-5555
              </a>
              <span>Dallas–Fort Worth, Texas</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-[#555] mb-4">
              Company
            </p>
            <div className="flex flex-col gap-3">
              {[
                { href: "/services/commercial", label: "Commercial Services" },
                { href: "/services/residential", label: "Residential Services" },
                { href: "/about", label: "About" },
                { href: "/incentives", label: "Tax Incentives" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-[#888] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-[#555] mb-4">
              We Work With
            </p>
            <div className="flex flex-col gap-3 text-[13px] text-[#888]">
              <span>Trane Tracer</span>
              <span>Johnson Controls</span>
              <span>Siemens Desigo</span>
              <span>Honeywell EBI</span>
              <span>Niagara N4</span>
              <span className="mt-2 text-[#555]">—</span>
              <span>Apple HomeKit</span>
              <span>Lutron</span>
              <span>Ecobee</span>
              <span>Ring / Alarm.com</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[12px] text-[#555]">
            &copy; 2026 Perry Studio. All rights reserved.
          </p>
          <p className="text-[12px] text-[#555]">
            Vendor-neutral · Owner-aligned · DFW-native
          </p>
        </div>
      </div>
    </footer>
  );
}
