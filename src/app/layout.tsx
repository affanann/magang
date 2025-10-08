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

  // hanya tampil di halaman setelah login
  if (
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/lowongan") &&
    !pathname.startsWith("/qna") &&
    !pathname.startsWith("/profil")
  ) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around py-2 text-sm md:hidden">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center ${
            pathname === link.href ? "text-[#F59E0B]" : "text-gray-500"
          }`}
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
