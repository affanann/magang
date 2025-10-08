"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      // ✅ ubah redirect ke /dashboard
      router.push("/dashboard");
    } else {
      alert("Masukkan email dan kata sandi terlebih dahulu.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1A2A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <h1 className="text-3xl font-extrabold text-[#0F1A2A] mb-1 text-center">
          Masuk
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Selamat datang kembali!
        </p>

        <form onSubmit={handleLogin} className="flex flex-col">
          <Input
            placeholder="Alamat email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Kata sandi"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right text-sm mb-4 mt-1">
            <Link
              href="/forgot"
              className="text-[#0F1A2A] font-semibold hover:underline"
            >
              Lupa Kata Sandi?
            </Link>
          </div>

          <Button label="Masuk" type="submit" />

          <p className="text-center text-sm mt-4 text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/signup"
              className="text-[#0F1A2A] font-semibold hover:underline"
            >
              Daftar
            </Link>
          </p>

          {/* Login cepat dummy */}
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", "mahasiswa");
                router.push("/dashboard");
              }}
              className="border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
            >
              Masuk sebagai Mahasiswa
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", "perusahaan");
                router.push("/dashboard");
              }}
              className="border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
            >
              Masuk sebagai Perusahaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
