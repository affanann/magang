// src/app/lowongan/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { Job, upsertCompanyJob, uid } from "@/lib/storage";

export default function CreateLowonganPage() {
  return (
    <AuthGuard allow={["perusahaan"]}>
      <CreateInner />
    </AuthGuard>
  );
}

function CreateInner() {
  const router = useRouter();

  const [perusahaan, setPerusahaan] = useState("Perusahaan Demo");
  const [posisi, setPosisi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tanggal, setTanggal] = useState("Oktober 2025");
  const [deskripsi, setDeskripsi] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!posisi.trim() || !lokasi.trim() || !deskripsi.trim()) {
      alert("Posisi, lokasi, dan deskripsi wajib diisi.");
      return;
    }

    const job: Job = {
      id: `job_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`,
      perusahaan: perusahaan.trim(),
      posisi: posisi.trim(),
      lokasi: lokasi.trim(),
      tanggal: tanggal.trim(),
      deskripsi: deskripsi.trim(),
      status: "aktif",
      ownerId: uid(),
    };

    upsertCompanyJob(job, uid());
    router.push("/lowongan/manage");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-extrabold text-lg">Buat Lowongan</div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-semibold"
          >
            Kembali
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={submit} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
          <Field label="Nama Perusahaan">
            <input
              value={perusahaan}
              onChange={(e) => setPerusahaan(e.target.value)}
              className="w-full h-11 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
            />
          </Field>

          <Field label="Posisi">
            <input
              value={posisi}
              onChange={(e) => setPosisi(e.target.value)}
              placeholder="Contoh: Frontend Intern"
              className="w-full h-11 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
            />
          </Field>

          <Field label="Lokasi">
            <input
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              placeholder="Contoh: Palembang / Remote"
              className="w-full h-11 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
            />
          </Field>

          <Field label="Periode / Tanggal">
            <input
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full h-11 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
            />
          </Field>

          <Field label="Deskripsi">
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tulis detail requirement, benefit, durasi, dll..."
              className="w-full min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
            />
          </Field>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#F59E0B] text-white font-extrabold hover:bg-[#d78909] transition"
          >
            Simpan Lowongan
          </button>
        </form>

        <div className="h-24" />
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      {children}
    </div>
  );
}
