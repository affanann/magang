"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { magangData } from "@/data/magangData";

type Role = "mahasiswa" | "perusahaan";

type Kandidat = {
  id: string;
  nama: string;
  kampus: string;
  posisi: string;
  status: "Baru" | "Diproses" | "Diterima" | "Ditolak";
};

type Lamaran = {
  perusahaan: string;
  posisi: string;
  status: "Dikirim" | "Diproses" | "Wawancara" | "Diterima" | "Ditolak";
};

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const r = localStorage.getItem("role") as Role | null;

    if (!loggedIn || !r) {
      router.push("/");
      return;
    }
    setRole(r);
  }, [router]);

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
      a: "Fokus pada skill praktikal, project, dan pengalaman organisasi.",
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

  const kandidatTerbaru: Kandidat[] = [
    { id: "k1", nama: "Raka Pratama", kampus: "Universitas Sriwijaya", posisi: "UI/UX Intern", status: "Baru" },
    { id: "k2", nama: "Nabila Putri", kampus: "Polsri", posisi: "Frontend Intern", status: "Diproses" },
    { id: "k3", nama: "Dimas Fajar", kampus: "Universitas Indonesia", posisi: "Data Intern", status: "Baru" },
  ];

  const lamaranSaya: Lamaran[] = [
    { perusahaan: "Pertamina", posisi: "Data Analyst Intern", status: "Diproses" },
    { perusahaan: "Kominfo", posisi: "UI/UX Intern", status: "Wawancara" },
    { perusahaan: "Bank Indonesia", posisi: "Backend Intern", status: "Dikirim" },
  ];

  const perusahaanLowonganSaya = useMemo(() => magangData.slice(0, 3), []);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setEvents(eventData[day] || []);
  };

  const username = role === "perusahaan" ? "Perusahaan" : role === "mahasiswa" ? "Mahasiswa" : "";

  if (!role) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F8FAFC] text-[#0F172A]">
        <div className="text-sm text-slate-600">Memuat dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm py-4 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-extrabold">Magangin</h1>
          <span className="text-[11px] px-2 py-1 rounded-full bg-[#F59E0B]/10 text-[#b57407] font-semibold">
            {role === "perusahaan" ? "Akun Perusahaan" : "Akun Mahasiswa"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-gray-600">
            {username ? `Halo, ${username}! 👋` : ""}
          </span>

          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("role");
              localStorage.removeItem("isDemo");
              router.push("/");
            }}
            className="bg-[#F59E0B] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#d78909] transition active:scale-[0.98]"
          >
            Keluar
          </button>
        </div>
      </header>

      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-b-[40px] p-8 md:p-10 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-3">
          {role === "perusahaan" ? (
            <>
              Kelola <span className="text-[#F59E0B]">Lowongan & Kandidat</span> ✨
            </>
          ) : (
            <>
              Temukan <span className="text-[#F59E0B]">Magang Impianmu</span> 🚀
            </>
          )}
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto">
          {role === "perusahaan"
            ? "Pantau lowongan aktif, lihat kandidat terbaru, dan proses rekrutmen jadi lebih rapi."
            : "Jelajahi peluang magang dari berbagai perusahaan dan pantau proses lamaranmu."}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          {role === "perusahaan" ? (
            <>
              <button
                onClick={() => router.push("/lowongan/create")}
                className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-[#0F172A] font-extrabold hover:bg-[#e19a0b] transition active:scale-[0.98]"
              >
                + Buat Lowongan
              </button>
              <button
                onClick={() => router.push("/kandidat")}
                className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition active:scale-[0.98]"
              >
                Lihat Kandidat
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/lowongan")}
                className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-[#0F172A] font-extrabold hover:bg-[#e19a0b] transition active:scale-[0.98]"
              >
                Cari Lowongan
              </button>
              <button
                onClick={() => router.push("/profil")}
                className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition active:scale-[0.98]"
              >
                Lengkapi Profil
              </button>
            </>
          )}
        </div>
      </section>

      <main className="flex-1 px-6 py-10 max-w-6xl w-full mx-auto space-y-12">
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {role === "mahasiswa" ? (
            <>
              <StatCard title="Lamaran Aktif" value="3" desc="Sedang diproses" icon="📌" />
              <StatCard title="Rekomendasi" value={`${magangData.length}`} desc="Lowongan tersedia" icon="💼" />
              <StatCard title="Event Bulan Ini" value="3" desc="Kalender magang" icon="📅" />
              <StatCard title="Progress Profil" value="70%" desc="Lengkapi biar cepat dilirik" icon="✅" />
            </>
          ) : (
            <>
              <StatCard title="Lowongan Aktif" value={`${perusahaanLowonganSaya.length}`} desc="Sedang tayang" icon="📢" />
              <StatCard title="Kandidat Baru" value="6" desc="Minggu ini" icon="🧑‍💻" />
              <StatCard title="Diproses" value="4" desc="Tahap seleksi" icon="🧾" />
              <StatCard title="Undangan Interview" value="2" desc="Terjadwal" icon="🎯" />
            </>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
              <span>{role === "perusahaan" ? "📌" : "🔥"}</span>
              {role === "perusahaan" ? "Lowongan Saya" : "Magang Terpopuler"}
            </h3>

            <div className="space-y-4">
              {(role === "perusahaan" ? perusahaanLowonganSaya : magangData).slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-[#0F172A]">{item.perusahaan}</h4>
                      <p className="text-sm text-gray-600">{item.posisi}</p>
                    </div>

                    <span className="bg-[#F59E0B]/10 text-[#b57407] text-xs px-2 py-1 rounded-md font-semibold">
                      {role === "perusahaan" ? "Aktif" : "Populer"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    📍 {item.lokasi} <br /> 📅 {item.tanggal}
                  </p>

                  {role === "perusahaan" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => router.push(`/lowongan/edit/${item.id}`)}
                        className="w-full border border-gray-300 text-[#0F172A] text-sm py-2 rounded-xl hover:bg-gray-100 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => router.push("/kandidat")}
                        className="w-full bg-[#F59E0B] text-white text-sm py-2 rounded-xl font-semibold hover:bg-[#d78909] transition"
                      >
                        Kandidat
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => router.push(`/magang/${item.id}`)}
                      className="w-full bg-[#F59E0B] text-white text-sm py-2 rounded-xl font-semibold hover:bg-[#d78909] transition"
                    >
                      Lihat Detail
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={() => router.push("/lowongan")}
                className="w-full border border-gray-300 text-[#0F172A] text-sm py-2 rounded-xl hover:bg-gray-100 transition"
              >
                {role === "perusahaan" ? "Kelola Semua Lowongan" : "Lihat Semua Lowongan"}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
              <span>📅</span> Jadwal Magang
            </h3>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600 mb-4 font-semibold text-center">Oktober 2025</p>

              <div className="grid grid-cols-7 text-center gap-1 text-sm mb-4">
                {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
                  <div key={i} className="font-semibold text-gray-400">{d}</div>
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
                          ? "bg-[#F59E0B]/10 text-[#b57407] font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {selectedDay && (
                <div className="bg-[#F9FAFB] p-4 rounded-xl border text-sm text-gray-700 mb-4">
                  <p className="font-semibold mb-2">📆 Jadwal tanggal {selectedDay} Oktober:</p>
                  {events.length ? (
                    <ul className="list-disc list-inside space-y-1">
                      {events.map((e, idx) => <li key={idx}>{e}</li>)}
                    </ul>
                  ) : (
                    <p>Tidak ada kegiatan magang hari ini.</p>
                  )}
                </div>
              )}

              <button
                onClick={() => router.push("/kalender")}
                className="w-full border border-gray-300 text-[#0F172A] text-sm py-2 rounded-xl hover:bg-gray-100 transition"
              >
                Lihat Kalender Lengkap
              </button>
            </div>
          </div>
        </section>

        {role === "mahasiswa" ? (
          <>
            <section className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
              <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                <span>📝</span> Lamaran Saya
              </h3>

              <div className="grid md:grid-cols-3 gap-3">
                {lamaranSaya.map((l, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition">
                    <div className="font-semibold text-[#0F172A]">{l.perusahaan}</div>
                    <div className="text-sm text-gray-600">{l.posisi}</div>
                    <div className="mt-3"><BadgeStatus status={l.status} /></div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => router.push("/lamaran")}
                  className="bg-[#F59E0B] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#d78909] transition"
                >
                  Lihat Semua Lamaran
                </button>
              </div>
            </section>

            <section className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                <span>💬</span> Cerita Peserta Magang
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {reviewData.map((r, i) => (
                  <div key={i} className="bg-[#1E293B] p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                    <p className="text-sm mb-3 leading-relaxed">{r.teks}</p>
                    <p className="text-[#F59E0B] text-xs font-semibold">{r.nama}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                <span>❓</span> Q&A Terbaru
              </h3>

              <div className="space-y-3 mb-6">
                {qnaData.map((q, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 text-sm shadow-sm hover:shadow-md transition">
                    <p className="font-semibold text-[#0F172A] mb-1">{q.q}</p>
                    <p className="text-gray-600">{q.a}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => router.push("/qna")}
                  className="bg-[#F59E0B] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#d78909] transition"
                >
                  Lihat Semua Q&A
                </button>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
              <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                <span>🧑‍💻</span> Kandidat Terbaru
              </h3>

              <div className="grid md:grid-cols-3 gap-3">
                {kandidatTerbaru.map((k) => (
                  <div key={k.id} className="rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition">
                    <div className="font-semibold text-[#0F172A]">{k.nama}</div>
                    <div className="text-sm text-gray-600">{k.kampus}</div>
                    <div className="text-sm text-gray-600 mt-1">Posisi: {k.posisi}</div>

                    <div className="mt-3"><BadgeStatus status={k.status} /></div>

                    <button
                      onClick={() => router.push(`/kandidat/${k.id}`)}
                      className="mt-3 w-full border border-gray-300 text-[#0F172A] text-sm py-2 rounded-xl hover:bg-gray-100 transition"
                    >
                      Lihat Detail
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-extrabold mb-3 flex items-center gap-2">
                <span>🎯</span> Tips Rekrutmen Cepat
              </h3>
              <ul className="text-sm text-gray-200 space-y-2 list-disc list-inside">
                <li>Buat deskripsi posisi yang jelas: skill wajib & skill nilai plus.</li>
                <li>Tambahkan durasi magang dan benefit (uang saku/transport).</li>
                <li>Tahap seleksi sederhana: CV → interview → final.</li>
              </ul>

              <div className="mt-5">
                <button
                  onClick={() => router.push("/lowongan/create")}
                  className="bg-[#F59E0B] text-[#0F172A] px-6 py-2 rounded-xl font-extrabold hover:bg-[#e19a0b] transition"
                >
                  Pakai Template Lowongan
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="py-6 text-center text-xs text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} Magangin. Semua hak dilindungi.
      </footer>
    </div>
  );
}

function StatCard({ title, value, desc, icon }: { title: string; value: string; desc: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-600">{title}</div>
          <div className="text-2xl font-extrabold text-[#0F172A] mt-1">{value}</div>
          <div className="text-xs text-slate-500 mt-1">{desc}</div>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
    </div>
  );
}

function BadgeStatus({ status }: { status: string }) {
  const cls =
    status === "Baru" || status === "Dikirim"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : status === "Diproses"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : status === "Wawancara"
      ? "bg-purple-50 text-purple-700 border-purple-200"
      : status === "Diterima"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {status}
    </span>
  );
}
