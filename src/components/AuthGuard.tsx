// src/components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getRole, isLoggedIn, Role } from "@/lib/storage";

export default function AuthGuard({
  children,
  allow,
}: {
  children: React.ReactNode;
  allow?: Role[]; // contoh: allow={["perusahaan"]}
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const ok = isLoggedIn();
    const role = getRole();

    if (!ok || !role) {
      router.replace("/");
      return;
    }

    if (allow && confirmRole(allow, role) === false) {
      router.replace("/dashboard");
      return;
    }
  }, [router, pathname, allow]);

  return <>{children}</>;
}

function confirmRole(allow: Role[], role: Role) {
  return allow.includes(role);
}
