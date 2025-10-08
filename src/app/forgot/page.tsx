"use client";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <AuthLayout
        title="Forgot Password"
        subtitle="Masukkan alamat email anda di bawah dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi anda."
      >
        <img src="/forgot-illustration.png" alt="illustration" className="mb-4 w-40 h-auto mx-auto" />
        <Input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button label="Reset Password" onClick={() => setShowSuccess(true)} />
        <p className="text-center text-sm mt-4 text-gray-600">
          <Link href="/" className="text-[#0F1A2A] font-semibold">Back Log In</Link>
        </p>
      </AuthLayout>
      <SuccessModal visible={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}
