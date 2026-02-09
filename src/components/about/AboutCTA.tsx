import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="relative py-40 px-8 lg:px-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-[1px] bg-primary" />
          <span className="text-[11px] text-primary font-mono uppercase tracking-[0.3em]">
            Próximo Passo
          </span>
          <div className="w-8 h-[1px] bg-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-display text-5xl lg:text-8xl text-foreground leading-[0.9] mb-8"
        >
          Tem um projecto
          <br />
          em <span className="text-primary text-shadow-glow">mente</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-foreground/50 text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Vamos transformar a sua ideia numa experiência visual inesquecível.
          Entre em contacto connosco.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 px-10 py-4 border border-primary/50 text-foreground font-mono text-sm uppercase tracking-[0.25em] hover:bg-primary hover:text-background hover:border-primary transition-all duration-500 backdrop-blur-sm"
          >
            Ver Portfólio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group flex items-center gap-3 text-foreground/50 font-mono text-xs uppercase tracking-[0.2em] hover:text-primary transition-colors duration-300">
            Contactar
            <div className="w-6 h-[1px] bg-foreground/30 group-hover:w-10 group-hover:bg-primary transition-all duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
