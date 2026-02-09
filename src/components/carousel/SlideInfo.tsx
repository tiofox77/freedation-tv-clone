import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Slide } from "../HeroCarousel";

interface SlideInfoProps {
  slide: Slide;
  onExplore: () => void;
}

const SlideInfo = ({ slide, onExplore }: SlideInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-28 left-8 lg:left-14 z-40 pointer-events-none"
    >
      {/* Number accent */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.08, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute -left-2 -top-8 font-display text-[120px] lg:text-[160px] text-foreground leading-none select-none"
      >
        {slide.number}
      </motion.span>

      {/* Category tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-3 mb-3"
      >
        <div className="w-8 h-[1px] bg-primary" />
        <span className="text-[11px] text-primary font-mono uppercase tracking-[0.3em]">
          {slide.category}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-display text-4xl lg:text-6xl xl:text-7xl text-foreground mb-4 text-shadow-glow leading-[0.95]"
      >
        {slide.title}
      </motion.h2>

      {/* Explore button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        onClick={onExplore}
        className="pointer-events-auto group flex items-center gap-3 mt-2"
      >
        <span className="text-xs text-foreground/60 uppercase tracking-[0.25em] group-hover:text-primary transition-colors duration-300 font-mono">
          Explorar
        </span>
        <div className="w-8 h-[1px] bg-foreground/30 group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
        <ArrowRight className="w-3.5 h-3.5 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
      </motion.button>
    </motion.div>
  );
};

export default SlideInfo;
