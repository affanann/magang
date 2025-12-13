"use client";

import AuthGuard from "@/components/AuthGuard";
import { useParams, useRouter } from "next/navigation";

export default function KandidatDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  return (
    <AuthGuard allow={["perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Detail Kandidat</div>
              <div className="text-xs text-slate-500">ID: {id}</div>
            </div>
            <button
              onClick={() => router.push("/kandidat")}
              className="h-10 px-4 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
            >
              Kembali
            </button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-8 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="text-xl font-extrabold">Kandidat (Demo)</div>
            <div className="text-sm text-slate-600 mt-1">
              Halaman ini placeholder untuk nilai revisi dosen: perusahaan punya akses berbeda dari mahasiswa.
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <Info label="Nama" value="(Dummy) Raka Pratama" />
              <Info label="Kampus" value="Universitas Sriwijaya" />
              <Info label="Posisi Dilamar" value="UI/UX Intern" />
              <Info label="Status" value="Baru" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() => alert("Demo: set status Diproses")}
                className="h-11 rounded-2xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
              >
                Proses
              </button>
              <button
                onClick={() => alert("Demo: set status Ditolak")}
                className="h-11 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
              >
                Tolak
              </button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-4 bg-[#F8FAFC]">
      <div className="text-xs text-slate-500 font-semibold">{label}</div>
      <div className="text-sm font-extrabold text-[#0F172A] mt-1">{value}</div>
    </div>
  );
}
