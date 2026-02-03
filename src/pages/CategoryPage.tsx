import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoryBySlug, categories, Project } from "@/data/categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const category = getCategoryBySlug(slug || "");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    setIsLoaded(false);
    setTimeout(() => setIsLoaded(true), 100);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-cinematic">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">
            Categoria não encontrada
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  // Get adjacent categories for navigation
  const currentIndex = categories.findIndex((c) => c.slug === slug);
  const prevCategory = categories[(currentIndex - 1 + categories.length) % categories.length];
  const nextCategory = categories[(currentIndex + 1) % categories.length];

  return (
    <div className="min-h-screen gradient-cinematic">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-accent/5 rounded-full blur-[100px]" />
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline z-[5]" />

        <video
          ref={videoRef}
          src={category.heroVideo}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-75"
          loop
          muted
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-28 left-6 lg:left-12 z-20 flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-sm border border-border/50 bg-card/30 backdrop-blur-sm flex items-center justify-center group-hover:border-primary/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm uppercase tracking-[0.2em]">Voltar</span>
        </button>

        {/* Hero content */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 lg:p-12 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-primary to-transparent" />
              <span className="text-primary font-medium uppercase tracking-[0.3em] text-sm">
                {category.subtitle}
              </span>
            </div>
            <h1 className="font-display text-6xl lg:text-8xl xl:text-9xl text-foreground text-shadow-glow">
              {category.title}
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-24 left-6 lg:left-12 w-20 h-20 border-l border-t border-primary/20 pointer-events-none" />
        <div className="absolute bottom-6 right-6 lg:right-12 w-20 h-20 border-r border-b border-primary/20 pointer-events-none" />
      </section>

      {/* Projects Grid */}
      <section className="relative px-6 lg:px-12 py-20">
        {/* Section header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-6">
            <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent" />
            <div>
              <h2 className="font-display text-4xl text-foreground">
                Projetos
              </h2>
              <span className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
                {category.projects.length} trabalhos
              </span>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 transition-all duration-1000 delay-300 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          {category.projects.map((project, index) => (
            <div
              key={project.id}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="relative px-6 lg:px-12 py-20 border-t border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/categoria/${prevCategory.slug}`)}
            className="group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-sm border border-border/50 bg-card/30 backdrop-blur-sm flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-1">
                Anterior
              </span>
              <span className="font-display text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors">
                {prevCategory.title}
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate(`/categoria/${nextCategory.slug}`)}
            className="group flex items-center gap-4"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-1">
                Próximo
              </span>
              <span className="font-display text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors">
                {nextCategory.title}
              </span>
            </div>
            <div className="w-12 h-12 rounded-sm border border-border/50 bg-card/30 backdrop-blur-sm flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        </div>
      </section>

      <div className="h-12" />
      <Footer />

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          projects={category.projects}
          onClose={() => setSelectedProject(null)}
          onNavigate={(project) => setSelectedProject(project)}
        />
      )}
    </div>
  );
};

export default CategoryPage;
