"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#0F1A2A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-[#0F1A2A] mb-1 text-center">Login</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Hallo, Welcome Back!
        </p>

        {/* Form */}
        <form className="flex flex-col">
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right text-sm mb-4 mt-1">
            <Link href="/forgot" className="text-[#0F1A2A] font-semibold hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button label="Login" type="submit" />

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-[#0F1A2A] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-400 text-center w-full">
        By <span className="font-semibold text-white">Hunter Nac</span>
      </div>
    </div>
  );
}
