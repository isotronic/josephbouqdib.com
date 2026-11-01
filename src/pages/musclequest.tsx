import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { FaGooglePlay } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

import NavBar from "../components/NavBar";
import SocialLinks from "../components/SocialLinks";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import { caseStudy, type ArchitectureGroup, type CaseStudySection } from "../data/musclequestCaseStudy";

import Favicon from "../images/favicon.png";

const pageUrl = "https://joseph.bouqdib.com/musclequest/";
const pageTitle = "MuscleQuest case study - Joseph Bouqdib";

const ArchitectureDiagram: React.FC<{ groups: ArchitectureGroup[] }> = ({ groups }) => (
  <div className="mt-6 space-y-4">
    {groups.map((group) => (
      <div key={group.label} className="rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-green-500">{group.label}</h3>
        <div className="mt-3 space-y-3">
          {group.layers.map((layer) => (
            <div key={layer.name} className="rounded-lg bg-slate-800 p-3 shadow-md">
              <h4 className="text-sm text-slate-400">{layer.name}</h4>
              <dl className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {layer.items.map((item) => (
                  <div key={item.name} className="rounded-md bg-slate-700 p-3">
                    <dt className="font-semibold text-slate-200">{item.name}</dt>
                    <dd className="mt-1 text-sm text-slate-400">{item.role}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Section: React.FC<{ section: CaseStudySection }> = ({ section }) => {
  const { id, heading, body, diagram, excerpt } = section;

  return (
    <AnimatedSection id={id} className="mt-20">
      <h2 className="text-2xl font-semibold text-slate-200 sm:text-3xl">{heading}</h2>
      {body.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className="mt-4 text-lg text-slate-400">
          {paragraph}
        </p>
      ))}
      {diagram && <ArchitectureDiagram groups={diagram} />}
      {excerpt && (
        <figure className="mt-6 rounded-lg bg-slate-800 shadow-md">
          <figcaption className="border-b border-slate-700 p-4">
            <code className="break-all text-sm text-green-500">{excerpt.file}</code>
            <p className="mt-1 text-sm text-slate-400">{excerpt.problem}</p>
          </figcaption>
          <pre
            className="overflow-x-auto p-4 text-xs leading-normal text-slate-200 sm:text-sm"
            tabIndex={0}
            aria-label={`Code from ${excerpt.file}`}
          >
            <code data-language={excerpt.language}>{excerpt.code}</code>
          </pre>
        </figure>
      )}
    </AnimatedSection>
  );
};

const MuscleQuestPage: React.FC<PageProps> = () => {
  const { title, tagline, summary, stats, stack, sections, screenshots, links } = caseStudy;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* AnimatedSection starts at opacity 0 and needs JavaScript to reveal itself. In the page body because Gatsby's
          Head escapes the contents of a noscript. */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: ".hidden-section { opacity: 1; transform: none; }" }} />
      </noscript>
      <NavBar />
      <SocialLinks />
      <main className="container mx-auto w-full max-w-4xl flex-grow px-5 pb-24 pt-32">
        <header>
          <p className="font-medium text-green-500">Case study</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-200 sm:text-5xl">{title}</h1>
          <p className="mt-4 text-xl text-slate-400">{tagline}</p>
          <a
            href={links.playStore}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-green-500 px-5 py-3 font-semibold text-slate-900 transition hover:bg-green-400"
          >
            <FaGooglePlay />
            Get it on Google Play
          </a>
        </header>

        <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse justify-end rounded-lg bg-slate-800 p-4 shadow-md">
              <dt className="mt-1 text-sm text-slate-400">{label}</dt>
              <dd className="text-2xl font-bold text-green-500">{value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-12 list-disc space-y-2 pl-5 text-lg text-slate-400 marker:text-green-500">
          {summary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="-mb-2 mt-8 flex flex-wrap text-sm text-slate-200">
          {stack.map((item) => (
            <span key={item} className="mb-2 mr-2 rounded-md bg-slate-600 px-3 py-1">
              {item}
            </span>
          ))}
        </div>

        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}

        <AnimatedSection id="screenshots" className="mt-20">
          <h2 className="text-2xl font-semibold text-slate-200 sm:text-3xl">Screenshots</h2>
          <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
            {screenshots.map(({ src, alt }) => (
              <img
                key={src}
                src={src}
                alt={alt}
                width={540}
                height={960}
                loading="lazy"
                className="h-auto w-56 shrink-0 snap-start rounded-lg md:w-full"
              />
            ))}
          </div>
        </AnimatedSection>

        <nav aria-label="Case study links" className="mt-20 flex flex-wrap gap-x-8 gap-y-4 text-green-500">
          <a
            href={links.playStore}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-green-400"
          >
            <FaGooglePlay /> Google Play
          </a>
          <a
            href={links.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-green-400"
          >
            <FaExternalLinkAlt /> musclequest.app
          </a>
          <a href="/#projects" className="hover:text-green-400">
            All projects
          </a>
        </nav>
      </main>
      <Footer />
    </div>
  );
};

export default MuscleQuestPage;

export const Head: HeadFC = () => {
  const { tagline, previewImage } = caseStudy;
  const image = `https://joseph.bouqdib.com${previewImage}`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={tagline} />
      <link rel="canonical" href={pageUrl} />
      <link rel="icon" type="image/svg+xml" href={Favicon} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={tagline} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:image" content={image} />
    </>
  );
};
