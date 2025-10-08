"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilPage() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("role");
    if (!loggedIn) {
      router.push("/");
    } else {
      setRole(userRole === "perusahaan" ? "Perusahaan" : "Mahasiswa");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <header className="bg-[#0F172A] text-white py-5 px-6 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-bold">Profil</h1>
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="bg-[#F59E0B] text-white text-sm px-4 py-2 rounded-md hover:bg-[#d78909]"
        >
          Keluar
        </button>
      </header>

      {/* Konten */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-md p-8 text-center max-w-sm w-full border border-gray-100">
          <div className="w-20 h-20 bg-[#F59E0B]/20 text-[#F59E0B] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            👤
          </div>
          <h2 className="text-xl font-bold mb-1">Akun {role}</h2>
          <p className="text-sm text-gray-500 mb-6">
            Anda login sebagai {role === "Perusahaan" ? "Perusahaan" : "Mahasiswa"}.
          </p>

          <div className="space-y-3 text-sm text-left">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">Nama</span>
              <span>
                {role === "Perusahaan" ? "Perusahaan User" : "Mahasiswa User"}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">Email</span>
              <span>
                {role === "Perusahaan"
                  ? "perusahaan@magangin.com"
                  : "mahasiswa@magangin.com"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Status</span>
              <span className="text-[#F59E0B] font-semibold">{role}</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} Magangin. Semua hak dilindungi.
      </footer>
    </div>
  );
}
