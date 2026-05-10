"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface PortalHeaderProps {
  userEmail?: string;
  userName?: string;
}

export default function PortalHeader({ userEmail, userName }: PortalHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="h-14 border-b border-ps-border flex items-center justify-between px-6">
      <p className="text-[14px] text-ps-black">
        {userName ? `Welcome, ${userName}` : "Welcome"}
      </p>
      <div className="flex items-center gap-4">
        {userEmail && (
          <span className="text-[13px] text-ps-gray">{userEmail}</span>
        )}
        <button
          onClick={handleSignOut}
          className="text-[13px] text-ps-gray hover:text-ps-black transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
