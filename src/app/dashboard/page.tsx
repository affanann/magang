"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { magangData } from "@/data/magangData";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [events, setEvents] = useState<string[]>([]);

  // 🔹 Cek login dummy
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    if (!loggedIn) router.push("/");
    else setUsername(role === "perusahaan" ? "Perusahaan" : "Mahasiswa");
  }, [router]);

  // 🔹 Dummy data event kalender
  const eventData: Record<number, string[]> = {
    6: ["Pembukaan Magang Unilever", "Open registration Bank Indonesia"],
    13: ["Deadline Magenta BUMN"],
    20: ["Wawancara tahap 2 Pertamina"],
  };

  const qnaData = [
    {
      q: "Apakah magang di BUMN dibayar?",
      a: "Sebagian besar BUMN memberikan uang saku / tunjangan transport.",
    },
    {
      q: "Gimana cara nulis CV buat magang startup?",
      a: "Fokus pada skill praktikal & pengalaman organisasi.",
    },
    {
      q: "Berapa lama durasi magang di Pertamina?",
      a: "Biasanya 4–6 bulan tergantung departemen dan periode magang.",
    },
  ];

  const reviewData = [
    {
      teks: "Magang di Kominfo itu seru banget! Orang-orangnya ramah dan aku banyak belajar hal baru.",
      nama: "Mahasiswa Universitas Indonesia",
    },
    {
      teks: "Magang di PTBA bikin aku sadar kalau tambang Indonesia ternyata keren banget skalanya!",
      nama: "Mahasiswa Universitas Sriwijaya",
    },
  ];

  // 🔹 Klik tanggal
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setEvents(eventData[day] || []);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* 🔹 Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Magangin</h1>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-gray-600">
            {username ? `Halo, ${username}! 👋` : ""}
          </span>
          <button
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
            className="bg-[#F59E0B] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#d78909] transition"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* 🔹 Hero Section */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-b-[40px] p-10 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-3">
          Temukan <span className="text-[#F59E0B]">Magang Impianmu</span> 🚀
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Jelajahi ratusan peluang magang dari berbagai perusahaan ternama di
          seluruh Indonesia.
        </p>
      </section>

      {/* 🔹 Konten Utama */}
      <main className="flex-1 px-6 py-10 max-w-6xl w-full mx-auto space-y-12">
        {/* ✅ Magang & Jadwal */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Magang Terpopuler */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🔥</span> Magang Terpopuler
            </h3>
            <div className="space-y-4">
              {magangData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-[#0F172A]">
                        {item.perusahaan}
                      </h4>
                      <p className="text-sm text-gray-600">{item.posisi}</p>
                    </div>
                    <span className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs px-2 py-1 rounded-md font-semibold">
                      Populer
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    📍 {item.lokasi} <br /> 📅 {item.tanggal}
                  </p>
                  <button
                    onClick={() => router.push(`/magang/${item.id}`)}
                    className="w-full bg-[#F59E0B] text-white text-sm py-2 rounded-lg font-medium hover:bg-[#d78909] transition"
                  >
                    Lihat Detail
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Magang */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📅</span> Jadwal Magang
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <p className="text-sm text-gray-600 mb-4 font-semibold text-center">
                Oktober 2025
              </p>

              {/* Kalender */}
              <div className="grid grid-cols-7 text-center gap-1 text-sm mb-4">
                {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
                  <div key={i} className="font-semibold text-gray-400">
                    {d}
                  </div>
                ))}
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isEventDay = [6, 13, 20].includes(day);
                  const isSelected = selectedDay === day;
                  return (
                    <div
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`py-2 rounded-lg cursor-pointer transition ${
                        isSelected
                          ? "bg-[#F59E0B] text-white font-semibold"
                          : isEventDay
                          ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Event Tanggal */}
              {selectedDay && (
                <div className="bg-[#F9FAFB] p-4 rounded-lg border text-sm text-gray-700 mb-4">
                  <p className="font-semibold mb-2">
                    📆 Jadwal tanggal {selectedDay} Oktober:
                  </p>
                  {events.length ? (
                    <ul className="list-disc list-inside space-y-1">
                      {events.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Tidak ada kegiatan magang hari ini.</p>
                  )}
                </div>
              )}

              <button
                onClick={() => alert("Kalender lengkap masih coming soon")}
                className="w-full border border-gray-300 text-[#0F172A] text-sm py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Lihat Kalender Lengkap
              </button>
            </div>
          </div>
        </section>

        {/* ✅ Cerita Magang */}
        <section className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>💬</span> Cerita Peserta Magang
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {reviewData.map((r, i) => (
              <div
                key={i}
                className="bg-[#1E293B] p-5 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <p className="text-sm mb-3 leading-relaxed">{r.teks}</p>
                <p className="text-[#F59E0B] text-xs font-semibold">{r.nama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Q&A */}
        <section>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>❓</span> Q&A Terbaru
          </h3>
          <div className="space-y-3 mb-6">
            {qnaData.map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 text-sm shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium text-[#0F172A] mb-1">{q.q}</p>
                <p className="text-gray-600">{q.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => router.push("/qna")}
              className="bg-[#F59E0B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d78909] transition"
            >
              Lihat Semua Q&A
            </button>
          </div>
        </section>
      </main>

      {/* 🔹 Footer */}
      <footer className="py-6 text-center text-xs text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} Magangin. Semua hak dilindungi.
      </footer>
    </div>
  );
}
