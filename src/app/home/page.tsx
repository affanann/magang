"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#0F1A2A] mb-2">
          Selamat Datang di Aplikasi Magang
        </h1>
        <p className="text-gray-600 mb-6">
          Anda berhasil masuk. Halaman ini hanya contoh dummy untuk beranda.
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            router.push("/");
          }}
          className="bg-[#F59E0B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d78909]"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
