"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
type Role = "mahasiswa" | "perusahaan";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<Role | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const r = (localStorage.getItem("role") as Role | null) || null;
    setIsLoggedIn(logged);
    setRole(logged ? r : null);
  }, [pathname]);

  // tampil nav hanya pada halaman setelah login (bukan /, /login, /signup, /forgot)
  const showNav = useMemo(() => {
    const hide =
      pathname === "/" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgot");
    return !hide && isLoggedIn;
  }, [pathname, isLoggedIn]);

  return (
    <html lang="id">
      <body className={inter.className + " bg-[#F5F7FA]"}>
        {/* Wrapper: kasih padding bawah saat MobileNav muncul biar konten gak ketutup */}
        <div className={showNav ? "pb-[88px] sm:pb-0" : ""}>
          {children}
        </div>

        <MobileNav role={role} isLoggedIn={isLoggedIn} showNav={showNav} />
      </body>
    </html>
  );
}

function MobileNav({
  role,
  isLoggedIn,
  showNav,
}: {
  role: Role | null;
  isLoggedIn: boolean;
  showNav: boolean;
}) {
  const pathname = usePathname();

  const links = useMemo(() => {
    if (!role) return [];
    if (role === "perusahaan") {
      return [
        { href: "/dashboard", label: "Beranda", icon: "🏠" },
        { href: "/lowongan", label: "Lowongan", icon: "💼" },
        { href: "/profil", label: "Profil", icon: "👤" },
      ];
    }
    // mahasiswa
    return [
      { href: "/dashboard", label: "Beranda", icon: "🏠" },
      { href: "/lowongan", label: "Lowongan", icon: "💼" },
      { href: "/qna", label: "Q&A", icon: "💬" },
      { href: "/profil", label: "Profil", icon: "👤" },
    ];
  }, [role]);

  if (!showNav || !isLoggedIn) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-black/5">
      {/* max width biar enak di HP, padding proporsional */}
      <div className="mx-auto max-w-[520px] px-3 sm:px-4 py-2">
        <div className="grid grid-cols-4 gap-2">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-2xl text-[11px] font-semibold transition " +
                  (active
                    ? "bg-[#F2C14E]/40 text-[#0F1A2A]"
                    : "text-slate-600 hover:bg-slate-100")
                }
              >
                <span className="text-base leading-none">{l.icon}</span>
                <span className="leading-none">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
