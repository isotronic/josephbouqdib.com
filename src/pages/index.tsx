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
    <title>Joseph Bouqdib - Full-Stack Developer</title>
    <meta
      name="description"
      content="I am a full-stack developer, passionate about creating outstanding digital experiences. Currently, I am
          focusing on developing web and mobile applications using React (Native) and Node.js."
    />
    <link rel="canonical" href="https://joseph.bouqdib.com" />
    <link rel="icon" type="image/svg+xml" href={Favicon} />
    <meta property="og:title" content="Joseph Bouqdib - Full-Stack Developer" />
    <meta
      property="og:description"
      content="I am a full-stack developer, passionate about creating outstanding digital experiences. Currently, I am
          focusing on developing web and mobile applications using React (Native) and Node.js."
    />
    <meta property="og:image" content={Favicon} />
    <meta property="og:url" content="https://joseph.bouqdib.com/" />
    <meta name="twitter:image" content={Favicon} />
  </>
);
