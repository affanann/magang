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
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#0F1A2A] text-white px-6 py-10 md:py-16 rounded-b-3xl shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
              Temukan <span className="text-[#F59E0B]">Magang Impianmu</span> di
              Satu Tempat
            </h1>
            <p className="text-gray-300 mb-6">
              Mulai perjalanan karir impianmu dari sini!
            </p>
            <div className="flex gap-3">
              <button className="bg-[#F59E0B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d78909]">
                Masuk
              </button>
              <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#0F1A2A]">
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Magang Terpopuler */}
      <section className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#0F1A2A] mb-4">
            Magang Terpopuler
          </h2>
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
                className="bg-white rounded-xl shadow p-4 border border-gray-100"
              >
                <h3 className="font-bold text-[#0F1A2A]">{item.perusahaan}</h3>
                <p className="text-sm text-gray-600 mb-1">{item.posisi}</p>
                <p className="text-xs text-gray-500 mb-3">{item.lokasi}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{item.tanggal}</span>
                  <button className="text-sm text-white bg-[#F59E0B] px-3 py-1 rounded-lg hover:bg-[#d78909]">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Magang */}
        <div>
          <h2 className="text-xl font-bold text-[#0F1A2A] mb-4">
            Jadwal Magang
          </h2>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Oktober 2025</p>
            <div className="grid grid-cols-7 text-center gap-1 text-sm">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                <div key={d} className="font-semibold text-gray-500">
                  {d}
                </div>
              ))}
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                const isToday = day === 6;
                return (
                  <div
                    key={day}
                    className={`py-1 rounded-lg ${
                      isToday
                        ? "bg-[#F59E0B] text-white font-bold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <button className="mt-4 w-full text-[#0F1A2A] text-sm font-semibold border border-gray-300 rounded-lg py-2 hover:bg-gray-100">
              Lihat Kalender Lengkap
            </button>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="bg-[#0F1A2A] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {[
            {
              teks: "Magang di Kominfo tuh asik banget lohh, orang-orangnya pada ramah dan aku banyak belajar hal baru dari magang di sini.",
              nama: "Susanti, Mahasiswa Universitas Indonesia",
            },
            {
              teks: "Magang di PT BA tuh bikin aku mikir 'Wah ternyata tambang tuh segede ini ya skalanya?!' ternyata Indonesia kita tuh kaya banget.",
              nama: "Riski, Mahasiswa Universitas Sriwijaya",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-[#1E2A3A] rounded-xl p-6 text-sm shadow-md"
            >
              <p className="mb-2">{t.teks}</p>
              <p className="text-[#F59E0B] font-semibold text-xs">{t.nama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Q&A */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-[#0F1A2A] mb-4">Q&A Terbaru</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Kamu masih bingung? Kamu bisa tanyakan pada kolom di bawah yaa!
        </p>
        <div className="space-y-3 mb-6">
          {[
            "Kak magang di BUMN tuh berbayar ga sih?",
            "Kasih tips dong gimana caranya lolos seleksi magang di startup!",
          ].map((q, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 shadow-sm p-3 rounded-lg text-sm"
            >
              {q}
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="bg-[#F59E0B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d78909]">
            Selengkapnya
          </button>
        </div>
      </section>
    </div>
  );
}
