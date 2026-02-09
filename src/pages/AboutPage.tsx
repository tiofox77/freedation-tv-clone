import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutServices from "@/components/about/AboutServices";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCTA from "@/components/about/AboutCTA";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutServices />
      <AboutTeam />
      <AboutCTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
