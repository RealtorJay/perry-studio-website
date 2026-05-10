import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminOverview() {
  const supabase = await createClient();

  const [
    { count: contactCount },
    { count: newContactCount },
    { count: clientCount },
    { count: buildingCount },
  ] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "client"),
    supabase.from("buildings").select("*", { count: "exact", head: true }),
  ]);

  const { data: recentContacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    {
      label: "Contact Submissions",
      value: contactCount ?? 0,
      href: "/admin/contacts",
    },
    {
      label: "New (Unread)",
      value: newContactCount ?? 0,
      href: "/admin/contacts",
    },
    { label: "Clients", value: clientCount ?? 0, href: "/admin/clients" },
    { label: "Buildings", value: buildingCount ?? 0, href: "/admin/clients" },
  ];

  return (
    <div>
      <h1 className="text-[28px] font-bold text-ps-black">Dashboard</h1>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-ps-border rounded-xl p-5 hover:bg-ps-subtle transition-colors"
          >
            <p className="text-[36px] font-bold text-ps-black">{stat.value}</p>
            <p className="text-[13px] text-ps-gray mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-semibold text-ps-black">
            Recent Contact Submissions
          </h2>
          <Link
            href="/admin/contacts"
            className="text-[13px] text-ps-gold hover:opacity-80"
          >
            View all →
          </Link>
        </div>

        {recentContacts && recentContacts.length > 0 ? (
          <div className="border border-ps-border rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-ps-subtle">
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentContacts.map((c) => (
                  <tr key={c.id} className="border-t border-ps-border">
                    <td className="px-4 py-3 text-[14px] text-ps-black">
                      <Link
                        href={`/admin/contacts/${c.id}`}
                        className="hover:text-ps-gold"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[14px] text-ps-gray">
                      {c.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          c.status === "new"
                            ? "bg-ps-gold/10 text-ps-gold"
                            : "bg-ps-subtle text-ps-gray"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-ps-gray">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[14px] text-ps-gray">
            No contact submissions yet.
          </p>
        )}
      </div>
    </div>
  );
}
