import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type GlassPanelProps = HTMLAttributes<HTMLDivElement>;

export function GlassPanel({
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10",
        "bg-black/40 backdrop-blur-2xl",
        "shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}