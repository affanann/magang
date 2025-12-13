"use client";

import AuthGuard from "@/components/AuthGuard";
import { useMemo, useState } from "react";

export default function KalenderPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const eventData: Record<number, string[]> = useMemo(
    () => ({
      6: ["Pembukaan Magang Unilever", "Open registration Bank Indonesia"],
      13: ["Deadline Magenta BUMN"],
      20: ["Wawancara tahap 2 Pertamina"],
      27: ["Pengumuman hasil seleksi Kominfo"],
    }),
    []
  );

  const events = useMemo(() => {
    if (!selectedDay) return [];
    return eventData[selectedDay] || [];
  }, [selectedDay, eventData]);

  return (
    <AuthGuard allow={["mahasiswa", "perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="text-lg font-extrabold">Kalender Magang</div>
            <div className="text-xs text-slate-500">Oktober 2025 • Klik tanggal untuk lihat agenda</div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="text-sm font-semibold text-slate-600 text-center mb-4">Oktober 2025</div>

              <div className="grid grid-cols-7 text-center gap-1 text-sm">
                {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
                  <div key={i} className="font-semibold text-gray-400">
                    {d}
                  </div>
                ))}

                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isEventDay = Object.prototype.hasOwnProperty.call(eventData, day);
                  const isSelected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`py-2 rounded-xl transition ${
                        isSelected
                          ? "bg-[#F59E0B] text-white font-extrabold"
                          : isEventDay
                          ? "bg-[#F59E0B]/10 text-[#b57407] font-bold hover:bg-[#F59E0B]/15"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="text-lg font-extrabold mb-2">
                {selectedDay ? `Agenda ${selectedDay} Oktober` : "Pilih tanggal"}
              </div>

              {!selectedDay ? (
                <div className="text-sm text-slate-600">Klik tanggal di kalender untuk melihat agenda.</div>
              ) : events.length ? (
                <ul className="mt-3 space-y-2">
                  {events.map((e, idx) => (
                    <li key={idx} className="rounded-2xl border border-gray-100 p-4 bg-[#F8FAFC]">
                      <div className="font-semibold">{e}</div>
                      <div className="text-xs text-slate-500 mt-1">Status: Terjadwal</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-slate-600 mt-2">Tidak ada agenda untuk tanggal ini.</div>
              )}

              <div className="mt-6 rounded-2xl bg-[#0F172A] text-white p-5">
                <div className="font-extrabold">Tips</div>
                <div className="text-sm text-gray-200 mt-1">
                  Simpan tanggal penting dan cek rutin agar tidak kelewatan deadline.
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
