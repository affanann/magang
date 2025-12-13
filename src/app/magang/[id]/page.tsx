// src/app/magang/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { magangData } from "@/data/magangData";
import {
  addApplication,
  getRole,
  getMyApplications,
  Lamaran,
} from "@/lib/storage";

export default function MagangDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = (params?.id as string) || "";

  const item = useMemo(
    () => magangData.find((x) => String(x.id) === String(id)),
    [id]
  );

  const [already, setAlready] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      router.replace("/");
      return;
    }
    const apps = getMyApplications();
    setAlready(apps.some((a) => a.jobId === String(id)));
  }, [id, router]);

  if (!item) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F8FAFC] text-[#0F172A] px-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="text-sm font-semibold">Lowongan tidak ditemukan.</div>
          <Link
            href="/lowongan"
            className="inline-flex mt-3 px-4 py-2 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  function applyNow() {
    if (!item) return;

    const role = getRole();
    if (role !== "mahasiswa") {
      alert("Hanya akun mahasiswa yang bisa melamar (mode demo).");
      return;
    }

    const app: Lamaran = {
      id: `app_${Date.now()}`,
      jobId: String(item.id),
      perusahaan: item.perusahaan,
      posisi: item.posisi,
      status: "Dikirim",
      createdAt: Date.now(),
      applicantName: "Mahasiswa Demo",
    };

    // ✅ jangan kirim argumen tambahan
    addApplication(app);
    setAlready(true);
    alert("Lamaran berhasil dikirim (demo)!");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/lowongan"
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Kembali
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:opacity-95 transition"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-2xl font-extrabold">{item.posisi}</div>
              <div className="text-sm text-slate-600">{item.perusahaan}</div>
              <div className="text-xs text-slate-500 mt-2">
                📍 {item.lokasi} • 📅 {item.tanggal}
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-extrabold border bg-[#F59E0B]/10 text-[#b57407] border-[#F59E0B]/20">
              Populer
            </span>
          </div>

          <div className="mt-6 text-sm text-slate-700 leading-relaxed">
            {item.deskripsi || "Deskripsi belum tersedia (demo)."}
          </div>

          <div className="mt-6">
            <button
              disabled={already}
              onClick={applyNow}
              className={
                "w-full px-6 py-3 rounded-2xl font-extrabold transition " +
                (already
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-[#F59E0B] text-white hover:bg-[#d78909]")
              }
            >
              {already ? "Sudah Melamar" : "Lamar Sekarang"}
            </button>
            <div className="text-[12px] text-slate-500 mt-2">
              *Mode demo: lamaran disimpan ke localStorage.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
