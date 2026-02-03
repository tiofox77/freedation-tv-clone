import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { videos } from "@/data/videos";

interface Slide {
  id: number;
  video: string;
  category: string;
  title: string;
  slug: string;
}

const slides: Slide[] = [
  { id: 1, video: videos.elephantBet, category: "Demo Reel", title: "1-Demo Reel", slug: "demo-reel" },
  { id: 2, video: videos.baiDirecto, category: "Institucional", title: "2-Corporativos", slug: "corporativos" },
  { id: 3, video: videos.bdaWhatsapp, category: "Publicidade", title: "3-Publicidade", slug: "publicidade" },
  { id: 4, video: videos.yolaSemedo, category: "Demo Reel, Video Clips", title: "4-Video Clips", slug: "video-clips" },
  { id: 5, video: videos.makingOffElephant, category: "Making Off", title: "5-Making Off", slug: "making-off" },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const navigate = useNavigate();

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide]);

  const getSlidePosition = (index: number) => {
    const diff = index - currentSlide;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(slides.length - 1)) return "right";
    if (diff === -1 || diff === slides.length - 1) return "left";
    if (diff > 1) return "far-right";
    return "far-left";
  };

  const handleExplore = (slug: string) => {
    navigate(`/categoria/${slug}`);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden gradient-cinematic">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-accent/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline z-[5]" />

      <div className="absolute inset-0 flex items-center justify-center">
        {slides.map((slide, index) => {
          const position = getSlidePosition(index);
          
          return (
            <div
              key={slide.id}
              className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                position === "center"
                  ? "z-30 w-[65%] h-[75%] opacity-100"
                  : position === "left"
                  ? "z-20 w-[25%] h-[60%] -translate-x-[140%] opacity-50"
                  : position === "right"
                  ? "z-20 w-[25%] h-[60%] translate-x-[140%] opacity-50"
                  : position === "far-left"
                  ? "z-10 w-[20%] h-[50%] -translate-x-[280%] opacity-20"
                  : "z-10 w-[20%] h-[50%] translate-x-[280%] opacity-20"
              }`}
              onClick={() => position === "center" ? handleExplore(slide.slug) : goToSlide(index)}
            >
              <div className={`relative w-full h-full overflow-hidden rounded-sm group ${
                position === "center" ? "glow-border" : ""
              }`}>
                {/* Frame border for center */}
                {position === "center" && (
                  <>
                    <div className="absolute inset-0 border border-primary/20 rounded-sm z-10 pointer-events-none" />
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm z-0" />
                  </>
                )}

                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={slide.video}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:brightness-100"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 gradient-overlay" />
                
                {/* Hover overlay for center slide */}
                {position === "center" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-background/40 backdrop-blur-sm">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
                      <span className="relative px-8 py-4 border border-primary/50 text-foreground font-medium uppercase tracking-[0.3em] text-sm hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 backdrop-blur-sm">
                        Ver Projetos
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="carousel-nav-button absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="carousel-nav-button absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom category navigation */}
      <div className="absolute bottom-20 left-0 right-0 z-40">
        <div className="flex items-end justify-center gap-6 lg:gap-12 px-4 overflow-x-auto">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`flex flex-col items-center transition-all duration-500 min-w-fit group ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              <span className={`text-xs uppercase tracking-[0.2em] mb-2 transition-colors ${
                index === currentSlide ? "text-primary" : "text-muted-foreground group-hover:text-foreground/70"
              }`}>
                {slide.category}
              </span>
              <span
                className={`font-display text-2xl lg:text-4xl xl:text-5xl transition-all ${
                  index === currentSlide 
                    ? "text-foreground text-shadow-glow" 
                    : "text-muted-foreground group-hover:text-foreground/70"
                }`}
              >
                {slide.title}
              </span>
              {index === currentSlide && (
                <>
                  <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-3" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExplore(slide.slug);
                    }}
                    className="text-xs uppercase tracking-[0.2em] text-primary/70 mt-3 hover:text-primary cursor-pointer transition-colors"
                  >
                    Explore →
                  </button>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-[2px] transition-all duration-500 ${
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "w-4 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
