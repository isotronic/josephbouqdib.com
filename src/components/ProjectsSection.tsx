import * as React from "react";
import { FaGithub, FaRegFolder, FaGooglePlay } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

import AnimatedSection from "./AnimatedSection";
import splashScreenImage from "../images/splash.png";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  playStoreUrl?: string;
  liveUrl?: string;
  image?: string;
}

const featuredProject: Project = {
  title: "MuscleQuest",
  description:
    "MuscleQuest is a sleek workout tracker designed for fitness enthusiasts to easily manage their routines and track progress. Built with React Native, it lets users create workout plans, log sets and reps, and track active sessions. With local-first storage, your data is always accessible on your device, while Firebase securely handles authentication. MuscleQuest also offers detailed workout history and performance stats, making it the perfect tool to elevate your fitness journey.",
  tags: ["TypeScript", "React Native", "Expo", "SQLite", "Tanstack Query", "Zustand"],
  githubUrl: "https://github.com/isotronic/musclequest",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.isotronic.musclequest",
  liveUrl: "https://musclequest.app/",
  image: splashScreenImage,
};

const projects: Project[] = [
  {
    title: "Portfolio website",
    description:
      "This is my portfolio website, built with React and Tailwind CSS. You're looking at it right now, so feel free to explore.",
    tags: ["TypeScript", "React", "Tailwind CSS", "Gatsby"],
    githubUrl: "https://github.com/isotronic/josephbouqdib.com",
  },
  {
    title: "Full-stack blog",
    description:
      "A blog application built with React and Bootstrap, and a backend API running on Node.js with Express and MongoDB.",
    tags: ["React", "Bootstrap", "Express", "MongoDB"],
    githubUrl: "https://github.com/isotronic/react-blog",
  },
  {
    title: "Food Finder App",
    description: "This is a web app that helps users find nearby restaurants based on their preferences and location.",
    tags: ["TypeScript", "React", "Firebase", "Maps API"],
    githubUrl: "https://github.com/isotronic/food-finder-app",
  },
  {
    title: "HTTP/1.1 Server",
    description:
      "A very simple http server written in Python that can serve concurrent connections, save/read a string to/from a file, read headers, echo the body, handle gzip compression.",
    tags: ["Python", "Socket", "Threading"],
    githubUrl: "https://github.com/isotronic/http-server-python",
  },
  {
    title: "Python Shell",
    description:
      "A POSIX-compliant shell that can interpret shell commands, run external programs and has some built-in commands like cd, pwd, echo and type.",
    tags: ["Python"],
    githubUrl: "https://github.com/isotronic/shell-python/",
  },
  {
    title: "Billboard to Spotify Playlist Generator",
    description:
      "This Python script fetches the Billboard Hot 100 chart for a specified date, and creates a private Spotify playlist containing the top 100 songs from that date.",
    tags: ["Python", "BeautifulSoup", "Spotipy"],
    githubUrl: "https://github.com/isotronic/top100-music-time-machine",
  },
  {
    title: "Movie Rating and Review",
    description:
      "This Flask web application allows users to rate, review, and manage their favourite movies. Users can also add new movies, which are automatically fetched from The Movie Database (TMDb) using their API.",
    tags: ["Python", "Flask", "Bootstrap", "SQLite"],
    githubUrl: "https://github.com/isotronic/top-10-movies-website",
  },
  {
    title: "Amazon Reviews Fetcher",
    description:
      "This script fetches Amazon reviews for a list of Amazon Standard Identification Numbers (ASINs) using the Oxylabs API and saves them into CSV files.",
    tags: ["Python"],
    githubUrl: "https://github.com/isotronic/data-analysis",
  },
  {
    title: "Eva Schindele",
    description:
      "Website for Dr. Eva Schindele, a distinguished author and journalist specialising in social sciences.",
    tags: ["WordPress", "Elementor"],
    liveUrl: "https://eva-schindele.de",
  },
  {
    title: "Bublitz",
    description: "Website for Bublitz gGmbH, an artist and curator initiative that blends art and cultural history.",
    tags: ["WordPress", "SiteOrigin"],
    liveUrl: "https://bublitz.org/en/",
  },
  {
    title: "Norddeutsches Bauleitkontor",
    description:
      "Website for Norddeutsches Bauleitkontor GmbH, a firm specialising in planning, construction management and supervision.",
    tags: ["WordPress", "Elementor"],
    liveUrl: "https://bauleitkontor.de",
  },
];

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  playStoreUrl?: string;
  liveUrl?: string;
  image?: string;
}

const FeaturedProject: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  githubUrl,
  playStoreUrl,
  liveUrl,
  image,
}) => {
  return (
    <div className="flex flex-col rounded-lg bg-slate-800 p-4 shadow-md sm:p-6 lg:flex-row lg:items-center">
      <div className="order-2 lg:order-1 lg:w-2/3">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-green-500">{title}</h3>
          <div className="flex space-x-6 text-4xl text-green-500">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
            )}
            {playStoreUrl && (
              <a href={playStoreUrl} target="_blank" rel="noreferrer" aria-label="Play Store">
                <FaGooglePlay />
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" aria-label="Live site">
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>

        <p className="mt-4 text-lg text-slate-400">{description}</p>

        <div className="text-md mt-4 flex flex-wrap text-slate-200">
          {tags.map((tag, index) => (
            <span key={index} className="mb-2 mr-2 rounded-md bg-slate-600 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="order-1 mb-6 lg:order-2 lg:mb-0 lg:ml-6 lg:w-1/3">
        <div className="flex w-full items-center justify-center rounded-lg bg-gray-700">
          {image && <img src={image} alt="MuscleQuest Logo" className="h-full w-full rounded-lg object-cover" />}
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, githubUrl, liveUrl }) => {
  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-md md:p-6">
      <div className="flex items-center justify-between">
        <div className="text-4xl text-green-500">
          <FaRegFolder />
        </div>
        <div className="flex space-x-4 text-3xl text-green-500">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" aria-label="Live site">
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-slate-400">{description}</p>
      <div className="-mb-2 -ml-2 mt-4 flex flex-wrap text-slate-200">
        {tags.map((tag, index) => (
          <span key={index} className="mb-2 ml-2 rounded-md bg-slate-600 px-3 py-1 text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <AnimatedSection id="projects" className="mx-auto mt-60 max-w-6xl lg:px-0">
      <h2 className="text-center text-3xl font-semibold">Projects</h2>
      <p className="mt-4 text-center">This is a selection of freelance and personal projects I have worked on.</p>

      <div className="mt-12">
        <FeaturedProject {...featuredProject} />
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
