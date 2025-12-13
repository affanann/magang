// src/app/lowongan/edit/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Job, getCompanyJobs, upsertCompanyJob, uid } from "@/lib/storage";

export default function LowonganEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = (params?.id as string) || "";
  const ownerId = useMemo(() => uid(), []);

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");
    if (!loggedIn || role !== "perusahaan") {
      router.replace("/");
      return;
    }

    const found = getCompanyJobs(ownerId).find((j) => j.id === id) || null;
    setJob(found);
  }, [id, ownerId, router]);

  function save() {
    if (!job) return;
    upsertCompanyJob(job, ownerId);
    router.push("/lowongan/manage");
  }

  if (!job) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F8FAFC] text-[#0F172A] px-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="text-sm text-slate-700 font-semibold">
            Lowongan tidak ditemukan.
          </div>
          <Link
            href="/lowongan/manage"
            className="inline-flex mt-3 px-4 py-2 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold">Edit Lowongan</div>
            <div className="text-xs text-slate-500">Perbarui detail lowongan</div>
          </div>
          <Link
            href="/lowongan/manage"
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Kembali
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <Field
            label="Perusahaan"
            value={job.perusahaan}
            onChange={(v) => setJob({ ...job, perusahaan: v })}
          />
          <Field
            label="Posisi"
            value={job.posisi}
            onChange={(v) => setJob({ ...job, posisi: v })}
          />
          <Field
            label="Lokasi"
            value={job.lokasi}
            onChange={(v) => setJob({ ...job, lokasi: v })}
          />
          <Field
            label="Tanggal"
            value={job.tanggal}
            onChange={(v) => setJob({ ...job, tanggal: v })}
          />

          <div>
            <div className="text-sm font-semibold mb-2">Deskripsi</div>
            <textarea
              value={job.deskripsi}
              onChange={(e) => setJob({ ...job, deskripsi: e.target.value })}
              className="w-full min-h-[140px] rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/40"
              placeholder="Tulis deskripsi lowongan..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => router.push("/lowongan/manage")}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              onClick={save}
              className="px-5 py-2 rounded-xl bg-[#F59E0B] text-white text-sm font-extrabold hover:bg-[#d78909] transition"
            >
              Simpan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-sm font-semibold mb-2">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]/40"
      />
    </div>
  );
}
