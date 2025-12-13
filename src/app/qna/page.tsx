"use client";

import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

export default function QnaPage() {
  const router = useRouter();

  const qnaData = [
    {
      q: "Apakah magang di BUMN dibayar?",
      a: "Sebagian besar BUMN memberikan uang saku / tunjangan transport.",
    },
    {
      q: "Gimana cara nulis CV buat magang startup?",
      a: "Fokus pada skill praktikal, project, dan pengalaman organisasi.",
    },
    {
      q: "Berapa lama durasi magang di Pertamina?",
      a: "Biasanya 4–6 bulan tergantung departemen dan periode magang.",
    },
    {
      q: "Apa yang harus disiapkan sebelum interview?",
      a: "Pelajari perusahaan, siapkan cerita pengalaman, dan latihan menjawab pertanyaan umum.",
    },
  ];

  return (
    <AuthGuard allow={["mahasiswa"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Q&A</div>
              <div className="text-xs text-slate-500">Khusus akun mahasiswa</div>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
            >
              Dashboard
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 space-y-3">
          {qnaData.map((q, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="font-semibold">{q.q}</div>
              <div className="text-sm text-slate-600 mt-1">{q.a}</div>
            </div>
          ))}
        </main>
      </div>
    </AuthGuard>
  );
}
