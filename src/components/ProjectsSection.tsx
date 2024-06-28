import { FaGithub, FaRegFolder } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

import AnimatedSection from "./AnimatedSection";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Portfolio website",
    description:
      "This is my portfolio website, built with React and Tailwind CSS.",
    tags: ["TypeScript", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/isotronic/bouqdib.com",
    liveUrl: "https://bouqdib.com",
  },
  {
    title: "Simple full-stack blog",
    description:
      "A simple blog application built with React, Bootstrap, and a backend API running on Node.js and Express with MongoDB.",
    tags: ["React", "Bootstrap", "Express", "MongoDB"],
    githubUrl: "https://github.com/isotronic/react-blog",
  },
  {
    title: "Food Finder App",
    description:
      "This is a web app that helps users find nearby restaurants based on their preferences and location.",
    tags: ["TypeScript", "React", "Firebase"],
    githubUrl: "https://github.com/isotronic/food-finder-app",
  },
  {
    title: "Billboard to Spotify Playlist Generator",
    description:
      "This Python script fetches the Billboard Hot 100 chart for a specified date and creates a private Spotify playlist containing the top 100 songs from that date.",
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
];

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
}) => {
  return (
    <div className="rounded-lg bg-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-4xl text-green-500">
          <FaRegFolder />
        </div>
        <div className="flex space-x-4 text-xl text-green-500">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Live site"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-slate-400">{description}</p>
      <div className="mt-4 flex flex-wrap space-x-2 text-slate-200">
        {tags.map((tag) => (
          <span key={tag} className="text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <AnimatedSection
      id="projects"
      className="mx-auto mt-60 max-w-6xl px-12 py-12 lg:px-0"
    >
      <h2 className="text-center text-3xl font-semibold">Projects</h2>

      <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
