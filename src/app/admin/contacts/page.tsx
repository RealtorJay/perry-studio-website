import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminContacts() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-[28px] font-bold text-ps-black">
        Contact Submissions
      </h1>

      <div className="mt-8 border border-ps-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-ps-subtle">
              <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide">
                Name
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide hidden md:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold text-ps-gray uppercase tracking-wide hidden md:table-cell">
                Building Size
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
            {contacts && contacts.length > 0 ? (
              contacts.map((c) => (
                <tr key={c.id} className="border-t border-ps-border">
                  <td className="px-4 py-3 text-[14px] text-ps-black">
                    <Link
                      href={`/admin/contacts/${c.id}`}
                      className="hover:text-ps-gold font-medium"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray hidden md:table-cell">
                    {c.email}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-ps-gray hidden md:table-cell">
                    {c.building_size || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        c.status === "new"
                          ? "bg-ps-gold/10 text-ps-gold"
                          : c.status === "replied"
                            ? "bg-green-50 text-green-700"
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
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-[14px] text-ps-gray"
                >
                  No contact submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
