"use client";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
      <div className="bg-white shadow rounded-xl p-5">
        <p className="font-semibold mb-2">Nama:</p>
        <p className="text-gray-700 mb-4">Affan Madley</p>
        <p className="font-semibold mb-2">Email:</p>
        <p className="text-gray-700 mb-4">affan@example.com</p>

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
