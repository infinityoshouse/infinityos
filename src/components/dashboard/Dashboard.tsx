"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { systemModules, type SystemModule } from "@/data/modules";
import { useUIStore } from "@/store/uiStore";

import { AmbientBackground } from "./background/AmbientBackground";
import { BottomCards } from "./cards/BottomCards";
import { LeftDock } from "./layout/LeftDock";
import { RightDock } from "./layout/RightDock";
import { TopBar } from "./layout/TopBar";

const Orbit = dynamic(
  () => import("./orbit/Orbit").then((mod) => ({ default: mod.Orbit })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[700px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
      </div>
    ),
  },
);

export function Dashboard() {
  const router = useRouter();

  const {
    selectModule,
    startNavigation,
    activateAI,
  } = useUIStore();

  async function handleModuleClick(module: SystemModule) {
    selectModule(module.id);

    startNavigation();

    await new Promise((resolve) => setTimeout(resolve, 700));

    router.push(module.href);
  }

  async function handleCoreClick() {
    activateAI();

    await new Promise((resolve) => setTimeout(resolve, 600));

    router.push("/infinity-ai");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <AmbientBackground />

      <TopBar />

      <LeftDock />

      <RightDock />

      <div className="relative z-10 mx-auto w-full max-w-[1280px]">
        <Orbit
          modules={systemModules}
          onModuleClick={handleModuleClick}
          onCoreClick={handleCoreClick}
        />
      </div>

      <BottomCards />
    </main>
  );
}
