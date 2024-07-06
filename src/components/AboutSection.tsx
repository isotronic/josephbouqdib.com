import * as React from "react";

import AnimatedSection from "./AnimatedSection";

import ProfilePic from "../images/profile-pic.png";

const AboutSection: React.FC = () => {
  return (
    <>
      <AnimatedSection
        id="about"
        className="mx-auto mb-12 flex max-w-6xl flex-col px-12 md:flex-row lg:items-center lg:px-0"
      >
        <div className="flex w-full justify-center md:w-1/3">
          <img
            src={ProfilePic}
            alt="Profile Picture"
            className="mx-auto h-80 w-80 rounded-full object-cover sm:h-56 sm:w-56 lg:h-80 lg:w-80"
          />
        </div>
        <div className="mt-8 w-full space-y-10 text-left md:mt-0 md:w-2/3 md:pl-12">
          <h2 className="text-3xl font-semibold">About Me</h2>
          <p>
            Hello! My name is Joseph Bouqdib, and I am a self-taught web developer with a passion for creating beautiful
            and functional websites and apps.
          </p>
          <p>
            My journey in web development began with learning HTML, CSS, and PHP while working for a small company
            alongside two other developers. After a break from tech, I started building and managing websites using
            WordPress for some time. However, I eventually wanted to get back to the freedom of coding from scratch
            without any constraints, which led me to first explore Python for writing scripts and then React and Node.js
            for creating complete websites and apps. I am constantly striving to improve myself and enjoy learning about
            new technologies.
          </p>
          <p>Some of the technologies I've worked with:</p>
          <ul className="grid list-inside list-disc grid-cols-2 gap-2 font-semibold marker:text-green-500">
            <li>TypeScript</li>
            <li>Python</li>
            <li>React (Native)</li>
            <li>Express.js</li>
            <li>Node.js</li>
            <li>Firebase</li>
            <li>MongoDB</li>
            <li>SQL</li>
          </ul>
        </div>
      </AnimatedSection>
    </>
  );
};

export default AboutSection;
