import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-8 lg:px-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left */}
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

        {/* Right */}
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            A Free Dation é uma premiada produtora Audiovisual, especializada em filmes publicitários para marcas, produtos, institucionais, corporativos, entretenimento e Gestão de redes sociais.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-foreground/50 leading-relaxed"
          >
            Estamos no mercado a mais de oito(8) anos, oferecemos os mais variados serviços no ramo audiovisual, desde a concepção da ideia, passando pela filmagem, fotografia, produção, até a finalização. Para tal, dispomos de uma equipa qualificada e competente, além de um leque de colaboradores reconhecidos no mercado, o que nos permite oferecer resultados à medida das necessidades de cada cliente, seja na área de Cinema, publicidade, corporativo e institucional.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-primary to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="border-l-2 border-primary/40 pl-6 py-2">
              <p className="text-xs text-primary font-mono uppercase tracking-[0.2em] mb-2">Nossa Visão</p>
              <p className="text-foreground/60 leading-relaxed text-sm">
                Ser a produtora audiovisual líder, reconhecida por sua criatividade, energia e inovação, conectando empresas e a juventude por meio de conteúdos audiovisuais impactantes e inspiradores.
              </p>
            </div>

            <div className="border-l-2 border-primary/40 pl-6 py-2">
              <p className="text-xs text-primary font-mono uppercase tracking-[0.2em] mb-2">Nossa Missão</p>
              <p className="text-foreground/60 leading-relaxed text-sm">
                Criar experiências audiovisuais únicas e memoráveis, utilizando nossa energia criativa e jovial para conectar empresas. Através da inovação constante, buscamos produzir conteúdos que transmitam mensagens inspiradoras, capturando a essência das marcas e motivando a audiência.
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-foreground/40 leading-relaxed text-sm"
          >
            Estamos comprometidos em impulsionar a transformação digital e promover o engajamento através de produções audiovisuais autênticas e impactantes. Nosso objetivo é ser uma parceira confiável para empresas em busca de soluções audiovisuais diferenciadas.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
