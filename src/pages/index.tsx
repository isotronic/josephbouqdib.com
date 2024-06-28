import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import NavBar from "../components/NavBar";
import SocialLinks from "../components/SocialLinks";
import IntroSection from "../components/IntroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

import Favicon from "../images/favicon.png";

const IndexPage: React.FC<PageProps> = () => {
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

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Joseph Bouqdib</title>
    <link rel="icon" type="image/svg+xml" href={Favicon} />
  </>
);
