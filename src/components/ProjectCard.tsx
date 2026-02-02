import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Project } from "@/data/categories";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-card transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail / Video Preview */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-500 ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          src={project.video}
          className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-500 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="metadata"
        />
        
        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-background/40 transition-opacity duration-300 ${
          isHovering ? "opacity-0" : "opacity-100 group-hover:opacity-0"
        }`}>
          <div className="w-16 h-16 rounded-full border-2 border-foreground/50 flex items-center justify-center">
            <Play className="w-6 h-6 text-foreground/80 ml-1" />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {project.client}
          </span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="font-display text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;
