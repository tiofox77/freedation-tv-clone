import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-8 lg:px-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left - Label */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8 sticky top-32"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-[11px] text-primary font-mono uppercase tracking-[0.3em]">
              Nossa História
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-4xl lg:text-6xl text-foreground leading-[0.95] sticky top-44"
          >
            Mais do que
            <br />
            produção.
            <br />
            <span className="text-primary">Arte visual.</span>
          </motion.h2>
        </div>

        {/* Right - Content */}
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            A Freedation nasceu da paixão por contar histórias através da linguagem
            cinematográfica. Somos uma produtora audiovisual baseada em Angola, dedicada
            a criar conteúdos que ultrapassam o convencional.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-foreground/50 leading-relaxed"
          >
            Desde vídeos corporativos e publicidade até videoclipes e documentários,
            cada projeto é tratado como uma obra única. Combinamos tecnologia de ponta
            com visão artística para entregar resultados que não só comunicam, mas
            emocionam.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-foreground/50 leading-relaxed"
          >
            A nossa equipa é composta por profissionais apaixonados — realizadores,
            cineastas, editores e criativos — que partilham uma visão comum: elevar
            o padrão da produção audiovisual em África e no mundo.
          </motion.p>

          {/* Divider accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-primary to-transparent"
          />

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="border-l-2 border-primary/40 pl-6 py-2"
          >
            <p className="text-foreground/80 italic text-lg font-light">
              "Cada frame é uma oportunidade de criar algo extraordinário."
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
