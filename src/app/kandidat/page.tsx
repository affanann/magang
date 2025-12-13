// src/app/kandidat/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import {
  getCompanyCandidates,
  Kandidat,
  seedCompanyCandidatesIfEmpty,
  uid,
} from "@/lib/storage";

export default function KandidatPage() {
  return (
    <AuthGuard allow={["perusahaan"]}>
      <KandidatInner />
    </AuthGuard>
  );
}

function KandidatInner() {
  const router = useRouter();
  const [list, setList] = useState<Kandidat[]>([]);

  useEffect(() => {
    seedCompanyCandidatesIfEmpty(uid());
    setList(getCompanyCandidates(uid()));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-extrabold text-lg">Kandidat</div>
          <button
            onClick={() => router.push("/lowongan/manage")}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-semibold"
          >
            Kelola Lowongan
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-4">
        {list.map((k) => (
          <div key={k.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{k.nama}</div>
                <div className="text-sm text-gray-600">{k.kampus}</div>
                <div className="text-sm text-gray-600 mt-1">Posisi: {k.posisi}</div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-[#F59E0B]/10 text-[#b57407]">
                {k.status}
              </span>
            </div>

            <button
              onClick={() => router.push(`/kandidat/${k.id}`)}
              className="mt-4 w-full bg-[#F59E0B] text-white py-2 rounded-xl font-semibold hover:bg-[#d78909] transition"
            >
              Lihat Detail
            </button>
          </div>
        ))}
        <div className="h-24 md:col-span-2" />
      </main>
    </div>
  );
}
