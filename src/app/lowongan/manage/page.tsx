"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { getCompanyJobs, setCompanyJobs, uid, Job } from "@/lib/storage";

export default function LowonganManagePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [perusahaan, setPerusahaan] = useState("Perusahaan Demo");
  const [posisi, setPosisi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tanggal, setTanggal] = useState("Oktober 2025");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    setJobs(getCompanyJobs());
  }, []);

  const activeJobs = useMemo(() => jobs.filter((j) => j.status === "aktif"), [jobs]);
  const closedJobs = useMemo(() => jobs.filter((j) => j.status === "tutup"), [jobs]);

  function resetForm() {
    setEditingId(null);
    setPosisi("");
    setLokasi("");
    setTanggal("Oktober 2025");
    setDeskripsi("");
  }

  function save() {
    if (!perusahaan.trim() || !posisi.trim() || !lokasi.trim()) {
      alert("Perusahaan, Posisi, dan Lokasi wajib diisi.");
      return;
    }

    const nowJobs = [...jobs];

    if (editingId) {
      const idx = nowJobs.findIndex((j) => j.id === editingId);
      if (idx >= 0) {
        nowJobs[idx] = {
          ...nowJobs[idx],
          perusahaan: perusahaan.trim(),
          posisi: posisi.trim(),
          lokasi: lokasi.trim(),
          tanggal: tanggal.trim(),
          deskripsi: deskripsi.trim(),
        };
      }
    } else {
      nowJobs.unshift({
        id: uid("job"),
        perusahaan: perusahaan.trim(),
        posisi: posisi.trim(),
        lokasi: lokasi.trim(),
        tanggal: tanggal.trim(),
        deskripsi: deskripsi.trim() || "Deskripsi belum ditambahkan.",
        status: "aktif",
      });
    }

    setJobs(nowJobs);
    setCompanyJobs(nowJobs);
    resetForm();
    alert("Lowongan tersimpan ✅");
  }

  function edit(job: Job) {
    setEditingId(job.id);
    setPerusahaan(job.perusahaan);
    setPosisi(job.posisi);
    setLokasi(job.lokasi);
    setTanggal(job.tanggal);
    setDeskripsi(job.deskripsi);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function close(jobId: string) {
    const nowJobs = jobs.map((j) => (j.id === jobId ? { ...j, status: "tutup" } : j));
    setJobs(nowJobs);
    setCompanyJobs(nowJobs);
  }

  function reopen(jobId: string) {
    const nowJobs = jobs.map((j) => (j.id === jobId ? { ...j, status: "aktif" } : j));
    setJobs(nowJobs);
    setCompanyJobs(nowJobs);
  }

  return (
    <AuthGuard allow={["perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Kelola Lowongan</div>
              <div className="text-xs text-slate-500">
                Tambah, edit, dan tutup lowongan perusahaan
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/lowongan")}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
              >
                Lihat Lowongan
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
              >
                Dashboard
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* FORM */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-extrabold">
                {editingId ? "Edit Lowongan" : "Tambah Lowongan"}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-sm px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Batal Edit
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <input
                value={perusahaan}
                onChange={(e) => setPerusahaan(e.target.value)}
                placeholder="Nama Perusahaan"
                className="h-11 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
              <input
                value={posisi}
                onChange={(e) => setPosisi(e.target.value)}
                placeholder="Posisi"
                className="h-11 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
              <input
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Lokasi"
                className="h-11 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
              <input
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                placeholder="Tanggal (contoh: Oktober 2025)"
                className="h-11 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsi singkat"
                className="md:col-span-2 min-h-[110px] p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
            </div>

            <button
              onClick={save}
              className="mt-4 w-full h-11 rounded-xl bg-[#F59E0B] text-white font-extrabold hover:bg-[#d78909] transition"
            >
              {editingId ? "Simpan Perubahan" : "Tambah Lowongan"}
            </button>
          </section>

          {/* LIST ACTIVE */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-extrabold mb-4">Lowongan Aktif</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {activeJobs.map((j) => (
                <div key={j.id} className="rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition">
                  <div className="font-semibold">{j.posisi}</div>
                  <div className="text-sm text-slate-600">{j.perusahaan}</div>
                  <div className="text-xs text-slate-500 mt-2 space-y-1">
                    <div>📍 {j.lokasi}</div>
                    <div>📅 {j.tanggal}</div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => edit(j)}
                      className="h-10 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => close(j.id)}
                      className="h-10 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1b2a44] transition"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {!activeJobs.length && (
              <div className="text-sm text-slate-600">Belum ada lowongan aktif.</div>
            )}
          </section>

          {/* LIST CLOSED */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-extrabold mb-4">Lowongan Ditutup</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {closedJobs.map((j) => (
                <div key={j.id} className="rounded-2xl border border-gray-100 p-4">
                  <div className="font-semibold">{j.posisi}</div>
                  <div className="text-sm text-slate-600">{j.perusahaan}</div>

                  <button
                    onClick={() => reopen(j.id)}
                    className="mt-3 h-10 w-full rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
                  >
                    Buka Lagi
                  </button>
                </div>
              ))}
            </div>
            {!closedJobs.length && (
              <div className="text-sm text-slate-600">Belum ada lowongan yang ditutup.</div>
            )}
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
