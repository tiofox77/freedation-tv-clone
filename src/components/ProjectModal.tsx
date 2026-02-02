import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/data/categories";

interface ProjectModalProps {
  project: Project;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

const ProjectModal = ({ project, projects, onClose, onNavigate }: ProjectModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentIndex = projects.findIndex((p) => p.id === project.id);

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onNavigate(projects[prevIndex]);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    onNavigate(projects[nextIndex]);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [currentIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [project]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full border border-border bg-card/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
        aria-label="Fechar"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 carousel-nav-button"
        aria-label="Projeto anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 carousel-nav-button"
        aria-label="Próximo projeto"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-40 w-full max-w-6xl mx-4 lg:mx-8">
        {/* Video */}
        <div
          className="relative aspect-video rounded-lg overflow-hidden shadow-2xl cursor-pointer"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={project.video}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {project.client} • {project.year}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-foreground mt-2">
            {project.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>

        {/* Project counter */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((p, index) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground"
              }`}
              aria-label={`Ir para projeto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
