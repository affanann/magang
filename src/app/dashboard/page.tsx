"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="bg-[#0F172A] text-white py-5 px-6 flex items-center justify-between shadow-lg">
        <h1 className="text-lg font-bold">Magangin</h1>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            router.push("/");
          }}
          className="bg-[#F59E0B] text-white text-sm px-4 py-2 rounded-md hover:bg-[#d78909]"
        >
          Keluar
        </button>
      </header>

      {/* Konten utama */}
      <main className="flex-1 overflow-y-auto px-6 py-10 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <section className="bg-[#0F172A] text-white rounded-3xl shadow-lg p-8 mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-snug">
            Temukan <span className="text-[#F59E0B]">Magang Impianmu</span> di
            Satu Tempat
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto">
            Jelajahi peluang magang dari berbagai perusahaan dan instansi di seluruh Indonesia.
          </p>
        </section>

        {/* Grid Magang & Jadwal */}
        <section className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Magang Terpopuler */}
          <div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Magang Terpopuler</h3>
            <div className="space-y-4">
              {[
                {
                  perusahaan: "Unilever Indonesia",
                  posisi: "Analisis Data",
                  lokasi: "Tangerang, Jakarta",
                  tanggal: "6 Juli 2025",
                },
                {
                  perusahaan: "Pertamina (Magenta BUMN)",
                  posisi: "HSE",
                  lokasi: "Jakarta, Riau, dsb",
                  tanggal: "13 Juli 2025",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all border border-gray-100"
                >
                  <h4 className="font-semibold text-[#0F172A] mb-1">{item.perusahaan}</h4>
                  <p className="text-sm text-gray-600 mb-1">{item.posisi}</p>
                  <p className="text-xs text-gray-500 mb-3">{item.lokasi}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{item.tanggal}</span>
                    <button className="bg-[#F59E0B] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#d78909] transition">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Magang */}
          <div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Jadwal Magang</h3>
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Oktober 2025</p>
              <div className="grid grid-cols-7 text-center gap-1 text-sm">
                {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
                  <div key={i} className="font-semibold text-gray-500">{d}</div>
                ))}
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 6;
                  return (
                    <div
                      key={day}
                      className={`py-1 rounded-md ${
                        isToday
                          ? "bg-[#F59E0B] text-white font-bold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <button className="mt-4 w-full border border-gray-300 text-[#0F172A] text-sm font-semibold rounded-lg py-2 hover:bg-gray-100 transition">
                Lihat Kalender Lengkap
              </button>
            </div>
          </div>
        </section>

        {/* Testimoni */}
        <section className="bg-[#0F172A] text-white rounded-3xl shadow-lg p-8 mb-10">
          <h3 className="text-xl font-bold mb-4">Cerita Peserta Magang</h3>
          <div className="space-y-4">
            {[
              {
                teks: "Magang di Kominfo tuh asik banget loh, orang-orangnya ramah dan aku banyak belajar hal baru.",
                nama: "Susanti, Universitas Indonesia",
              },
              {
                teks: "Magang di PT BA bikin aku sadar kalau tambang Indonesia luar biasa besar skalanya!",
                nama: "Riski, Universitas Sriwijaya",
              },
            ].map((t, i) => (
              <div key={i} className="bg-[#1E293B] rounded-xl p-5 text-sm shadow-sm">
                <p className="mb-2">{t.teks}</p>
                <p className="text-[#F59E0B] text-xs font-semibold">{t.nama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Q&A */}
        <section className="mb-10">
          <h3 className="text-xl font-bold text-[#0F172A] mb-4">Q&A Terbaru</h3>
          <p className="text-sm text-gray-600 mb-4">
            Masih bingung? Tanyakan langsung pertanyaanmu di sini!
          </p>
          <div className="space-y-3 mb-6">
            {[
              "Apakah magang di BUMN dibayar?",
              "Tips lolos seleksi magang startup?",
            ].map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-sm"
              >
                {q}
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-[#F59E0B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d78909]">
              Lihat Semua Q&A
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
