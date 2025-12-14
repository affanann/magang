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
      const cleanEmail = email.trim().toLowerCase();
      const users = getUsers();

      const found = users.find(
        (u) => u.email.toLowerCase() === cleanEmail && u.password === password
      );

      if (!found) {
        setLoading(false);
        alert("Email atau kata sandi salah / akun belum terdaftar.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", found.role);
      localStorage.setItem("currentUserEmail", found.email);

      router.push("/dashboard");
    }, 400);
  };

  const demoLogin = (role: Role) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("isDemo", "true");
      router.push("/dashboard");
    }, 250);
  };

  return (
    <>
      <div className="min-h-screen bg-animated relative overflow-hidden flex items-center justify-center px-4">
        {/* background */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-400/15 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse z-0" />

        <div className="relative w-full max-w-sm z-10">
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-white/20 px-6 py-6 md:px-8 md:py-6">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 px-5 py-3">
                <Image
                  src="/logo-magangin.png"
                  alt="Magangin"
                  width={110}
                  height={110}
                  priority
                  className="w-[92px] h-auto select-none"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl md:text-[26px] font-extrabold text-[#0F1A2A] tracking-tight mb-1">
              Selamat Datang 👋
            </h1>
            <p className="text-center text-[13px] text-slate-500 mb-5">
              Masuk ke akun Magangin Anda untuk melanjutkan
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

              <div className="flex justify-between items-center text-xs">
                <div />
                <Link
                  href="/forgot"
                  className="font-semibold text-[#0F1A2A] hover:underline"
                >
                  Lupa Kata Sandi?
                </Link>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0F1A2A] font-bold shadow-md hover:from-yellow-300 hover:to-yellow-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 relative overflow-hidden"
              >
                <span className="relative z-10">
                  {loading ? "Memproses..." : "Masuk"}
                </span>
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

              {/* Demo buttons */}
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => demoLogin("mahasiswa")}
                  className="demo-btn demo-yellow"
                >
                  <span className="relative z-10">
                    Masuk sebagai Mahasiswa
                  </span>
                  <span className="demo-sweep" />
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => demoLogin("perusahaan")}
                  className="demo-btn demo-blue"
                >
                  <span className="relative z-10">
                    Masuk sebagai Perusahaan
                  </span>
                  <span className="demo-sweep" />
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-500 pt-1">
                * Tombol di atas hanya untuk demo (tanpa input).
              </p>
            </form>
          </div>

          <p className="text-center text-[11px] text-white/70 mt-3">
            © {new Date().getFullYear()} Magangin
          </p>
        </div>
      </div>

      {/* GLOBAL STYLE */}
      <style jsx global>{`
        .bg-animated {
          background: linear-gradient(135deg, #0b1220, #0f1a2a);
        }

        /* DEMO BUTTON BASE */
        .demo-btn {
          position: relative;
          width: 100%;
          height: 40px;
          border-radius: 14px;
          background: #ffffff;
          font-weight: 700;
          overflow: hidden;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .demo-btn:active {
          transform: scale(0.985);
        }

        .demo-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .demo-sweep {
          position: absolute;
          inset: 0;
          transform: translateX(-110%);
          transition: transform 420ms ease;
          z-index: 0;
          opacity: 0.9;
        }

        .demo-btn:hover .demo-sweep {
          transform: translateX(0%);
        }

        .demo-btn:hover {
          box-shadow: 0 10px 24px rgba(15, 26, 42, 0.08);
        }

        /* MAHASISWA */
        .demo-yellow {
          border: 1px solid rgba(234, 179, 8, 0.45);
          color: #0f1a2a;
        }
        .demo-yellow .demo-sweep {
          background: linear-gradient(
            90deg,
            rgba(250, 204, 21, 0),
            rgba(250, 204, 21, 0.85)
          );
        }

        /* PERUSAHAAN */
        .demo-blue {
          border: 1px solid rgba(59, 130, 246, 0.35);
          color: #0f1a2a;
        }
        .demo-blue .demo-sweep {
          background: linear-gradient(
            90deg,
            rgba(59, 130, 246, 0),
            rgba(59, 130, 246, 0.65)
          );
        }
      `}</style>
    </>
  );
}
