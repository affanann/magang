// src/app/lamaran/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { getMyApplications, Lamaran, setMyApplications } from "@/lib/storage";

export default function LamaranPage() {
  return (
    <AuthGuard allow={["mahasiswa"]}>
      <LamaranInner />
    </AuthGuard>
  );
}

function LamaranInner() {
  const router = useRouter();
  const [apps, setApps] = useState<Lamaran[]>([]);

  useEffect(() => {
    setApps(getMyApplications());
  }, []);

  function withdraw(id: string) {
    const ok = confirm("Tarik lamaran ini?");
    if (!ok) return;
    const next = apps.filter((a) => a.id !== id);
    setApps(next);
    setMyApplications(next);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-extrabold text-lg">Lamaran Saya</div>
          <button
            onClick={() => router.push("/lowongan")}
            className="px-4 py-2 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
          >
            Cari Lowongan
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-4">
        {apps.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center text-sm text-gray-600">
            Belum ada lamaran. Klik <b>Cari Lowongan</b> untuk mulai melamar.
          </div>
        )}

        {apps.map((a) => (
          <div key={a.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{a.perusahaan}</div>
                <div className="text-sm text-gray-600">{a.posisi}</div>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(a.createdAt).toLocaleString("id-ID")}
                </div>
              </div>

              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-[#F59E0B]/10 text-[#b57407]">
                {a.status}
              </span>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              <button
                onClick={() => alert("Demo: detail lamaran (nanti bisa dibuat).")}
                className="rounded-xl border border-gray-300 py-2 text-sm font-semibold hover:bg-gray-100 transition"
              >
                Detail
              </button>
              <button
                onClick={() => withdraw(a.id)}
                className="rounded-xl border border-rose-200 text-rose-700 py-2 text-sm font-semibold hover:bg-rose-50 transition"
              >
                Tarik Lamaran
              </button>
            </div>
          </div>
        ))}

        <div className="h-24" />
      </main>
    </div>
  );
}
