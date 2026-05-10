"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview", icon: "◉" },
  { href: "/admin/contacts", label: "Contacts", icon: "✉" },
  { href: "/admin/clients", label: "Clients", icon: "◎" },
  { href: "/admin/cms", label: "CMS", icon: "✎" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-ps-black flex flex-col shrink-0">
      <div className="px-5 py-5">
        <Link href="/admin" className="text-[14px] font-medium text-ps-light">
          Perry Studio
        </Link>
        <p className="text-[11px] text-ps-gray mt-0.5">Admin</p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                isActive
                  ? "bg-white/10 text-ps-light"
                  : "text-ps-gray hover:text-ps-light hover:bg-white/5"
              }`}
            >
              <span className="text-[14px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <Link
          href="/"
          className="text-[12px] text-ps-gray hover:text-ps-light transition-colors"
        >
          ← View site
        </Link>
      </div>
    </aside>
  );
}
