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

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  function resetForm() {
    setEditingId(null);
    setPosisi("");
    setLokasi("");
    setTanggal("Oktober 2025");
    setDeskripsi("");
  }

  function submit() {
    if (!posisi || !lokasi || !tanggal || !deskripsi) {
      alert("Lengkapi semua field dulu.");
      return;
    }

    if (isEditing && editingId) {
      const next = jobs.map((j) =>
        j.id === editingId
          ? {
              ...j,
              perusahaan: perusahaan.trim(),
              posisi: posisi.trim(),
              lokasi: lokasi.trim(),
              tanggal: tanggal.trim(),
              deskripsi: deskripsi.trim(),
            }
          : j
      );
      setJobs(next);
      setCompanyJobs(next);
      resetForm();
      return;
    }

    const newJob: Job = {
      id: uid("job"),
      perusahaan: perusahaan.trim(),
      posisi: posisi.trim(),
      lokasi: lokasi.trim(),
      tanggal: tanggal.trim(),
      deskripsi: deskripsi.trim(),
      status: "aktif",
    };

    const next = [newJob, ...jobs];
    setJobs(next);
    setCompanyJobs(next);
    resetForm();
  }

  function edit(job: Job) {
    setEditingId(job.id);
    setPerusahaan(job.perusahaan);
    setPosisi(job.posisi);
    setLokasi(job.lokasi);
    setTanggal(job.tanggal);
    setDeskripsi(job.deskripsi);
  }

  function remove(jobId: string) {
    if (!confirm("Hapus lowongan ini?")) return;
    const next = jobs.filter((j) => j.id !== jobId);
    setJobs(next);
    setCompanyJobs(next);
    if (editingId === jobId) resetForm();
  }

  function close(jobId: string) {
    const nowJobs = jobs.map((j) =>
      j.id === jobId ? { ...j, status: "tutup" as const } : j
    );
    setJobs(nowJobs);
    setCompanyJobs(nowJobs);
  }

  function open(jobId: string) {
    const nowJobs = jobs.map((j) =>
      j.id === jobId ? { ...j, status: "aktif" as const } : j
    );
    setJobs(nowJobs);
    setCompanyJobs(nowJobs);
  }

  return (
    <AuthGuard allow={["perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Kelola Lowongan</div>
              <div className="text-xs text-slate-500">
                Tambah / edit / tutup lowongan (mode demo)
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
              >
                Dashboard
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
          {/* Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="text-base font-extrabold">
                  {isEditing ? "Edit Lowongan" : "Tambah Lowongan"}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Isi data lowongan agar tampil di aplikasi (demo).
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
                >
                  Batal Edit
                </button>
              )}
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <Field label="Perusahaan">
                <input
                  value={perusahaan}
                  onChange={(e) => setPerusahaan(e.target.value)}
                  className="w-full h-11 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                  placeholder="Nama perusahaan"
                />
              </Field>

              <Field label="Posisi">
                <input
                  value={posisi}
                  onChange={(e) => setPosisi(e.target.value)}
                  className="w-full h-11 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                  placeholder="Contoh: UI/UX Intern"
                />
              </Field>

              <Field label="Lokasi">
                <input
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  className="w-full h-11 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                  placeholder="Contoh: Palembang"
                />
              </Field>

              <Field label="Tanggal">
                <input
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full h-11 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                  placeholder="Contoh: Oktober 2025"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Deskripsi">
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full min-h-[110px] rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                    placeholder="Tulis ringkasan pekerjaan, kualifikasi, benefit, dll."
                  />
                </Field>
              </div>
            </div>

            <button
              onClick={submit}
              className="mt-4 w-full h-11 rounded-2xl bg-[#F59E0B] text-white font-extrabold hover:bg-[#d78909] transition"
            >
              {isEditing ? "Simpan Perubahan" : "Tambah Lowongan"}
            </button>
          </div>

          {/* List */}
          <div className="grid md:grid-cols-2 gap-4">
            {jobs.map((j) => (
              <div
                key={j.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-extrabold">{j.posisi}</div>
                    <div className="text-sm text-slate-600">{j.perusahaan}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      📍 {j.lokasi} • 📅 {j.tanggal}
                    </div>
                  </div>
                  <span
                    className={
                      "text-xs font-extrabold px-2.5 py-1 rounded-full border " +
                      (j.status === "aktif"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-rose-50 text-rose-700 border-rose-200")
                    }
                  >
                    {j.status === "aktif" ? "AKTIF" : "TUTUP"}
                  </span>
                </div>

                <p className="text-sm text-slate-700 mt-3 line-clamp-3">
                  {j.deskripsi}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => edit(j)}
                    className="h-10 rounded-2xl border border-gray-300 text-sm font-semibold hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>

                  {j.status === "aktif" ? (
                    <button
                      onClick={() => close(j.id)}
                      className="h-10 rounded-2xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1b2a44] transition"
                    >
                      Tutup
                    </button>
                  ) : (
                    <button
                      onClick={() => open(j.id)}
                      className="h-10 rounded-2xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1b2a44] transition"
                    >
                      Buka
                    </button>
                  )}

                  <button
                    onClick={() => router.push(`/magang/${j.id}`)}
                    className="col-span-2 h-10 rounded-2xl border border-gray-300 text-sm font-semibold hover:bg-gray-100 transition"
                  >
                    Lihat Detail Lowongan
                  </button>

                  <button
                    onClick={() => remove(j.id)}
                    className="col-span-2 h-10 rounded-2xl border border-rose-200 text-rose-700 text-sm font-extrabold hover:bg-rose-50 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center text-sm text-slate-500">
              Belum ada lowongan. Tambahkan dulu dari form di atas.
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-bold text-slate-600">{label}</div>
      {children}
    </div>
  );
}
