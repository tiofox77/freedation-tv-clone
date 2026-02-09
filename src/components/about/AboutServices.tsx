import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Tv, Music, Camera, Clapperboard, Sparkles } from "lucide-react";

const services = [
  {
    icon: Clapperboard,
    title: "Produção Cinematográfica",
    description: "Filmes publicitários, corporativos e institucionais com qualidade de cinema.",
  },
  {
    icon: Film,
    title: "Pós-Produção",
    description: "Edição, color grading, VFX e motion graphics para resultados impecáveis.",
  },
  {
    icon: Music,
    title: "Video Clips",
    description: "Criação visual para artistas com narrativa forte e estética única.",
  },
  {
    icon: Camera,
    title: "Documentários",
    description: "Histórias reais contadas com sensibilidade e profundidade visual.",
  },
  {
    icon: Tv,
    title: "Conteúdo Digital",
    description: "Conteúdos optimizados para redes sociais e plataformas digitais.",
  },
  {
    icon: Sparkles,
    title: "Direção Criativa",
    description: "Conceção visual e direção artística do conceito à entrega final.",
  },
];

const AboutServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 px-8 lg:px-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/4 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-[11px] text-primary font-mono uppercase tracking-[0.3em]">
              O Que Fazemos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-4xl lg:text-6xl text-foreground leading-[0.95]"
          >
            Serviços de <span className="text-primary">Excelência</span>
          </motion.h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border/30">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
                className="relative bg-background p-10 group cursor-default hover:bg-card/80 transition-colors duration-500"
              >
                {/* Number */}
                <span className="absolute top-6 right-6 text-[10px] font-mono text-muted-foreground/30 group-hover:text-primary/30 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Icon className="w-6 h-6 text-primary/60 mb-6 group-hover:text-primary transition-colors duration-500" />

                <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Corner accents on hover */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
