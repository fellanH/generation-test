"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setIsAuthenticated(Boolean(data.session));
      setIsLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_evt, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (isLoading) return null;

  return isAuthenticated ? (
    <button onClick={handleSignOut} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
      Sign out
    </button>
  ) : (
    <Link href="/login" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
      Log in
    </Link>
  );
}

