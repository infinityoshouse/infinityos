"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function PasswordField({
  label = "Senha",
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-zinc-300">
        {label}
      </label>

      <div className="relative group">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-yellow-400"
        />

        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            pl-12
            pr-14
            text-white
            placeholder:text-zinc-500
            backdrop-blur-xl
            transition-all
            duration-300
            outline-none
            hover:border-yellow-500/30
            focus:border-yellow-400
            focus:bg-white/10
            focus:shadow-[0_0_30px_rgba(250,204,21,.18)]
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1.5
            text-zinc-400
            transition-all
            duration-300
            hover:bg-yellow-400/10
            hover:text-yellow-400
          "
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </motion.div>
  );
}
