"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { magangData } from "@/data/magangData";
import { getCompanyJobs, getRole, Job } from "@/lib/storage";

type Sort = "terbaru" | "az";

export default function LowonganPage() {
  const router = useRouter();
  const [role, setRole] = useState<"mahasiswa" | "perusahaan">("mahasiswa");
  const [q, setQ] = useState("");
  const [lokasi, setLokasi] = useState("Semua");
  const [sort, setSort] = useState<Sort>("terbaru");

  const [companyJobs, setCompanyJobsState] = useState<Job[]>([]);

  useEffect(() => {
    const r = getRole();
    if (r) setRole(r);
    setCompanyJobsState(getCompanyJobs());
  }, []);

  // gabungkan magangData + companyJobs (untuk demo)
  const allJobs = useMemo(() => {
    const fromCompany = companyJobs
      .filter((j) => j.status !== "tutup")
      .map((j) => ({
        id: j.id,
        perusahaan: j.perusahaan,
        posisi: j.posisi,
        lokasi: j.lokasi,
        tanggal: j.tanggal,
      }));

    // magangData dari dataset kamu (anggap sudah sesuai)
    const fromSeed = magangData.map((m) => ({
      id: String(m.id),
      perusahaan: m.perusahaan,
      posisi: m.posisi,
      lokasi: m.lokasi,
      tanggal: m.tanggal,
    }));

    // companyJobs tampil paling atas
    return [...fromCompany, ...fromSeed];
  }, [companyJobs]);

  const lokasiOptions = useMemo(() => {
    const set = new Set<string>();
    allJobs.forEach((j) => set.add(j.lokasi));
    return ["Semua", ...Array.from(set)];
  }, [allJobs]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let arr = allJobs.filter((j) => {
      const matchQ =
        !query ||
        j.perusahaan.toLowerCase().includes(query) ||
        j.posisi.toLowerCase().includes(query);
      const matchLok = lokasi === "Semua" || j.lokasi === lokasi;
      return matchQ && matchLok;
    });

    if (sort === "az") {
      arr = arr.sort((a, b) => a.posisi.localeCompare(b.posisi));
    } else {
      // terbaru: demo saja -> companyJobs sudah ditaruh di atas + tanggal string
      arr = arr.sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
    }

    return arr;
  }, [allJobs, q, lokasi, sort]);

  return (
    <AuthGuard allow={["mahasiswa", "perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Lowongan Magang</div>
              <div className="text-xs text-slate-500">
                Cari lowongan sesuai minatmu
              </div>
            </div>

            <div className="flex items-center gap-2">
              {role === "perusahaan" && (
                <button
                  onClick={() => router.push("/lowongan/manage")}
                  className="px-4 py-2 rounded-xl bg-[#F59E0B] text-white text-sm font-semibold hover:bg-[#d78909] transition"
                >
                  Kelola Lowongan
                </button>
              )}
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
              >
                Kembali
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* filter bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
            <div className="grid md:grid-cols-3 gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari perusahaan / posisi..."
                className="h-11 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />

              <select
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="h-11 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              >
                {lokasiOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              >
                <option value="terbaru">Sort: Terbaru</option>
                <option value="az">Sort: A-Z Posisi</option>
              </select>
            </div>
          </div>

          {/* list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((j) => (
              <div
                key={j.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{j.perusahaan}</div>
                    <div className="text-sm text-slate-600">{j.posisi}</div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-[#F59E0B]/10 text-[#b57407] font-semibold">
                    Magang
                  </span>
                </div>

                <div className="text-xs text-slate-500 mt-3 space-y-1">
                  <div>📍 {j.lokasi}</div>
                  <div>📅 {j.tanggal}</div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => router.push(`/magang/${j.id}`)}
                    className="h-10 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => {
                      // mahasiswa saja yang bisa apply (demo)
                      if (role !== "mahasiswa") {
                        alert("Aksi ini khusus akun mahasiswa.");
                        return;
                      }
                      router.push(`/magang/${j.id}`);
                    }}
                    className="h-10 rounded-xl bg-[#F59E0B] text-white text-sm font-semibold hover:bg-[#d78909] transition"
                  >
                    Lamar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!filtered.length && (
            <div className="text-center text-sm text-slate-600 mt-10">
              Tidak ada lowongan yang cocok.
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
