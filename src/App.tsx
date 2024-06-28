import NavBar from "./components/NavBar";
import SocialLinks from "./components/SocialLinks";
import IntroSection from "./components/IntroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <SocialLinks />
      <main className="container mx-auto">
        <IntroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
