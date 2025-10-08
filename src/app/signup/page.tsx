"use client";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout title="Sign Up" subtitle="Create an account">
      <img src="/signup-illustration.png" alt="illustration" className="mb-4 w-48 h-auto" />
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button label="Register" />
      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account? <Link href="/" className="text-[#0F1A2A] font-semibold">Log In</Link>
      </p>
    </AuthLayout>
  );
}
