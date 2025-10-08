"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";

export default function SignUpPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !password) {
      alert("Semua kolom wajib diisi.");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-[#0F1A2A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <h1 className="text-3xl font-extrabold text-[#0F1A2A] mb-1 text-center">
          Daftar
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Buat akun baru untuk melanjutkan.
        </p>

        <form onSubmit={handleRegister} className="flex flex-col">
          <Input
            placeholder="Nama lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
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

          <Button label="Daftar" type="submit" />

          <p className="text-center text-sm mt-4 text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/"
              className="text-[#0F1A2A] font-semibold hover:underline"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
