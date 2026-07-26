"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
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
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);
      setLoginError(null);

      await signIn(data);

      router.replace("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível realizar o login.";

      setLoginError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-zinc-300"
        >
          E-mail
        </label>

        <div className="relative group">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-yellow-400"
          />

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail"
            disabled={loading}
            {...register("email")}
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/5
              pl-12
              pr-4
              text-white
              placeholder:text-zinc-500
              backdrop-blur-xl
              outline-none
              transition-all
              duration-300
              hover:border-yellow-500/30
              focus:border-yellow-400
              focus:bg-white/10
              focus:shadow-[0_0_30px_rgba(250,204,21,.18)]
            "
          />
        </div>

        {errors.email && (
          <p className="text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>      <PasswordField
        id="password"
        autoComplete="current-password"
        placeholder="Digite sua senha"
        disabled={loading}
        {...register("password")}
      />

      {errors.password && (
        <p className="text-sm text-red-400">
          {errors.password.message}
        </p>
      )}

      {loginError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {loginError}
        </motion.div>
      )}

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className="
          h-14
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-yellow-500
          via-yellow-400
          to-yellow-500
          font-semibold
          text-black
          shadow-lg
          shadow-yellow-500/20
          transition-all
          duration-300
          hover:shadow-yellow-400/40
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? "Entrando..." : "Entrar no Infinity O.S."}
      </motion.button>
    </motion.form>
  );
}
