"use client";

function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">

        {/* Dual ring spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#f59e0b] border-r-[#22c55e]" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-[#ef4444] border-l-[#8750f7]"
            style={{
              animationDirection: "reverse",
              animationDuration: "1.4s",
            }}
          />
        </div>

        {/* Loading text */}
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80 animate-pulse">
          Loading
        </p>

        {/* Rhythm dots */}
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-[#f59e0b] animate-bounce" />
          <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-bounce [animation-delay:0.15s]" />
          <span className="h-2 w-2 rounded-full bg-[#ef4444] animate-bounce [animation-delay:0.3s]" />
        </div>

      </div>
    </div>
  );
}

export default Spinner;