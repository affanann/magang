"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Input from "@/components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Masukkan email dan kata sandi terlebih dahulu.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    }, 600);
  };

  const quickLogin = (role: "mahasiswa" | "perusahaan") => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      router.push("/dashboard");
    }, 400);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-animated">
        <div className="relative w-full max-w-[380px]">
          <div className="rounded-[26px] bg-white/90 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/20 p-6 sm:p-7">
            {/* Logo */}
            <div className="flex justify-center mb-3">
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 px-4 py-3">
                <Image
                  src="/logo-maganging.png"
                  alt="Maganging"
                  width={150}
                  height={150}
                  priority
                  className="w-[140px] h-auto"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-xl sm:text-2xl font-extrabold text-[#0F1A2A]">
              Masuk ke Maganging
            </h1>
            <p className="text-center text-xs sm:text-sm text-slate-500 mt-1 mb-5">
              Silakan masuk untuk melanjutkan
            </p>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-3">
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

              <div className="flex justify-end text-xs">
                <Link
                  href="/forgot"
                  className="font-semibold text-[#0F1A2A] hover:underline"
                >
                  Lupa Kata Sandi?
                </Link>
              </div>

              {/* PRIMARY BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-yellow"
              >
                <span className="relative z-10">
                  {loading ? "Memproses..." : "Masuk"}
                </span>
                <span className="btn-shine" />
              </button>

              <p className="text-center text-xs text-slate-600">
                Belum punya akun?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#0F1A2A] hover:underline"
                >
                  Daftar
                </Link>
              </p>

              {/* Quick login */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => quickLogin("mahasiswa")}
                  className="btn-secondary"
                >
                  Masuk sebagai Mahasiswa
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin("perusahaan")}
                  className="btn-secondary"
                >
                  Masuk sebagai Perusahaan
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-[11px] text-white/70 mt-4">
            © {new Date().getFullYear()} Maganging
          </p>
        </div>
      </div>

      {/* GLOBAL STYLE */}
      <style jsx global>{`
        .bg-animated {
          background: linear-gradient(135deg, #0b1220, #0f1a2a);
        }

        /* Primary Yellow Button */
        .btn-primary-yellow {
          position: relative;
          width: 100%;
          height: 42px;
          border-radius: 14px;
          background: #f2c14e;
          color: #0f1a2a;
          font-weight: 700;
          overflow: hidden;
          transition: transform 160ms ease;
        }

        .btn-primary-yellow:hover {
          background: #eab308;
        }

        .btn-primary-yellow:active {
          transform: scale(0.97);
        }

        .btn-primary-yellow:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-shine {
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          transition: transform 420ms ease;
        }

        .btn-primary-yellow:hover .btn-shine {
          transform: translateX(120%);
        }

        /* Secondary buttons */
        .btn-secondary {
          width: 100%;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(15, 26, 42, 0.15);
          background: white;
          color: #0f1a2a;
          font-weight: 600;
          transition: background 200ms ease, transform 160ms ease;
        }

        .btn-secondary:hover {
          background: rgba(15, 26, 42, 0.05);
        }

        .btn-secondary:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}
