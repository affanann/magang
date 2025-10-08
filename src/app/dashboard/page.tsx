"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    if (!loggedIn) {
      router.push("/");
    } else {
      setUsername(role === "perusahaan" ? "Perusahaan" : "Mahasiswa");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] flex flex-col">
      {/* 🔹 Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6 flex justify-between items-center border-b">
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

      {/* 🔹 Konten */}
      <main className="flex-1 px-6 py-10 max-w-6xl w-full mx-auto space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-3xl shadow-lg p-8 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-3">
            Temukan <span className="text-[#F59E0B]">Magang Impianmu</span> 🚀
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Jelajahi ratusan peluang magang dari berbagai perusahaan ternama di
            seluruh Indonesia.
          </p>
        </section>

        {/* Grid Magang & Jadwal */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Magang Terpopuler */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🔥</span> Magang Terpopuler
            </h3>
            <div className="space-y-4">
              {[
                {
                  perusahaan: "Unilever Indonesia",
                  posisi: "Data Analyst Intern",
                  lokasi: "Tangerang, Jakarta",
                  tanggal: "Mulai 6 Juli 2025",
                },
                {
                  perusahaan: "Pertamina (Magenta BUMN)",
                  posisi: "HSE Intern",
                  lokasi: "Jakarta, Riau, dsb",
                  tanggal: "Mulai 13 Juli 2025",
                },
                {
                  perusahaan: "Bank Indonesia",
                  posisi: "IT Support Intern",
                  lokasi: "Yogyakarta",
                  tanggal: "Mulai 2 Agustus 2025",
                },
              ].map((item, i) => (
                <div
                  key={i}
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
                    📍 {item.lokasi}
                    <br />📅 {item.tanggal}
                  </p>
                  <button className="w-full bg-[#F59E0B] text-white text-sm py-2 rounded-lg font-medium hover:bg-[#d78909] transition">
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
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-semibold">Oktober 2025</span>
              </p>
              <div className="grid grid-cols-7 text-center gap-1 text-sm mb-4">
                {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
                  <div key={i} className="font-semibold text-gray-400">
                    {d}
                  </div>
                ))}
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 6;
                  return (
                    <div
                      key={day}
                      className={`py-1.5 rounded-lg cursor-pointer ${
                        isToday
                          ? "bg-[#F59E0B] text-white font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <button className="w-full border border-gray-300 text-[#0F172A] text-sm py-2 rounded-lg hover:bg-gray-100 transition">
                Lihat Kalender Lengkap
              </button>
            </div>
          </div>
        </section>

        {/* Cerita Magang */}
        <section className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>💬</span> Cerita Peserta Magang
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                teks: "Magang di Kominfo itu seru banget! Orang-orangnya ramah dan aku banyak belajar hal baru.",
                nama: "— Mahasiswa Universitas Indonesia",
              },
              {
                teks: "Magang di PTBA bikin aku sadar kalau tambang Indonesia ternyata keren banget skalanya!",
                nama: "— Mahasiswa Universitas Sriwijaya",
              },
            ].map((t, i) => (
              <div key={i} className="bg-[#1E293B] p-5 rounded-2xl shadow-md">
                <p className="text-sm mb-3 leading-relaxed">{t.teks}</p>
                <p className="text-[#F59E0B] text-xs font-semibold">
                  {t.nama}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Q&A Terbaru */}
        <section>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>❓</span> Q&A Terbaru
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            Masih bingung soal magang? Cek pertanyaan terbaru dari peserta lain:
          </p>
          <div className="space-y-3 mb-6">
            {[
              "Apakah magang di BUMN dibayar?",
              "Gimana cara nulis CV buat magang startup?",
              "Berapa lama durasi magang di Pertamina?",
            ].map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 text-sm shadow-sm hover:shadow-md transition"
              >
                {q}
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-[#F59E0B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d78909] transition">
              Lihat Semua Q&A
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} Magangin. Semua hak dilindungi.
      </footer>
    </div>
  );
}
