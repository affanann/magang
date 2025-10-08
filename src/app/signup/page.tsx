import AuthLayout from "@/components/AuthLayout";
import Input from "@/components/Input";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <AuthLayout title="Sign Up" subtitle="Create an account">
      <form className="flex flex-col">
        <Input placeholder="Username" />
        <Input placeholder="Email address" type="email" />
        <Input placeholder="Password" type="password" />

        <button
          type="submit"
          className="bg-[#F59E0B] text-white py-3 rounded-lg font-semibold hover:bg-[#d78a09]"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/" className="text-[#0F1A2A] font-semibold">
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
