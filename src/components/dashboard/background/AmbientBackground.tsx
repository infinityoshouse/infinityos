export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(193,134,36,0.14),transparent_34%),radial-gradient(circle_at_80%_78%,rgba(110,74,20,0.12),transparent_30%),linear-gradient(to_bottom,#080808,#030303)]" />

      <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D39A38]/10 blur-[130px]" />

      <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#9B651D]/10 blur-[140px]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_0.7px,transparent_0.8px)] [background-size:22px_22px]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D8A03B]/40 to-transparent" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}