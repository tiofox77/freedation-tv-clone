import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutGallery from "@/components/about/AboutGallery";
import AboutTeam from "@/components/about/AboutTeam";
import AboutColorGrading from "@/components/about/AboutColorGrading";
import AboutCTA from "@/components/about/AboutCTA";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutGallery />
      <AboutTeam />
      <AboutColorGrading />
      <AboutCTA />
      <div className="h-16" />
    </div>
  );
};

export default AboutPage;
