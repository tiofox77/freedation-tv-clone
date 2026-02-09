import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const COLOR_GRADING_URL = "https://freedation.com/wp-content/uploads/2023/07/COLOR-GADING-FREE-DATION-01.mp4";

const AboutColorGrading = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 px-8 lg:px-20 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[180px]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-[11px] text-primary font-mono uppercase tracking-[0.3em]">
                04. Color Grading
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-display text-4xl lg:text-5xl text-foreground leading-[0.95]"
            >
              Color <span className="text-primary">Grading</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 flex items-end"
          >
            <p className="text-foreground/50 leading-relaxed">
              Clique no vídeo para ver o antes e depois do processo de color correction e color grading.
            </p>
          </motion.div>
        </div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-sm overflow-hidden hero-slide-active">
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-primary/40 z-20" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/40 z-20" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/40 z-20" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-primary/40 z-20" />

            <video
              src={COLOR_GRADING_URL}
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

export default AboutColorGrading;
