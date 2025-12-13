"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { magangData } from "@/data/magangData";
import {
  getApplications,
  getCompanyJobs,
  getRole,
  setApplications,
  uid,
  Application,
} from "@/lib/storage";

export default function MagangDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [role, setRole] = useState<"mahasiswa" | "perusahaan">("mahasiswa");

  useEffect(() => {
    const r = getRole();
    if (r) setRole(r);
  }, []);

  const job = useMemo(() => {
    const id = String(params.id);

    // 1) cek companyJobs
    const cj = getCompanyJobs().find((x) => x.id === id);
    if (cj) {
      return {
        id: cj.id,
        perusahaan: cj.perusahaan,
        posisi: cj.posisi,
        lokasi: cj.lokasi,
        tanggal: cj.tanggal,
        deskripsi: cj.deskripsi,
      };
    }

    // 2) cek magangData
    const md = magangData.find((x) => String(x.id) === id);
    if (!md) return null;

    return {
      id: String(md.id),
      perusahaan: md.perusahaan,
      posisi: md.posisi,
      lokasi: md.lokasi,
      tanggal: md.tanggal,
      deskripsi:
        "Deskripsi lowongan belum tersedia (dummy). Kamu bisa menambahkan deskripsi lebih lengkap nanti.",
    };
  }, [params.id]);

  function apply() {
    if (!job) return;

    if (role !== "mahasiswa") {
      alert("Aksi melamar hanya untuk akun mahasiswa.");
      return;
    }

    const apps = getApplications();
    const already = apps.some((a) => a.jobId === job.id);
    if (already) {
      alert("Kamu sudah melamar lowongan ini.");
      router.push("/lamaran");
      return;
    }

    const newApp: Application = {
      id: uid("app"),
      jobId: job.id,
      perusahaan: job.perusahaan,
      posisi: job.posisi,
      tanggal: job.tanggal,
      status: "Dikirim",
    };

    setApplications([newApp, ...apps]);
    alert("Lamaran berhasil dikirim ✅");
    router.push("/lamaran");
  }

  return (
    <AuthGuard allow={["mahasiswa", "perusahaan"]}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-lg font-extrabold">Detail Lowongan</div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
            >
              Kembali
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          {!job ? (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="font-semibold">Lowongan tidak ditemukan.</div>
              <button
                onClick={() => router.push("/lowongan")}
                className="mt-4 px-5 py-2 rounded-xl bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909] transition"
              >
                Kembali ke Lowongan
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-2xl font-extrabold">{job.posisi}</div>
                  <div className="text-slate-600 mt-1">{job.perusahaan}</div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#b57407] font-semibold">
                  {role === "mahasiswa" ? "Mahasiswa" : "Perusahaan"}
                </span>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <Info label="Lokasi" value={job.lokasi} />
                <Info label="Periode" value={job.tanggal} />
                <Info label="Status" value="Open" />
              </div>

              <div className="mt-6">
                <div className="font-extrabold mb-2">Deskripsi</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {job.deskripsi}
                </p>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-2">
                <button
                  onClick={() => router.push("/lowongan")}
                  className="h-11 rounded-xl border border-gray-300 text-sm hover:bg-gray-100 transition"
                >
                  Kembali ke Lowongan
                </button>

                <button
                  onClick={apply}
                  className="h-11 rounded-xl bg-[#F59E0B] text-white font-extrabold hover:bg-[#d78909] transition"
                >
                  Lamar Sekarang
                </button>
              </div>

              {role !== "mahasiswa" && (
                <p className="text-[12px] text-slate-500 mt-3">
                  * Perusahaan tidak bisa melamar. Ini sesuai pembagian akses fitur.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
