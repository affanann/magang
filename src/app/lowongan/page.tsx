// src/app/lowongan/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { magangData } from "@/data/magangData";
import {
  addApplication,
  getCompanyJobs,
  getRole,
  Job,
  Lamaran,
  uid,
} from "@/lib/storage";

type Sort = "terbaru" | "az";

export default function LowonganPage() {
  return (
    <AuthGuard>
      <LowonganInner />
    </AuthGuard>
  );
}

function LowonganInner() {
  const router = useRouter();
  const role = getRole();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("terbaru");

  const companyJobs = useMemo<Job[]>(() => {
    // untuk perusahaan: dia lihat lowongan buatan dia di manage/create
    // untuk mahasiswa: kita juga bisa tampilkan lowongan perusahaan demo (ownerId apapun)
    // tapi karena localStorage per user, kita ambil milik current uid saja (cukup buat demo).
    return getCompanyJobs(uid());
  }, []);

  const merged = useMemo(() => {
    const fromMagangData: Job[] = magangData.map((m) => ({
      id: `seed_${m.id}`,
      perusahaan: m.perusahaan,
      posisi: m.posisi,
      lokasi: m.lokasi,
      tanggal: m.tanggal,
      deskripsi: "Deskripsi masih demo. Nanti bisa diisi lengkap.",
      status: "aktif",
      ownerId: "seed",
    }));

    const all = [...companyJobs, ...fromMagangData];

    const filtered = all.filter((j) => {
      const s = `${j.perusahaan} ${j.posisi} ${j.lokasi}`.toLowerCase();
      return s.includes(q.trim().toLowerCase());
    });

    if (sort === "az") {
      filtered.sort((a, b) => (a.posisi + a.perusahaan).localeCompare(b.posisi + b.perusahaan));
    }

    return filtered;
  }, [companyJobs, q, sort]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="font-extrabold text-lg">Lowongan</div>

          {role === "perusahaan" ? (
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/lowongan/create")}
                className="px-4 py-2 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
              >
                + Buat Lowongan
              </button>
              <button
                onClick={() => router.push("/lowongan/manage")}
                className="px-4 py-2 rounded-xl border border-gray-300 text-[#0F172A] font-semibold hover:bg-gray-100 transition"
              >
                Kelola
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/lamaran")}
              className="px-4 py-2 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
            >
              Lihat Lamaran Saya
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari perusahaan / posisi / lokasi..."
            className="w-full sm:w-[60%] h-11 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 rounded-xl border border-gray-200 px-3 outline-none"
          >
            <option value="terbaru">Terbaru</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {merged.map((j) => (
            <div
              key={j.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{j.perusahaan}</div>
                  <div className="text-sm text-gray-600">{j.posisi}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  j.status === "aktif" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {j.status === "aktif" ? "Aktif" : "Tutup"}
                </span>
              </div>

              <div className="text-xs text-gray-500 mt-2">
                📍 {j.lokasi} <br />
                📅 {j.tanggal}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => router.push(`/magang/${stripSeed(j.id)}`)}
                  className="flex-1 border border-gray-300 rounded-xl py-2 text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Detail
                </button>

                {role === "mahasiswa" ? (
                  <button
                    disabled={j.status !== "aktif"}
                    onClick={() => applyJob(j)}
                    className="flex-1 bg-[#F59E0B] text-white rounded-xl py-2 text-sm font-semibold hover:bg-[#d78909] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Lamar
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/lowongan/manage")}
                    className="flex-1 bg-[#F59E0B] text-white rounded-xl py-2 text-sm font-semibold hover:bg-[#d78909] transition"
                  >
                    Kelola
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {merged.length === 0 && (
          <div className="text-sm text-gray-600 text-center py-10">
            Tidak ada lowongan yang cocok.
          </div>
        )}

        <div className="h-24" />
      </main>
    </div>
  );
}

function stripSeed(id: string) {
  // magangData detail kamu pakai /magang/[id] (yang id original)
  if (id.startsWith("seed_")) return id.replace("seed_", "");
  return id; // kalau job perusahaan, detail bisa kamu buat nanti
}

function applyJob(j: Job) {
  const app: Lamaran = {
    id: `app_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`,
    jobId: j.id,
    perusahaan: j.perusahaan,
    posisi: j.posisi,
    status: "Dikirim",
    createdAt: Date.now(),
    applicantName: "Mahasiswa Demo",
  };
  addApplication(app);
  alert("Lamaran berhasil dikirim (demo). Cek di menu Lamaran.");
}
