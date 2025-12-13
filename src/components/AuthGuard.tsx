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

    if (!isLoggedIn || !role) {
      router.replace(redirectTo);
      return;
    }

    if (!allow.includes(role)) {
      router.replace("/dashboard");
      return;
    }

    // kalau sudah login, jangan balik ke login page
    if (pathname === "/") {
      // boleh, tapi kalau kamu ingin tetap bisa akses / untuk debug, hapus block ini
      // router.replace("/dashboard");
    }
  }, [router, allow, redirectTo, pathname]);

  return <>{children}</>;
}
