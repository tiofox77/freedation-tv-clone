import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";

const AboutHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={aboutHero}
          alt="Freedation production studio"
          className="w-full h-full object-cover grayscale-[0.6] contrast-125 brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Scanline */}
      <div className="absolute inset-0 scanline" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-32 px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute left-8 lg:left-20 bottom-20 font-display text-[200px] lg:text-[300px] text-foreground leading-none select-none pointer-events-none"
        >
          FD
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-[11px] text-primary font-mono uppercase tracking-[0.4em]">
            Sobre Nós
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="font-display text-5xl lg:text-8xl xl:text-9xl text-foreground leading-[0.9] max-w-4xl text-shadow-glow"
        >
          Criamos
          <br />
          <span className="text-primary">Visões</span> que
          <br />
          Inspiram
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-foreground/50 text-base lg:text-lg max-w-lg mt-6 leading-relaxed"
        >
          Uma produtora audiovisual que transforma ideias em experiências
          cinematográficas únicas e memoráveis.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default AboutHero;
