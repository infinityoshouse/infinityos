"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronLeft,
  Menu,
  Search,
  Sparkles,
  X,
  LogOut,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { systemModules } from "@/data/modules";
import {
  infinityNavigationSpring,
  infinitySoftSpring,
} from "@/lib/motion";
import { useUIStore } from "@/store/uiStore";
import { useAuthContext } from "@/modules/auth/context/AuthProvider";

type ModuleShellProps = {
  title: string;
  description: string;
  color?: string;
  children: ReactNode;
};

export function ModuleShell({
  title,
  description,
  color = "#d4af37",
  children,
}: ModuleShellProps) {
  const router = useRouter();
  const { signOut } = useAuthContext();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const resetUI = useUIStore((state) => state.resetUI);

  function navigateTo(href: string) {
    resetUI();
    setIsMobileMenuOpen(false);
    router.push(href);
  }

  function returnToDashboard() {
    resetUI();
    router.push("/");
  }

  async function handleLogout() {
    await signOut();
    resetUI();
    router.replace("/login");
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-between border-b border-white/[0.06] px-5">
        <button
          type="button"
          onClick={returnToDashboard}
          className="flex items-center gap-3 rounded-2xl outline-none transition-opacity hover:opacity-80"
          aria-label="Voltar ao dashboard"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]"
            style={{
              boxShadow: `0 0 30px ${color}18`,
            }}
          >
            <Sparkles
              size={19}
              strokeWidth={1.6}
              style={{ color }}
            />
          </span>

          <span className="text-left">
            <strong className="block text-sm font-medium tracking-wide text-white">
              Infinity O.S.
            </strong>

            <span className="block text-[10px] uppercase tracking-[0.22em] text-white/30">
              Workspace
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 lg:hidden"
          aria-label="Fechar menu"
        >
          <X size={17} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <span className="mb-3 block px-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/25">
          Módulos
        </span>

        <div className="space-y-1">
          {systemModules.map((module) => {
            const Icon = module.icon;
            const isActive = pathname === module.href;

            return (
              <motion.button
                key={module.id}
                type="button"
                onClick={() => navigateTo(module.href)}
                whileTap={{ scale: 0.98 }}
                transition={infinitySoftSpring}
                className="relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 text-left outline-none"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-module-navigation"
                    transition={infinityNavigationSpring}
                    className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-white/[0.055]"
                    style={{
                      boxShadow: `inset 0 0 24px ${module.color}10`,
                    }}
                  />
                )}

                <span
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    color: module.color,
                    borderColor: isActive
                      ? `${module.color}55`
                      : `${module.color}20`,
                    backgroundColor: isActive
                      ? `${module.color}16`
                      : `${module.color}08`,
                  }}
                >
                  <Icon size={17} strokeWidth={1.6} />
                </span>

                <span className="relative min-w-0 flex-1">
                  <strong
                    className={`block truncate text-xs font-medium ${
                      isActive ? "text-white" : "text-white/55"
                    }`}
                  >
                    {module.label}
                  </strong>

                  <span className="mt-0.5 block truncate text-[9px] text-white/25">
                    {module.description}
                  </span>
                </span>

                {isActive && (
                  <span
                    className="relative h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: module.color,
                      boxShadow: `0 0 12px ${module.color}`,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/[0.06] p-4">
        <button
          type="button"
          onClick={() => navigateTo("/infinity-ai")}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3 text-left transition-colors hover:bg-white/[0.06]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
            <Sparkles size={17} strokeWidth={1.6} />
          </span>

          <span>
            <strong className="block text-xs font-medium text-white/75">
              Infinity AI
            </strong>

            <span className="block text-[9px] text-white/30">
              Assistente operacional
            </span>
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[270px] border-r border-white/[0.06] bg-black/55 backdrop-blur-3xl lg:block">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={infinityNavigationSpring}
              className="fixed inset-y-0 left-0 z-50 w-[290px] border-r border-white/[0.08] bg-[#090909]/95 backdrop-blur-3xl lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/[0.06] bg-[#050505]/75 px-4 backdrop-blur-3xl sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-white/60 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>

            <button
              type="button"
              onClick={returnToDashboard}
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-white/45 transition-colors hover:text-white sm:flex"
              aria-label="Voltar ao dashboard"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-base font-medium tracking-tight text-white sm:text-lg">
                {title}
              </h1>

              <p className="hidden truncate text-[10px] text-white/30 sm:block">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 text-xs text-white/35 transition-colors hover:text-white sm:flex"
            >
              <Search size={15} />
              Pesquisar
            </button>

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-white/45 transition-colors hover:text-white"
              aria-label="Notificações"
            >
              <Bell size={17} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-xs text-red-300 transition-all hover:bg-red-500/20"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sair</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo("/infinity-ai")}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/[0.07] px-3 text-xs text-[#d4af37]"
            >
              <Sparkles size={15} />
              <span className="hidden sm:inline">Infinity AI</span>
            </button>
          </div>
        </header>

        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={infinityNavigationSpring}
          className="relative min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[120px]"
            style={{
              backgroundColor: `${color}0d`,
            }}
          />

          <div className="relative mx-auto w-full max-w-[1500px]">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
