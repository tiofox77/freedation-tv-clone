import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const clients = [
  "BAI", "UNITEL", "SONANGOL", "BIC", "BDA", "AGT",
  "BODIVA", "DST", "Mega Africa", "Refriango",
];

const ClientsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-8 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 gradient-cinematic" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px] animate-pulse" />
        </div>
        <div className="absolute inset-0 scanline" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-[11px] text-primary font-mono uppercase tracking-[0.4em]">
              Nossos Clientes
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-5xl lg:text-8xl xl:text-9xl text-foreground leading-[0.9] max-w-4xl text-shadow-glow"
          >
            Marcas que
            <br />
            <span className="text-primary">confiam</span> em nós
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-foreground/50 text-base lg:text-lg max-w-lg mt-6 leading-relaxed"
          >
            Ao longo dos anos, tivemos o privilégio de trabalhar com algumas das maiores
            marcas e instituições de Angola.
          </motion.p>
        </div>
      </section>

      {/* Clients Grid */}
      <section ref={ref} className="relative py-24 px-8 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-border/20">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="relative bg-background group cursor-default"
              >
                <div className="aspect-square flex flex-col items-center justify-center p-6 transition-all duration-500 hover:bg-card/60">
                  {/* Number */}
                  <span className="absolute top-4 left-4 text-[9px] font-mono text-muted-foreground/20 group-hover:text-primary/30 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Client name as logo */}
                  <span className="font-display text-2xl lg:text-3xl text-foreground/40 group-hover:text-foreground group-hover:text-shadow-glow transition-all duration-500 text-center leading-tight">
                    {client}
                  </span>

                  {/* Accent line */}
                  <div className="w-0 group-hover:w-8 h-[1px] bg-primary mt-4 transition-all duration-500" />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/0 group-hover:border-primary/30 transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/0 group-hover:border-primary/30 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio link */}
      <section className="relative py-16 px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-[11px] text-primary font-mono uppercase tracking-[0.3em]">
              Portfólio
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => navigate("/categoria/demo-reel")}
            className="group cursor-pointer futuristic-card p-8 lg:p-12 transition-all duration-500 hover:border-primary/30"
          >
            <h3 className="font-display text-3xl lg:text-5xl text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
              PORTIFOLIO (DEMO REEL) – FREEDATION
            </h3>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em] group-hover:text-primary/70 transition-colors">
                Ver projecto
              </span>
              <div className="w-6 h-[1px] bg-foreground/20 group-hover:w-10 group-hover:bg-primary transition-all duration-500" />
              <ArrowRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-32 px-8 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[200px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
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
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl lg:text-7xl text-foreground leading-[0.9] mb-8"
          >
            Let's do something
            <br />
            <span className="text-primary text-shadow-glow">great</span> together!
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 px-10 py-4 mx-auto border border-primary/50 text-foreground font-mono text-sm uppercase tracking-[0.25em] hover:bg-primary hover:text-background hover:border-primary transition-all duration-500 backdrop-blur-sm"
          >
            Entre em contacto
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
};

export default ClientsPage;
