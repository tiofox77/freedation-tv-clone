import { motion } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";

const DEMO_REEL_URL = "https://freedation.com/wp-content/uploads/2023/07/Free-Dation-Demo-Reel-2023-Site-1.mp4";

const AboutHero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-cinematic" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[180px] animate-pulse" />
      </div>
      <div className="absolute inset-0 scanline" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-[11px] text-primary font-mono uppercase tracking-[0.4em]">
            Quem Somos
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-6xl lg:text-9xl text-foreground leading-[0.9] mb-2 text-shadow-glow"
        >
          FREE <span className="text-primary">DATION</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-muted-foreground text-lg uppercase tracking-[0.3em] font-mono mb-12"
        >
          Produtora Audiovisual
        </motion.p>

        {/* Demo Reel Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-sm overflow-hidden hero-slide-active">
            {/* HUD corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-primary/40 z-20" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/40 z-20" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/40 z-20" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-primary/40 z-20" />

            <video
              src={DEMO_REEL_URL}
              controls
              preload="metadata"
              className="w-full aspect-video object-cover"
              controlsList="nodownload"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
