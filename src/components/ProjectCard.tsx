import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Project } from "@/data/categories";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Generate thumbnail from video first frame
  useEffect(() => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = project.videoPreview;
    video.muted = true;
    video.preload = 'metadata';
    
    video.onloadeddata = () => {
      video.currentTime = 1; // Seek to 1 second for better frame
    };
    
    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setThumbnailUrl(canvas.toDataURL('image/jpeg', 0.8));
        }
      } catch (e) {
        // CORS might block this, fall back to video preview
        console.log('Could not generate thumbnail, using video preview');
      }
    };

    return () => {
      video.src = '';
    };
  }, [project.videoPreview]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && isVideoLoaded) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    if (isHovering && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-sm futuristic-card transition-all duration-500 hover:scale-[1.02]"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm z-0" />
      
      {/* Thumbnail / Video Preview */}
      <div className="relative aspect-video overflow-hidden bg-card">
        {/* Thumbnail image or video first frame */}
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover grayscale contrast-110 brightness-90 transition-all duration-700 ${
              isHovering ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />
        ) : (
          <video
            src={project.videoPreview}
            className={`absolute inset-0 w-full h-full object-cover grayscale contrast-110 brightness-90 transition-all duration-700 ${
              isHovering ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            muted
            playsInline
            preload="metadata"
          />
        )}
        
        {/* Hover video preview */}
        <video
          ref={videoRef}
          src={project.videoPreview}
          className={`absolute inset-0 w-full h-full object-cover grayscale contrast-110 transition-all duration-700 ${
            isHovering ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoaded}
        />
        
        {/* Loading indicator */}
        {!thumbnailUrl && !isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        
        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-background/50 transition-all duration-500 ${
          isHovering ? "opacity-0" : "opacity-100"
        }`}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
            <div className="relative w-14 h-14 rounded-full border border-primary/30 bg-background/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-primary ml-0.5" />
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
        
        {/* Year badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-background/60 backdrop-blur-sm border border-border/30 rounded-sm">
          <span className="text-xs text-primary font-mono">{project.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 bg-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-primary font-medium uppercase tracking-[0.2em]">
            {project.client}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary/50" />
            <span className="text-xs text-muted-foreground">30s preview</span>
          </div>
        </div>
        <h3 className="font-display text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Hidden canvas for thumbnail generation */}
      <canvas ref={canvasRef} className="hidden" />
    </article>
  );
};

export default ProjectCard;
