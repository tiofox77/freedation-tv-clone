import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { videos } from "@/data/videos";
import SlideCard from "./carousel/SlideCard";
import SlideInfo from "./carousel/SlideInfo";

export interface Slide {
  id: number;
  video: string;
  category: string;
  title: string;
  slug: string;
  number: string;
}

export const slides: Slide[] = [
  { id: 1, video: videos.elephantBet, category: "Demo Reel", title: "Demo Reel", number: "01", slug: "demo-reel" },
  { id: 2, video: videos.baiDirecto, category: "Institucional", title: "Corporativos", number: "02", slug: "corporativos" },
  { id: 3, video: videos.bdaWhatsapp, category: "Publicidade", title: "Publicidade", number: "03", slug: "publicidade" },
  { id: 4, video: videos.yolaSemedo, category: "Video Clips", title: "Video Clips", number: "04", slug: "video-clips" },
  { id: 5, video: videos.makingOffElephant, category: "Making Off", title: "Making Off", number: "05", slug: "making-off" },
];

export type SlidePosition = "center" | "left" | "right" | "far-left" | "far-right";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const navigate = useNavigate();

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

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

  const getSlidePosition = (index: number): SlidePosition => {
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
    <section 
      className="relative w-full h-screen overflow-hidden gradient-cinematic"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] bg-cyan-accent/4 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Scanline */}
      <div className="absolute inset-0 scanline z-[5]" />

      {/* Cinematic letterbox */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background via-background/80 to-transparent z-[6]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent z-[6]" />

      {/* Slides */}
      <div className="absolute inset-0 flex items-center justify-center">
        {slides.map((slide, index) => {
          const position = getSlidePosition(index);
          return (
            <SlideCard
              key={slide.id}
              slide={slide}
              position={position}
              videoRef={(el) => (videoRefs.current[index] = el)}
              onClick={() => position === "center" ? handleExplore(slide.slug) : goToSlide(index)}
            />
          );
        })}
      </div>

      {/* Active slide info overlay */}
      <AnimatePresence mode="wait">
        <SlideInfo
          key={currentSlide}
          slide={slides[currentSlide]}
          onExplore={() => handleExplore(slides[currentSlide].slug)}
        />
      </AnimatePresence>

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

      {/* Bottom timeline navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="group flex items-center gap-2 transition-all duration-500"
          >
            <div className={`relative transition-all duration-700 ${
              index === currentSlide ? "w-12" : "w-6 hover:w-8"
            }`}>
              <div className={`h-[2px] w-full transition-all duration-700 ${
                index === currentSlide 
                  ? "bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]" 
                  : "bg-foreground/15 group-hover:bg-foreground/40"
              }`} />
            </div>
            {index === currentSlide && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] text-primary font-mono uppercase tracking-wider"
              >
                {slide.number}
              </motion.span>
            )}
          </button>
        ))}
      </div>

      {/* Vertical slide counter */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-10 z-30 flex flex-col items-center gap-1">
        <motion.span 
          key={currentSlide}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-primary font-mono text-lg font-bold"
        >
          {slides[currentSlide].number}
        </motion.span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-primary/60 to-transparent" />
        <span className="text-muted-foreground font-mono text-[10px]">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default HeroCarousel;
