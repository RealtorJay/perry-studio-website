import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Verify the requesting user is admin
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { email, full_name, company, phone } = body;

    // Invite user via Supabase Admin API
    const { data: inviteData, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: { full_name },
      });

    if (inviteError) {
      return NextResponse.json(
        { error: inviteError.message },
        { status: 500 }
      );
    }

    // Update their profile with extra details
    if (inviteData.user) {
      await supabaseAdmin
        .from("profiles")
        .update({ full_name, company, phone })
        .eq("id", inviteData.user.id);
    }

    return NextResponse.json({ success: true, user: inviteData.user });
  } catch {
    return NextResponse.json(
      { error: "Failed to invite client" },
      { status: 500 }
    );
  }
}
