import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/data/categories";
import VideoPlayer from "./VideoPlayer";

interface ProjectModalProps {
  project: Project;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

const ProjectModal = ({ project, projects, onClose, onNavigate }: ProjectModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const currentIndex = projects.findIndex((p) => p.id === project.id);

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onNavigate(projects[prevIndex]);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    onNavigate(projects[nextIndex]);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [currentIndex]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isClosing ? "opacity-0" : "opacity-100"
    }`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 gradient-cinematic backdrop-blur-xl"
        onClick={handleClose}
      />

      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-sm border border-border/50 bg-card/50 backdrop-blur-md flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 group"
        aria-label="Fechar"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 carousel-nav-button"
        aria-label="Projeto anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 carousel-nav-button"
        aria-label="Próximo projeto"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className={`relative z-40 w-full max-w-6xl mx-4 lg:mx-8 transition-all duration-500 ${
        isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}>
        {/* Video Player */}
        <div className="relative rounded-sm overflow-hidden glow-border">
          <VideoPlayer
            key={project.id}
            src={project.video}
            title={project.title}
            autoPlay
          />
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-sm text-primary font-medium uppercase tracking-[0.3em]">
              {project.client}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/50" />
            <span className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
              {project.year}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <h2 className="font-display text-4xl lg:text-6xl text-foreground text-shadow-glow">
            {project.title}
          </h2>
          
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project counter */}
        <div className="mt-8 flex justify-center gap-3">
          {projects.map((p, index) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p)}
              className={`h-[2px] transition-all duration-500 ${
                index === currentIndex
                  ? "w-10 bg-gradient-to-r from-primary to-gold-glow"
                  : "w-4 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Ir para projeto ${index + 1}`}
            />
          ))}
        </div>

        {/* Keyboard hints */}
        <div className="mt-6 flex justify-center gap-6 text-xs text-muted-foreground/50 uppercase tracking-wider">
          <span>← → Navegar</span>
          <span>Espaço Play/Pause</span>
          <span>ESC Fechar</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
