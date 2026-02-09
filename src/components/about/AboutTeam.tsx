import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const team = [
  { name: "Carlos Mendes", role: "Diretor Criativo", image: team1 },
  { name: "Ana Ferreira", role: "Produtora Executiva", image: team2 },
  { name: "Tomás Silva", role: "Diretor de Fotografia", image: team3 },
];

const AboutTeam = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 px-8 lg:px-20 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-accent/3 rounded-full blur-[180px]" />

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
              A Equipa
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-4xl lg:text-6xl text-foreground leading-[0.95]"
          >
            Rostos por trás
            <br />
            da <span className="text-primary">câmera</span>
          </motion.h2>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
              className="group relative"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[0.7] contrast-110 brightness-[0.85] group-hover:grayscale-[0.3] group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Frame */}
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 transition-all duration-500 rounded-sm" />

                {/* HUD corners */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/0 group-hover:border-primary/50 transition-all duration-500" />

                {/* Number */}
                <span className="absolute top-4 right-4 text-[10px] font-mono text-primary/0 group-hover:text-primary/40 transition-all duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Info */}
              <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1 font-mono">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
