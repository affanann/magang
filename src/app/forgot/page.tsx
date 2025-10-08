"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Masukkan alamat email terlebih dahulu.");
    setShowSuccess(true);
  };

  return (
    <>
      <div className="min-h-screen bg-[#0F1A2A] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl font-extrabold text-[#0F1A2A] mb-1 text-center">
            Lupa Kata Sandi
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Masukkan alamat email Anda di bawah ini. Kami akan mengirimkan
            instruksi untuk mengatur ulang kata sandi Anda.
          </p>

          <form onSubmit={handleReset} className="flex flex-col">
            <Input
              placeholder="Alamat email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button label="Atur Ulang Kata Sandi" type="submit" />

            <p className="text-center text-sm mt-4 text-gray-600">
              <Link
                href="/"
                className="text-[#0F1A2A] font-semibold hover:underline"
              >
                Kembali ke Halaman Masuk
              </Link>
            </p>
          </form>
        </div>
      </div>

      <SuccessModal
        visible={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          router.push("/");
        }}
      />
    </>
  );
}
