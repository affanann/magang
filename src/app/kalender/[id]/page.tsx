// src/app/kalender/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Kandidat,
  KandidatStatus,
  getCompanyCandidates,
  seedCompanyCandidatesIfEmpty,
  uid,
  updateCandidateStatus,
} from "@/lib/storage";

export default function KalenderDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = (params?.id as string) || "";

  const [k, setK] = useState<Kandidat | null>(null);

  useEffect(() => {
    // auth sederhana (biar aman)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");
    if (!loggedIn || role !== "perusahaan") {
      router.replace("/");
      return;
    }

    seedCompanyCandidatesIfEmpty(uid());
    const all = getCompanyCandidates(uid());
    const found = all.find((x) => x.id === id) || null;
    setK(found);
  }, [id, router]);

  const statusList: KandidatStatus[] = useMemo(
    () => ["Baru", "Diproses", "Wawancara", "Diterima", "Ditolak"],
    []
  );

  function setStatus(s: KandidatStatus) {
    if (!k) return; // ✅ biar ga error null
    updateCandidateStatus(k.id, s, uid());
    setK({ ...k, status: s });
  }

  if (!k) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F8FAFC] text-[#0F172A] px-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="text-sm text-gray-700 font-semibold mb-2">
            Kandidat tidak ditemukan.
          </div>
          <Link
            href="/dashboard"
            className="inline-flex mt-2 px-4 py-2 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold">Detail Kandidat</div>
            <div className="text-xs text-slate-500">Kelola status kandidat</div>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Kembali
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xl font-extrabold">{k.nama}</div>
              <div className="text-sm text-slate-600">{k.kampus}</div>
              <div className="text-sm text-slate-600 mt-1">
                Posisi: <span className="font-semibold">{k.posisi}</span>
              </div>
            </div>

            <StatusPill status={k.status} />
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold mb-2">Ubah Status:</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {statusList.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={
                    "px-3 py-2 rounded-xl text-xs font-semibold border transition " +
                    (k.status === s
                      ? "bg-[#F59E0B] text-white border-[#F59E0B]"
                      : "bg-white text-slate-700 border-gray-200 hover:bg-gray-50")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "Baru"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : status === "Diproses"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : status === "Wawancara"
      ? "bg-purple-50 text-purple-700 border-purple-200"
      : status === "Diterima"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <span
      className={
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border " +
        cls
      }
    >
      {status}
    </span>
  );
}
