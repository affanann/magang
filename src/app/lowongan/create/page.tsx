"use client";

import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateLowonganPage() {
  const router = useRouter();
  const [perusahaan, setPerusahaan] = useState("Perusahaan Demo");
  const [posisi, setPosisi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tanggal, setTanggal] = useState("Oktober 2025");
  const [deskripsi, setDeskripsi] = useState("");

  function save() {
    if (!posisi || !lokasi || !deskripsi) {
      alert("Lengkapi posisi, lokasi, dan deskripsi dulu.");
      return;
    }

    // demo: simpan ke localStorage (biar sederhana)
    const raw = localStorage.getItem("companyJobs");
    const list = raw ? JSON.parse(raw) : [];
    list.unshift({
      id: `job_${Date.now()}`,
      perusahaan,
      posisi,
      lokasi,
      tanggal,
      deskripsi,
      status: "aktif",
    });
    localStorage.setItem("companyJobs", JSON.stringify(list));

    router.push("/lowongan");
  }

  return (
    <AuthGuard allow={["perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold">Buat Lowongan</div>
              <div className="text-xs text-slate-500">Tambahkan lowongan baru (demo localStorage)</div>
            </div>
            <button
              onClick={() => router.push("/lowongan")}
              className="h-10 px-4 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
            >
              Kembali
            </button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
            <Field label="Perusahaan">
              <input
                value={perusahaan}
                onChange={(e) => setPerusahaan(e.target.value)}
                className="h-11 w-full rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
            </Field>

            <Field label="Posisi">
              <input
                value={posisi}
                onChange={(e) => setPosisi(e.target.value)}
                placeholder="Contoh: UI/UX Intern"
                className="h-11 w-full rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Lokasi">
                <input
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  placeholder="Contoh: Palembang / Remote"
                  className="h-11 w-full rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                />
              </Field>
              <Field label="Tanggal">
                <input
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                />
              </Field>
            </div>

            <Field label="Deskripsi">
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Tulis deskripsi singkat + requirement"
                className="min-h-[120px] w-full rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              />
            </Field>

            <button
              onClick={save}
              className="w-full h-11 rounded-2xl bg-[#F59E0B] text-white font-extrabold hover:bg-[#d78909] transition"
            >
              Simpan Lowongan
            </button>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-extrabold text-slate-600 mb-1">{label}</div>
      {children}
    </div>
  );
}
