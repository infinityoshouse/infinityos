import type { ReactNode } from "react";

type ModulesLayoutProps = {
  children: ReactNode;
};

export default function ModulesLayout({
  children,
}: ModulesLayoutProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {children}
    </main>
  );
}