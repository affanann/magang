"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";

type Role = "mahasiswa" | "perusahaan";
type User = { email: string; password: string; role: Role; name?: string };

function getUsers(): User[] {
  try {
    const raw = localStorage.getItem("users");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setUsers(users: User[]) {
  localStorage.setItem("users", JSON.stringify(users));
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("mahasiswa");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email dan password wajib diisi.");
      return;
    }

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      alert("Email sudah terdaftar.");
      return;
    }

    users.push({ name: name.trim(), email: cleanEmail, password, role });
    setUsers(users);

    alert("Pendaftaran berhasil. Silakan login.");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-animated">
      <div className="w-full max-w-[380px] rounded-[26px] bg-white/90 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/20 p-6 sm:p-7">
        <div className="flex justify-center mb-3">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 px-4 py-3">
            <Image src="/logo-magangin.png" alt="Magangin" width={150} height={150} priority className="w-[140px] h-auto select-none" />
          </div>
        </div>

        <h1 className="text-center text-xl sm:text-2xl font-extrabold text-[#0F1A2A]">
          Daftar Akun
        </h1>
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-1 mb-5">
          Pilih jenis akun saat mendaftar
        </p>

        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("mahasiswa")}
              className={`h-10 rounded-xl border font-semibold ${
                role === "mahasiswa"
                  ? "bg-[#F2C14E] border-[#F2C14E] text-[#0F1A2A]"
                  : "bg-white border-black/10 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Mahasiswa
            </button>
            <button
              type="button"
              onClick={() => setRole("perusahaan")}
              className={`h-10 rounded-xl border font-semibold ${
                role === "perusahaan"
                  ? "bg-[#F2C14E] border-[#F2C14E] text-[#0F1A2A]"
                  : "bg-white border-black/10 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Perusahaan
            </button>
          </div>

          <Input placeholder="Alamat email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Kata sandi" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="btn-primary-yellow">
            Daftar
          </button>

          <p className="text-center text-xs text-slate-600">
            Sudah punya akun?{" "}
            <Link href="/" className="font-semibold text-[#0F1A2A] hover:underline">
              Masuk
            </Link>
          </p>
        </form>
      </div>

      <style jsx global>{`
        .bg-animated { background: linear-gradient(135deg, #0b1220, #0f1a2a); }
        .btn-primary-yellow {
          width: 100%;
          height: 42px;
          border-radius: 14px;
          background: #f2c14e;
          color: #0f1a2a;
          font-weight: 800;
          transition: background 180ms ease, transform 160ms ease;
        }
        .btn-primary-yellow:hover { background: #eab308; }
        .btn-primary-yellow:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}
