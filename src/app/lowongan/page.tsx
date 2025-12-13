"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { magangData } from "@/data/magangData";
import { getCompanyJobs, getRole, Job } from "@/lib/storage";

type Sort = "terbaru" | "az";

export default function LowonganPage() {
  const router = useRouter();
  const [sort, setSort] = useState<Sort>("terbaru");
  const [q, setQ] = useState("");
  const [role, setRole] = useState<ReturnType<typeof getRole>>(null);
  const [companyJobs, setCompanyJobsState] = useState<Job[]>([]);

  useEffect(() => {
    setRole(getRole());
    setCompanyJobsState(getCompanyJobs());
  }, []);

  const allJobs = useMemo(() => {
    // gabung data default (magangData) + data perusahaan dari localStorage
    const fromCompany = companyJobs.map((j) => ({
      id: j.id,
      perusahaan: j.perusahaan,
      posisi: j.posisi,
      lokasi: j.lokasi,
      tanggal: j.tanggal,
      deskripsi: j.deskripsi,
      status: j.status,
      sumber: "company" as const,
    }));

    const fromSeed = magangData.map((m) => ({
      ...m,
      status: "aktif" as const,
      sumber: "seed" as const,
    }));

    let list = [...fromCompany, ...fromSeed];

    // filter cari
    const keyword = q.trim().toLowerCase();
    if (keyword) {
      list = list.filter(
        (x) =>
          x.perusahaan.toLowerCase().includes(keyword) ||
          x.posisi.toLowerCase().includes(keyword) ||
          x.lokasi.toLowerCase().includes(keyword)
      );
    }

    // sort
    if (sort === "az") {
      list.sort((a, b) => a.posisi.localeCompare(b.posisi));
    } else {
      // terbaru: biarin urutan awal (company dulu sudah terbaru karena unshift)
    }

    // mahasiswa: tampil semua yang aktif
    // perusahaan: tampil semua, tapi yang tutup dikasih badge
    return list;
  }, [companyJobs, q, sort]);

  return (
    <AuthGuard allow={["mahasiswa", "perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Lowongan</div>
              <div className="text-xs text-slate-500">
                Jelajahi lowongan magang yang tersedia
              </div>
            </div>

            {role === "perusahaan" && (
              <button
                onClick={() => router.push("/lowongan/manage")}
                className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1b2a44] transition"
              >
                Kelola Lowongan
              </button>
            )}
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 space-y-5">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari posisi / perusahaan / lokasi…"
              className="h-11 w-full md:max-w-md rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setSort("terbaru")}
                className={
                  "h-11 px-4 rounded-2xl border text-sm font-semibold transition " +
                  (sort === "terbaru"
                    ? "bg-[#F59E0B]/15 border-[#F59E0B]/30 text-[#0F172A]"
                    : "bg-white border-gray-200 hover:bg-gray-100")
                }
              >
                Terbaru
              </button>
              <button
                onClick={() => setSort("az")}
                className={
                  "h-11 px-4 rounded-2xl border text-sm font-semibold transition " +
                  (sort === "az"
                    ? "bg-[#F59E0B]/15 border-[#F59E0B]/30 text-[#0F172A]"
                    : "bg-white border-gray-200 hover:bg-gray-100")
                }
              >
                A–Z
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {allJobs.map((item) => {
              const closed = item.status === "tutup";
              return (
                <div
                  key={`${item.sumber}-${item.id}`}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-extrabold">{item.posisi}</div>
                      <div className="text-sm text-slate-600">{item.perusahaan}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        📍 {item.lokasi} • 📅 {item.tanggal}
                      </div>
                    </div>

                    {closed ? (
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200">
                        TUTUP
                      </span>
                    ) : (
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-full border bg-green-50 text-green-700 border-green-200">
                        AKTIF
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-700 mt-3 line-clamp-3">
                    {item.deskripsi}
                  </p>

                  <button
                    disabled={closed}
                    onClick={() => router.push(`/magang/${item.id}`)}
                    className={
                      "mt-4 w-full h-11 rounded-2xl text-sm font-extrabold transition " +
                      (closed
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#F59E0B] text-white hover:bg-[#d78909]")
                    }
                  >
                    Lihat Detail
                  </button>
                </div>
              );
            })}
          </div>

          {allJobs.length === 0 && (
            <div className="text-center text-sm text-slate-500">
              Tidak ada hasil untuk pencarian kamu.
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
