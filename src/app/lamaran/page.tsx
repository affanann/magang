"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { Application, getApplications, setApplications } from "@/lib/storage";

export default function LamaranPage() {
  const router = useRouter();
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    setApps(getApplications());
  }, []);

  const count = useMemo(() => apps.length, [apps]);

  function updateStatus(id: string, status: Application["status"]) {
    const next = apps.map((a) => (a.id === id ? { ...a, status } : a));
    setApps(next);
    setApplications(next);
  }

  return (
    <AuthGuard allow={["mahasiswa"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Lamaran Saya</div>
              <div className="text-xs text-slate-500">{count} lamaran</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/lowongan")}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
              >
                Cari Lowongan
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
              >
                Dashboard
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8">
          {apps.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 text-center">
              <div className="text-lg font-extrabold">Belum ada lamaran</div>
              <div className="text-sm text-slate-600 mt-1">
                Yuk cari lowongan dan klik “Lamar”.
              </div>
              <button
                onClick={() => router.push("/lowongan")}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#F59E0B] text-white font-extrabold hover:bg-[#d78909] transition"
              >
                Cari Lowongan
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {apps.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-extrabold text-lg">{a.posisi}</div>
                      <div className="text-sm text-slate-600">{a.perusahaan}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        📅 {a.tanggal}
                      </div>
                    </div>
                    <Badge status={a.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => router.push(`/magang/${a.jobId}`)}
                      className="h-10 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
                    >
                      Lihat Lowongan
                    </button>
                    <button
                      onClick={() => updateStatus(a.id, "Diproses")}
                      className="h-10 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1b2a44] transition"
                    >
                      Tandai Diproses
                    </button>
                  </div>

                  {/* tombol status (demo) */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <MiniBtn
                      onClick={() => updateStatus(a.id, "Wawancara")}
                      label="Wawancara"
                    />
                    <MiniBtn
                      onClick={() => updateStatus(a.id, "Diterima")}
                      label="Diterima"
                    />
                    <MiniBtn
                      onClick={() => updateStatus(a.id, "Ditolak")}
                      label="Ditolak"
                    />
                  </div>

                  <p className="mt-3 text-[11px] text-slate-500">
                    * Tombol status hanya untuk demo supaya dosen lihat alur proses.
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}

function MiniBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-9 rounded-xl border border-gray-300 text-xs font-semibold hover:bg-gray-100 transition"
    >
      {label}
    </button>
  );
}

function Badge({ status }: { status: string }) {
  const cls =
    status === "Dikirim"
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
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}
    >
      {status}
    </span>
  );
}
