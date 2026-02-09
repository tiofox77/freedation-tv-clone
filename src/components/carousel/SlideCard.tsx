import { SlidePosition, Slide } from "../HeroCarousel";

interface SlideCardProps {
  slide: Slide;
  position: SlidePosition;
  videoRef: (el: HTMLVideoElement | null) => void;
  onClick: () => void;
}

const positionClasses: Record<SlidePosition, string> = {
  center: "z-30 w-[62%] h-[70%] opacity-100",
  left: "z-20 w-[20%] h-[50%] -translate-x-[155%] opacity-35 hover:opacity-55",
  right: "z-20 w-[20%] h-[50%] translate-x-[155%] opacity-35 hover:opacity-55",
  "far-left": "z-10 w-[15%] h-[40%] -translate-x-[310%] opacity-10",
  "far-right": "z-10 w-[15%] h-[40%] translate-x-[310%] opacity-10",
};

const SlideCard = ({ slide, position, videoRef, onClick }: SlideCardProps) => {
  const isCenter = position === "center";

  return (
    <div
      className={`absolute transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${positionClasses[position]}`}
      onClick={onClick}
    >
      <div className={`relative w-full h-full overflow-hidden group ${
        isCenter ? "hero-slide-active" : "hero-slide-inactive"
      }`}>
        {/* Animated border glow for active */}
        {isCenter && (
          <div className="absolute -inset-[1px] z-10 pointer-events-none rounded-sm overflow-hidden">
            <div className="absolute inset-0 border border-primary/30" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-primary/20" />
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-primary/20 via-transparent to-primary/40" />
          </div>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          src={slide.video}
          className={`w-full h-full object-cover transition-all duration-[800ms] ${
            isCenter
              ? "grayscale-[0.6] contrast-[1.2] brightness-[0.8] group-hover:grayscale-[0.2] group-hover:brightness-[0.95] group-hover:scale-[1.03]"
              : "grayscale contrast-110 brightness-[0.6] group-hover:brightness-75"
          }`}
          loop
          muted
          playsInline
          preload="auto"
          onError={(e) => console.log('Video error:', slide.video, e)}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        {isCenter && (
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        )}

        {/* HUD corners for active */}
        {isCenter && (
          <>
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/40 z-20 transition-all duration-500 group-hover:border-primary/80 group-hover:w-8 group-hover:h-8" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/40 z-20 transition-all duration-500 group-hover:border-primary/80 group-hover:w-8 group-hover:h-8" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/40 z-20 transition-all duration-500 group-hover:border-primary/80 group-hover:w-8 group-hover:h-8" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/40 z-20 transition-all duration-500 group-hover:border-primary/80 group-hover:w-8 group-hover:h-8" />
          </>
        )}

        {/* Side slide label */}
        {!isCenter && (position === "left" || position === "right") && (
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <span className="text-[10px] text-primary/60 font-mono uppercase tracking-[0.2em]">{slide.number}</span>
            <p className="text-xs text-foreground/50 font-display tracking-wider mt-0.5">{slide.title}</p>
          </div>
        )}

        {/* Center hover play indicator */}
        {isCenter && (
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-full scale-[3]" />
              <div className="relative w-16 h-16 rounded-full border border-primary/40 bg-background/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="w-0 h-0 border-l-[10px] border-l-primary border-y-[6px] border-y-transparent ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideCard;
