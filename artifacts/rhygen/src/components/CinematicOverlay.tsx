export function CinematicOverlay() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Heavy Vignette Lens Effect */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
          mixBlendMode: "multiply"
        }}
      />
      
      {/* Film Grain Texture */}
      <div 
        className="absolute inset-0 z-20 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay"
        }}
      />

      {/* Cinematic Letterbox (Top & Bottom subtle crop) */}
      <div className="absolute top-0 left-0 right-0 h-4 md:h-8 bg-black z-30 shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
      <div className="absolute bottom-0 left-0 right-0 h-4 md:h-8 bg-black z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]" />
    </div>
  );
}
