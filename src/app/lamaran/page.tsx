"use client";

import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Status = "Dikirim" | "Diproses" | "Wawancara" | "Diterima" | "Ditolak";

type Lamaran = {
  id: string;
  perusahaan: string;
  posisi: string;
  tanggal: string;
  status: Status;
};

export default function LamaranPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | Status>("all");

  const data: Lamaran[] = useMemo(
    () => [
      { id: "l1", perusahaan: "Pertamina", posisi: "Data Analyst Intern", tanggal: "Oktober 2025", status: "Diproses" },
      { id: "l2", perusahaan: "Kominfo", posisi: "UI/UX Intern", tanggal: "Oktober 2025", status: "Wawancara" },
      { id: "l3", perusahaan: "Bank Indonesia", posisi: "Backend Intern", tanggal: "Oktober 2025", status: "Dikirim" },
      { id: "l4", perusahaan: "Unilever", posisi: "Marketing Intern", tanggal: "Oktober 2025", status: "Ditolak" },
    ],
    []
  );

  const list = useMemo(() => {
    if (filter === "all") return data;
    return data.filter((x) => x.status === filter);
  }, [filter, data]);

  return (
    <AuthGuard allow={["mahasiswa"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-extrabold">Lamaran Saya</div>
              <div className="text-xs text-slate-500">Pantau status lamaran magang kamu</div>
            </div>
            <button
              onClick={() => router.push("/lowongan")}
              className="h-10 px-4 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
            >
              + Cari Lowongan
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
            <Chip active={filter === "all"} onClick={() => setFilter("all")} label="Semua" />
            {(["Dikirim", "Diproses", "Wawancara", "Diterima", "Ditolak"] as Status[]).map((s) => (
              <Chip key={s} active={filter === s} onClick={() => setFilter(s)} label={s} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {list.map((x) => (
              <div key={x.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-extrabold">{x.posisi}</div>
                    <div className="text-sm text-slate-600">{x.perusahaan}</div>
                    <div className="text-xs text-slate-500 mt-1">📅 {x.tanggal}</div>
                  </div>
                  <Badge status={x.status} />
                </div>

                <button
                  onClick={() => router.push("/profil")}
                  className="mt-4 w-full h-11 rounded-2xl border border-gray-300 text-[#0F172A] font-semibold hover:bg-gray-100 transition"
                >
                  Lihat Profil Saya
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={
        "h-10 px-4 rounded-2xl text-sm font-semibold border transition " +
        (active ? "bg-[#F59E0B]/15 border-[#F59E0B]/30" : "bg-white border-gray-200 hover:bg-gray-100")
      }
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
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-extrabold border ${cls}`}>
      {status}
    </span>
  );
}
