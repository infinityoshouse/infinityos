"use client";

import {
  Bell,
  Infinity as InfinityIcon,
  Menu,
  Search,
  Sparkles,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/modules/auth/context/AuthProvider";
export function TopBar() {
  const router = useRouter();
  const { signOut } = useAuthContext();

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D59B34]/30 bg-[#D59B34]/[0.06] text-[#E4AB3E] shadow-[0_0_32px_rgba(213,155,52,0.12)] backdrop-blur-xl"
        >
          <InfinityIcon size={27} strokeWidth={1.45} />
        </motion.div>

        <div className="min-w-0">
          <p className="truncate text-[9px] uppercase tracking-[0.28em] text-[#D79C34]">
            Centro de operações
          </p>

          <h1 className="mt-1 truncate text-base font-medium text-white sm:text-lg">
            Infinity O.S.
          </h1>
        </div>
      </div>

      <div className="hidden flex-1 justify-center px-6 md:flex">
        <button
          type="button"
          className="flex w-full max-w-[420px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-left text-sm text-white/35 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition hover:border-[#D39A35]/25 hover:bg-white/[0.04]"
        >
          <Search size={17} strokeWidth={1.6} className="text-[#D49A35]" />

          <span className="flex-1">Buscar módulos, clientes ou projetos</span>

          <span className="rounded-lg border border-white/[0.08] bg-black/30 px-2 py-1 text-[9px] text-white/30">
            ⌘ K
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Abrir Infinity AI"
          className="hidden h-10 items-center gap-2 rounded-xl border border-[#D59B34]/25 bg-[#D59B34]/[0.055] px-3 text-xs text-[#E3AA3D] backdrop-blur-xl transition hover:border-[#DDA744]/45 hover:bg-[#D59B34]/10 sm:flex"
        >
          <Sparkles size={16} strokeWidth={1.6} />
          Infinity AI
        </button>

        <button
          type="button"
          aria-label="Notificações"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/55 backdrop-blur-xl transition hover:border-[#D59B34]/25 hover:text-[#E0A63A]"
        >
          <Bell size={18} strokeWidth={1.6} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E4AA3F]" />
        </button>
<button
  type="button"
  onClick={handleLogout}
  className="flex h-10 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-xs text-red-300 backdrop-blur-xl transition hover:bg-red-500/20"
>
  <LogOut size={16} strokeWidth={1.6} />
  <span className="hidden sm:inline">Sair</span>
</button>
        <button
          type="button"
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/55 backdrop-blur-xl transition hover:border-[#D59B34]/25 hover:text-[#E0A63A] lg:hidden"
        >
          <Menu size={19} strokeWidth={1.6} />
        </button>

        <button
          type="button"
          className="hidden items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 backdrop-blur-xl lg:flex"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D49A35]/30 bg-[#D49A35]/[0.06] text-[10px] font-semibold text-[#E5AD43]">
            IH
          </span>

          <span className="pr-1 text-left">
            <strong className="block text-xs font-medium text-white">
              Infinite House
            </strong>

            <small className="block text-[9px] text-white/35">
              Administrativo
            </small>
          </span>
        </button>
      </div>
    </header>
  );
}
