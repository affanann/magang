// src/app/kalender/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

export default function KalenderPage() {
  return (
    <AuthGuard>
      <KalenderInner />
    </AuthGuard>
  );
}

function KalenderInner() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const eventData = useMemo<Record<number, string[]>>(
    () => ({
      6: ["Pembukaan Magang Unilever", "Open registration Bank Indonesia"],
      13: ["Deadline Magenta BUMN"],
      20: ["Wawancara tahap 2 Pertamina"],
      27: ["Pengumuman seleksi batch 1"],
    }),
    []
  );

  const events = selectedDay ? eventData[selectedDay] || [] : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-extrabold text-lg">Kalender Magang</div>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-semibold"
          >
            Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="text-center font-semibold text-gray-600 mb-4">
            Oktober 2025
          </div>

          <div className="grid grid-cols-7 text-center gap-1 text-sm mb-4">
            {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
              <div key={i} className="font-semibold text-gray-400">
                {d}
              </div>
            ))}

            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const isEventDay = Object.keys(eventData).map(Number).includes(day);
              const isSelected = selectedDay === day;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`py-2 rounded-lg cursor-pointer transition ${
                    isSelected
                      ? "bg-[#F59E0B] text-white font-semibold"
                      : isEventDay
                      ? "bg-[#F59E0B]/10 text-[#b57407] font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-4 bg-[#F9FAFB] border rounded-2xl p-4">
            <div className="font-semibold mb-2">
              {selectedDay ? `📆 Event tanggal ${selectedDay} Oktober:` : "📌 Pilih tanggal untuk lihat event"}
            </div>

            {selectedDay ? (
              events.length ? (
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {events.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-600">Tidak ada kegiatan di tanggal ini.</div>
              )
            ) : null}
          </div>
        </div>

        <div className="h-24" />
      </main>
    </div>
  );
}
