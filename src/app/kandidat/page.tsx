"use client";

import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";

type Kandidat = {
  id: string;
  nama: string;
  kampus: string;
  posisi: string;
  status: "Baru" | "Diproses" | "Diterima" | "Ditolak";
};

export default function KandidatPage() {
  const router = useRouter();

  const kandidat: Kandidat[] = [
    { id: "k1", nama: "Raka Pratama", kampus: "Universitas Sriwijaya", posisi: "UI/UX Intern", status: "Baru" },
    { id: "k2", nama: "Nabila Putri", kampus: "Polsri", posisi: "Frontend Intern", status: "Diproses" },
    { id: "k3", nama: "Dimas Fajar", kampus: "Universitas Indonesia", posisi: "Data Intern", status: "Baru" },
    { id: "k4", nama: "Ayu Lestari", kampus: "Unsri", posisi: "Backend Intern", status: "Ditolak" },
  ];

  return (
    <AuthGuard allow={["perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Kandidat</div>
              <div className="text-xs text-slate-500">Pantau kandidat yang melamar ke lowongan kamu</div>
            </div>

            <button
              onClick={() => router.push("/lowongan/create")}
              className="h-10 px-4 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
            >
              + Buat Lowongan
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-4">
            {kandidat.map((k) => (
              <div key={k.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-extrabold">{k.nama}</div>
                    <div className="text-sm text-slate-600">{k.kampus}</div>
                    <div className="text-xs text-slate-500 mt-1">Posisi: {k.posisi}</div>
                  </div>
                  <Badge status={k.status} />
                </div>

                <button
                  onClick={() => router.push(`/kandidat/${k.id}`)}
                  className="mt-4 w-full h-11 rounded-2xl bg-[#0F172A] text-white font-semibold hover:bg-[#1b2a44] transition"
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function Badge({ status }: { status: string }) {
  const cls =
    status === "Baru"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : status === "Diproses"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : status === "Diterima"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-extrabold border ${cls}`}>
      {status}
    </span>
  );
}
