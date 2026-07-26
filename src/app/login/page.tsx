"use client";

import Image from "next/image";
import { LoginForm } from "@/modules/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">

      {/* Fundo */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b2d00_0%,#0b0b0b_35%,#000000_100%)]" />

        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow-500/5 blur-[120px]" />

        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-yellow-400/5 blur-[120px]" />

      </div>

      {/* Card */}
      <div className="relative w-full max-w-md rounded-[34px] border border-yellow-500/20 bg-white/[0.05] p-8 shadow-[0_0_60px_rgba(255,196,0,0.12)] backdrop-blur-2xl">

        <div className="mb-10 text-center">

          {/* Logo */}
          <div className="mx-auto mb-8 flex justify-center">

            <Image
              src="/logo-infinity-os.png"
              alt="Infinity OS"
              width={280}
              height={120}
              priority
              className="w-64 object-contain"
            />

          </div>

          <h1 className="text-4xl font-extrabold tracking-[0.25em] text-white">
            INFINITY
            <span className="ml-2 text-yellow-400">
              OS
            </span>
          </h1>

          <p className="mt-5 text-sm font-medium tracking-[0.20em] uppercase text-yellow-400/90">

            O cérebro da marcenaria moderna.

          </p>

        </div>

        <LoginForm />

      </div>

    </main>
  );
}
