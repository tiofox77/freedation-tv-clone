import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
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
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] bg-cyan-accent/6 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-[200px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline z-[5]" />

      {/* Horizontal cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-[6]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[6]" />

      {/* Carousel slides */}
      <div className="absolute inset-0 flex items-center justify-center">
        {slides.map((slide, index) => {
          const position = getSlidePosition(index);
          
          return (
            <div
              key={slide.id}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer ${
                position === "center"
                  ? "z-30 w-[65%] h-[72%] opacity-100"
                  : position === "left"
                  ? "z-20 w-[22%] h-[55%] -translate-x-[145%] opacity-40 hover:opacity-60"
                  : position === "right"
                  ? "z-20 w-[22%] h-[55%] translate-x-[145%] opacity-40 hover:opacity-60"
                  : position === "far-left"
                  ? "z-10 w-[18%] h-[45%] -translate-x-[290%] opacity-15"
                  : "z-10 w-[18%] h-[45%] translate-x-[290%] opacity-15"
              }`}
              onClick={() => position === "center" ? handleExplore(slide.slug) : goToSlide(index)}
            >
              <div className={`relative w-full h-full overflow-hidden group ${
                position === "center" ? "hero-slide-active" : "hero-slide-inactive"
              }`}>
                {/* Glowing frame for active slide */}
                {position === "center" && (
                  <>
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 rounded-sm z-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-accent/10 via-transparent to-primary/20 rounded-sm z-10 pointer-events-none" />
                  </>
                )}

                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={slide.video}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    position === "center" 
                      ? "grayscale-[0.7] contrast-125 brightness-[0.85] group-hover:grayscale-[0.3] group-hover:brightness-100" 
                      : "grayscale contrast-110 brightness-75"
                  }`}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={(e) => console.log('Video error:', slide.video, e)}
                />
                <div className="absolute inset-0 gradient-overlay" />
                
                {/* HUD-style corner markers for center */}
                {position === "center" && (
                  <>
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/50 z-20 transition-all duration-500 group-hover:border-primary group-hover:w-10 group-hover:h-10" />
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/50 z-20 transition-all duration-500 group-hover:border-primary group-hover:w-10 group-hover:h-10" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/50 z-20 transition-all duration-500 group-hover:border-primary group-hover:w-10 group-hover:h-10" />
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary/50 z-20 transition-all duration-500 group-hover:border-primary group-hover:w-10 group-hover:h-10" />
                  </>
                )}
                
                {/* Center slide hover CTA */}
                {position === "center" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-background/30 backdrop-blur-[2px] z-20">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-[2]" />
                      <span className="relative px-10 py-4 border border-primary/60 text-foreground font-medium uppercase tracking-[0.35em] text-sm hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 backdrop-blur-md bg-background/20">
                        Ver Projetos
                      </span>
                    </motion.div>
                  </div>
                )}

                {/* Category label on side slides */}
                {position !== "center" && (
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <p className="text-xs text-primary/70 uppercase tracking-[0.15em] font-mono truncate">{slide.category}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows with enhanced style */}
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

      {/* Bottom category navigation - refined */}
      <div className="absolute bottom-16 left-0 right-0 z-40">
        <div className="flex items-end justify-center gap-6 lg:gap-10 px-4 overflow-x-auto">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`flex flex-col items-center transition-all duration-500 min-w-fit group ${
                index === currentSlide ? "opacity-100" : "opacity-25 hover:opacity-50"
              }`}
            >
              <span className={`text-[10px] uppercase tracking-[0.25em] mb-1.5 font-mono transition-colors ${
                index === currentSlide ? "text-primary" : "text-muted-foreground group-hover:text-foreground/60"
              }`}>
                {slide.category}
              </span>
              <span className={`font-display text-xl lg:text-3xl xl:text-4xl transition-all leading-none ${
                index === currentSlide ? "text-foreground text-shadow-glow" : "text-muted-foreground group-hover:text-foreground/60"
              }`}>
                {slide.title}
              </span>
              <AnimatePresence>
                {index === currentSlide && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 48, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mt-2"
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-[1px] transition-all duration-700 ${
              index === currentSlide 
                ? "w-10 bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" 
                : "w-3 bg-foreground/15 hover:bg-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Slide counter - HUD style */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-10 z-30 flex flex-col items-center gap-2">
        <span className="text-primary font-mono text-sm font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        <span className="text-muted-foreground font-mono text-xs">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default HeroCarousel;
