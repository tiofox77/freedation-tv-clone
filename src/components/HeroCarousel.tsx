import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";
import slide4 from "@/assets/slide-4.jpg";
import slide5 from "@/assets/slide-5.jpg";

interface Slide {
  id: number;
  image: string;
  category: string;
  title: string;
}

const slides: Slide[] = [
  { id: 1, image: slide1, category: "Demo Reel", title: "1-Demo Reel" },
  { id: 2, image: slide2, category: "Institucional", title: "2-Corporativos" },
  { id: 3, image: slide3, category: "Publicidade", title: "3-Publicidade" },
  { id: 4, image: slide4, category: "Demo Reel, Video Clips", title: "4-Video Clips" },
  { id: 5, image: slide5, category: "Making Off", title: "5-Making Off" },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getSlidePosition = (index: number) => {
    const diff = index - currentSlide;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(slides.length - 1)) return "right";
    if (diff === -1 || diff === slides.length - 1) return "left";
    if (diff > 1) return "far-right";
    return "far-left";
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* Main carousel container */}
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
                  ? "z-20 w-[25%] h-[60%] -translate-x-[140%] opacity-60"
                  : position === "right"
                  ? "z-20 w-[25%] h-[60%] translate-x-[140%] opacity-60"
                  : position === "far-left"
                  ? "z-10 w-[20%] h-[50%] -translate-x-[280%] opacity-30"
                  : "z-10 w-[20%] h-[50%] translate-x-[280%] opacity-30"
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                <div className="absolute inset-0 gradient-overlay" />
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
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="carousel-nav-button absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom category navigation */}
      <div className="absolute bottom-24 left-0 right-0 z-40">
        <div className="flex items-end justify-center gap-8 lg:gap-16 px-4 overflow-x-auto">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`flex flex-col items-center transition-all duration-500 min-w-fit ${
                index === currentSlide
                  ? "opacity-100 scale-110"
                  : "opacity-40 scale-100 hover:opacity-70"
              }`}
            >
              <span className="text-xs lg:text-sm text-muted-foreground mb-1">
                {slide.category}
              </span>
              <span
                className={`font-display text-2xl lg:text-4xl xl:text-5xl transition-colors ${
                  index === currentSlide ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {slide.title}
              </span>
              {index === currentSlide && (
                <span className="text-sm text-muted-foreground mt-2 hover:text-primary cursor-pointer transition-colors">
                  Explore
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
