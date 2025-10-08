"use client"; // wajib di atas

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const links = [
    { href: "/dashboard", label: "Beranda", icon: "🏠" },
    { href: "/lowongan", label: "Lowongan", icon: "💼" },
    { href: "/qna", label: "Q&A", icon: "💬" },
    { href: "/profil", label: "Profil", icon: "👤" },
  ];

  // hanya tampil di halaman yang sudah login
  if (
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/lowongan") &&
    !pathname.startsWith("/qna") &&
    !pathname.startsWith("/profil")
  ) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] flex justify-between px-6 py-2 text-xs md:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center w-1/4 text-center transition-all ${
              isActive ? "text-[#F59E0B] scale-105 font-semibold" : "text-gray-500"
            }`}
          >
            <span className="text-xl leading-none mb-1">{link.icon}</span>
            <span className="text-[11px]">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
