"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type Role = "mahasiswa" | "perusahaan";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className + " bg-[#F5F7FA]"}>
        {children}
        <MobileNav />
      </body>
    </html>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const [role, setRole] = useState<Role | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const r = (localStorage.getItem("role") as Role | null) || null;
    setIsLoggedIn(logged);
    setRole(logged ? r : null);
  }, [pathname]);

  const showNav = useMemo(() => {
    const hide =
      pathname === "/" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgot");
    return !hide && isLoggedIn;
  }, [pathname, isLoggedIn]);

  const links = useMemo(() => {
    if (!role) return [];

    if (role === "perusahaan") {
      return [
        { href: "/dashboard", label: "Beranda", icon: "🏠" },
        { href: "/lowongan", label: "Lowongan", icon: "💼" },
        { href: "/profil", label: "Profil", icon: "👤" },
      ];
    }

    return [
      { href: "/dashboard", label: "Beranda", icon: "🏠" },
      { href: "/lowongan", label: "Lowongan", icon: "💼" },
      { href: "/qna", label: "Q&A", icon: "💬" },
      { href: "/profil", label: "Profil", icon: "👤" },
    ];
  }, [role]);

  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-black/5">
      {/* WRAPPER */}
      <div className="mx-auto max-w-[520px] px-3 py-2">
        {/* ✅ MAHASISWA → 4 tombol, justify-between */}
        {role === "mahasiswa" && (
          <div className="flex justify-between">
            {links.map(renderNavItem(pathname))}
          </div>
        )}

        {/* ✅ PERUSAHAAN → 3 tombol, grid biar proporsional */}
        {role === "perusahaan" && (
          <div className="grid grid-cols-3 justify-items-center">
            {links.map(renderNavItem(pathname))}
          </div>
        )}
      </div>
    </nav>
  );
}

/* ======================
   Nav Item Component
====================== */

function renderNavItem(pathname: string) {
  return (l: { href: string; label: string; icon: string }) => {
    const active =
      pathname === l.href ||
      (l.href !== "/dashboard" && pathname.startsWith(l.href));

    return (
      <Link
        key={l.href}
        href={l.href}
        className={
          "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition " +
          (active
            ? "bg-[#F2C14E]/40 text-[#0F1A2A]"
            : "text-slate-600 hover:bg-slate-100")
        }
      >
        <span className="text-base">{l.icon}</span>
        <span>{l.label}</span>
      </Link>
    );
  };
}
