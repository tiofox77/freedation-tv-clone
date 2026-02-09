import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const galleryImages = [
  { src: "https://freedation.com/wp-content/uploads/2023/07/IMG_1619.png", alt: "Making Of - Bastidores 1" },
  { src: "https://freedation.com/wp-content/uploads/2023/07/C0432T01.png", alt: "Making Of - Bastidores 2" },
  { src: "https://freedation.com/wp-content/uploads/2023/07/C0343T01.png", alt: "Making Of - Bastidores 3" },
  { src: "https://freedation.com/wp-content/uploads/2023/07/C0170T01.png", alt: "Making Of - Bastidores 4" },
  { src: "https://freedation.com/wp-content/uploads/2023/07/C0167T01.png", alt: "Making Of - Bastidores 5" },
  { src: "https://freedation.com/wp-content/uploads/2023/07/C0071T01.png", alt: "Making Of - Bastidores 6" },
  { src: "https://freedation.com/wp-content/uploads/2023/07/C0014T01.png", alt: "Making Of - Bastidores 7" },
  { src: "https://freedation.com/wp-content/uploads/2023/07/C0012T011.png", alt: "Making Of - Bastidores 8" },
];

const AboutGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-32 px-8 lg:px-20 overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan-accent/3 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-[11px] text-primary font-mono uppercase tracking-[0.3em]">
              01. Making Of
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-4xl lg:text-6xl text-foreground leading-[0.95]"
          >
            Por trás das <span className="text-primary">câmeras</span>
          </motion.h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + index * 0.06, duration: 0.5 }}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => setLightboxIndex(index)}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-square" : "aspect-video"}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover grayscale-[0.6] contrast-110 brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/0 transition-all duration-500" />

                {/* Number */}
                <span className="absolute top-3 left-3 text-[10px] font-mono text-primary/0 group-hover:text-primary/60 transition-all duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Corner accents */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightboxIndex(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-sm"
          />
          <div className="absolute top-6 right-8 text-muted-foreground font-mono text-sm">
            {String(lightboxIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
          </div>
          <button
            className="absolute top-6 left-8 text-foreground/60 hover:text-primary font-mono text-xs uppercase tracking-widest transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            Fechar ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default AboutGallery;
