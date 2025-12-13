"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type Role = "mahasiswa" | "perusahaan";

export default function AuthGuard({
  children,
  allow = ["mahasiswa", "perusahaan"],
  redirectTo = "/",
}: {
  children: React.ReactNode;
  allow?: Role[];
  redirectTo?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role") as Role | null;

    // wajib login & wajib punya role
    if (!isLoggedIn || !role) {
      router.replace(redirectTo);
      return;
    }

    // kalau role tidak boleh akses halaman ini
    if (!allow.includes(role)) {
      router.replace("/dashboard");
      return;
    }

    // cegah balik ke login kalau sudah login
    if (pathname === "/" || pathname.startsWith("/login")) {
      router.replace("/dashboard");
    }
  }, [router, allow, redirectTo, pathname]);

  return <>{children}</>;
}
