"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { magangData } from "@/data/magangData";

// 🔹 Definisi tipe data magang
type MagangItem = {
  id: number;
  perusahaan: string;
  posisi: string;
  lokasi: string;
  tanggal: string;
  deskripsi?: string;
};

// 🔹 Komponen utama
export default function MagangDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [magang, setMagang] = useState<MagangItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Ambil data magang berdasarkan ID
  useEffect(() => {
    const found = magangData.find((m) => m.id.toString() === id);
    if (found) setMagang(found);
  }, [id]);

  // 🔹 Jika data belum ditemukan
  if (!magang) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat detail magang...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-10 text-[#0F172A]">
      {/* Tombol kembali */}
      <button
        onClick={() => router.back()}
        className="text-[#F59E0B] font-semibold mb-6 hover:underline"
      >
        ← Kembali
      </button>

      {/* Card utama detail magang */}
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-100">
        <h1 className="text-2xl font-bold mb-2">{magang.posisi}</h1>
        <h2 className="text-lg text-gray-600 mb-4">{magang.perusahaan}</h2>

        <p className="text-sm text-gray-500 mb-6">
          📍 {magang.lokasi} • 📅 {magang.tanggal}
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          {magang.deskripsi ||
            "Program magang ini memberikan pengalaman kerja nyata bagi mahasiswa untuk mengasah kemampuan profesional di lingkungan kerja sesungguhnya."}
        </p>

        {/* Tombol daftar */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#F59E0B] text-white py-3 rounded-lg font-semibold hover:bg-[#d78909] transition"
        >
          Daftar Sekarang
        </button>
      </div>

      {/* Modal daftar */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#0F172A]">
              Formulir Pendaftaran
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Pendaftaran berhasil dikirim (dummy)");
                setShowModal(false);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                required
              />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-none file:bg-[#F59E0B] file:text-white file:font-semibold hover:file:bg-[#d78909]"
              />
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F59E0B] text-white font-semibold hover:bg-[#d78909]"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
