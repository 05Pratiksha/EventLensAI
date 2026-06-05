export function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(229,193,88,0.02)_0%,_transparent_45%)] opacity-100" />
      <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#E5C158]/5 blur-[140px] rounded-full" />
      <div className="absolute bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-[#A38A4D]/5 blur-[140px] rounded-full" />
    </div>
  );
}
