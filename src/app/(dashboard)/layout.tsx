import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      {children}
    </main>
  );
}
