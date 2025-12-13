"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "mahasiswa" | "perusahaan";

export default function AuthGuard({
  allow,
  children,
}: {
  allow: Role[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role") as Role | null;

    if (!logged || !role) {
      router.replace("/");
      return;
    }
    if (!allow.includes(role)) {
      router.replace("/dashboard");
      return;
    }
    setOk(true);
  }, [router, pathname, allow]);

  if (!ok) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F8FAFC] text-[#0F172A]">
        <div className="text-sm text-slate-600">Memuat...</div>
      </div>
    );
  }

  return <>{children}</>;
}
