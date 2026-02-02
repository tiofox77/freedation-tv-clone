import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <video
          ref={videoRef}
          src={category.heroVideo}
          className="absolute inset-0 w-full h-full object-cover grayscale"
          loop
          muted
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-24 left-6 lg:left-12 z-10 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl">
            <span className="text-primary font-medium uppercase tracking-widest text-sm">
              {category.subtitle}
            </span>
            <h1 className="font-display text-6xl lg:text-8xl text-foreground mt-2">
              {category.title}
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl mt-4 max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 lg:px-12 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-3xl text-foreground">
            Projetos
            <span className="text-muted-foreground ml-3 text-xl">
              ({category.projects.length})
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {category.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="px-6 lg:px-12 py-16 border-t border-border">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/categoria/${prevCategory.slug}`)}
            className="group flex flex-col items-start"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Anterior
            </span>
            <span className="font-display text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors">
              {prevCategory.title}
            </span>
          </button>

          <button
            onClick={() => navigate(`/categoria/${nextCategory.slug}`)}
            className="group flex flex-col items-end"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Próximo
            </span>
            <span className="font-display text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors">
              {nextCategory.title}
            </span>
          </button>
        </div>
      </section>

      <div className="h-20" /> {/* Footer spacing */}
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
