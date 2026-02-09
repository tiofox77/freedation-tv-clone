import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "150+", label: "Projetos Realizados", accent: true },
  { value: "8+", label: "Anos de Experiência", accent: false },
  { value: "50+", label: "Clientes Satisfeitos", accent: false },
  { value: "12", label: "Profissionais Criativos", accent: true },
];

const AboutStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 px-8 lg:px-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative text-center py-10 group"
            >
              {/* Vertical divider */}
              {index > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
              )}

              <span className={`font-display text-5xl lg:text-7xl leading-none ${
                stat.accent ? "text-primary text-shadow-glow" : "text-foreground"
              }`}>
                {stat.value}
              </span>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-4 font-mono">
                {stat.label}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary/20 group-hover:bg-primary/60 group-hover:w-12 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
