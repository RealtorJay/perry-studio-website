import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminClients() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("profiles")
    .select("*, buildings(count)")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-ps-black">Clients</h1>
        <Link
          href="/admin/clients/new"
          className="bg-ps-gold text-white rounded-full px-5 py-2.5 text-[14px] font-semibold hover:brightness-110 transition-all"
        >
          Invite Client
        </Link>
      </div>

      <div className="mt-8 border border-ps-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-ps-subtle">
              <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                Name
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide hidden md:table-cell">
                Company
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                Buildings
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {clients && clients.length > 0 ? (
              clients.map((c) => (
                <tr key={c.id} className="border-t border-ps-border">
                  <td className="px-4 py-3 text-[14px] text-ps-black">
                    <Link
                      href={`/admin/clients/${c.id}`}
                      className="hover:text-ps-gold font-medium"
                    >
                      {c.full_name || "Unnamed"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray hidden md:table-cell">
                    {c.company || "—"}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray">
                    {(c.buildings as { count: number }[])?.[0]?.count ?? 0}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ps-gray">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-[14px] text-ps-gray"
                >
                  No clients yet. Invite your first client to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
