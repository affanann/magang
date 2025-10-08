import AuthLayout from "@/components/AuthLayout";
import Input from "@/components/Input";
import Link from "next/link";

export default function ForgotPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Masukkan email kamu di bawah dan kami akan mengirimkan tautan untuk mengganti kata sandi."
    >
      <form className="flex flex-col">
        <Input placeholder="Email address" type="email" />
        <button
          type="submit"
          className="bg-[#F59E0B] text-white py-3 rounded-lg font-semibold hover:bg-[#d78a09]"
        >
          Reset Password
        </button>
        <p className="text-center text-sm mt-4 text-gray-600">
          <Link href="/" className="text-[#0F1A2A] font-semibold">
            Back to Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
