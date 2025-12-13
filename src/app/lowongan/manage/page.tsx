// src/app/lowongan/manage/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Job,
  JobStatus,
  getCompanyJobs,
  setCompanyJobs,
  uid,
} from "@/lib/storage";

export default function LowonganManagePage() {
  const router = useRouter();
  const ownerId = useMemo(() => uid(), []);

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");
    if (!loggedIn || role !== "perusahaan") {
      router.replace("/");
      return;
    }
    setJobs(getCompanyJobs(ownerId));
  }, [ownerId, router]);

  function persist(next: Job[]) {
    setJobs(next);
    setCompanyJobs(next, ownerId);
  }

  function toggleStatus(jobId: string) {
    const next = jobs.map((j) =>
      j.id === jobId
        ? { ...j, status: (j.status === "aktif" ? "tutup" : "aktif") as JobStatus }
        : j
    );
    persist(next);
  }

  function remove(jobId: string) {
    const next = jobs.filter((j) => j.id !== jobId);
    persist(next);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold">Kelola Lowongan</div>
            <div className="text-xs text-slate-500">
              Buat, edit, dan tutup lowongan
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/lowongan/create"
              className="px-4 py-2 rounded-xl bg-[#F59E0B] text-white text-sm font-extrabold hover:bg-[#d78909] transition"
            >
              + Buat Lowongan
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm text-center">
            <div className="text-sm text-slate-600">
              Belum ada lowongan. Klik <b>Buat Lowongan</b> untuk menambahkan.
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {jobs.map((j) => (
              <div
                key={j.id}
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-extrabold">{j.posisi}</div>
                    <div className="text-sm text-slate-600">{j.perusahaan}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      📍 {j.lokasi} • 📅 {j.tanggal}
                    </div>
                  </div>

                  <span
                    className={
                      "px-3 py-1 rounded-full text-xs font-extrabold border " +
                      (j.status === "aktif"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-rose-50 text-rose-700 border-rose-200")
                    }
                  >
                    {j.status === "aktif" ? "Aktif" : "Tutup"}
                  </span>
                </div>

                <p className="text-sm text-slate-700 mt-4 line-clamp-3">
                  {j.deskripsi}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Link
                    href={`/lowongan/edit/${j.id}`}
                    className="text-center px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => toggleStatus(j.id)}
                    className="px-3 py-2 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:opacity-95 transition"
                  >
                    {j.status === "aktif" ? "Tutup" : "Buka"}
                  </button>
                  <button
                    onClick={() => remove(j.id)}
                    className="px-3 py-2 rounded-xl border border-rose-200 text-sm font-semibold text-rose-700 hover:bg-rose-50 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
