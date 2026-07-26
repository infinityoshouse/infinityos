"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField } from "./PasswordField";
import { useAuth } from "../hooks/useAuth";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/login.schema";

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);

      await signIn(data);

      router.push("/");
    } catch {
      alert("Falha ao realizar login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          E-mail
        </label>

        <input
          type="email"
          {...register("email")}
          placeholder="Digite seu e-mail"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-yellow-400"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <PasswordField
        placeholder="Digite sua senha"
        {...register("password")}
      />

      {errors.password && (
        <p className="-mt-3 text-sm text-red-400">
          {errors.password.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
