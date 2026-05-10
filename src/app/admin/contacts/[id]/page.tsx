import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContactDetail from "./ContactDetail";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: contact } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (!contact) return notFound();

  // Mark as read if new
  if (contact.status === "new") {
    await supabase
      .from("contact_submissions")
      .update({ status: "read" })
      .eq("id", id);
  }

  return (
    <div>
      <Link
        href="/admin/contacts"
        className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
      >
        ← Back to contacts
      </Link>

      <div className="mt-6">
        <h1 className="text-[28px] font-bold text-ps-black">{contact.name}</h1>
        <p className="text-[14px] text-ps-gray mt-1">
          Submitted {new Date(contact.created_at).toLocaleString()}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide mb-1">
              Email
            </p>
            <p className="text-[16px] text-ps-black">
              <a href={`mailto:${contact.email}`} className="hover:text-ps-gold">
                {contact.email}
              </a>
            </p>
          </div>
          {contact.phone && (
            <div>
              <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide mb-1">
                Phone
              </p>
              <p className="text-[16px] text-ps-black">{contact.phone}</p>
            </div>
          )}
          {contact.address && (
            <div>
              <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide mb-1">
                Building Address
              </p>
              <p className="text-[16px] text-ps-black">{contact.address}</p>
            </div>
          )}
          {contact.building_size && (
            <div>
              <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide mb-1">
                Building Size
              </p>
              <p className="text-[16px] text-ps-black">
                {contact.building_size}
              </p>
            </div>
          )}
        </div>

        <div>
          {contact.message && (
            <div>
              <p className="text-[12px] font-semibold text-ps-gray uppercase tracking-wide mb-1">
                Message
              </p>
              <p className="text-[16px] text-ps-black leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          )}
        </div>
      </div>

      <ContactDetail contact={contact} />
    </div>
  );
}
