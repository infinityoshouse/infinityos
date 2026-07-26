"use client";

import { LoginForm } from "@/modules/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-yellow-400">
            Infinity O.S.
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sistema Operacional Inteligente
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
