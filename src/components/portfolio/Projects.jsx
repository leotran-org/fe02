import React, { useState } from "react";
import projectLinks from "../../constants/projectLinks";
import placeholder from "../../assets/placeholder.svg";

// Tag component
const Tag = ({ label }) => (
  <span className="px-3 py-1 text-sm rounded-full border border-white/10 bg-white/10 backdrop-blur-md">
    {label}
  </span>
);

// ProjectCard component
const ProjectCard = ({ project, dimmed = false, highlight = false }) => {
  const { image, name, tags, url } = project;

  const baseStyle =
    "bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md h-[340px] w-[420px] relative flex flex-col justify-end transition-all duration-300";

  const effectStyle = dimmed
    ? "opacity-30 scale-95"
    : highlight
    ? "scale-105 drop-shadow-lg"
    : "";

  return (
    <div className={`${baseStyle} ${effectStyle}`}>
      <img
        src={image || placeholder}
        alt={name}
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 p-6 z-10 flex flex-col justify-end hover:to-black/80 transition">
        <h3 className="text-lg font-semibold mb-3 drop-shadow">{name}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag, i) => (
            <Tag key={i} label={tag} />
          ))}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2 text-sm rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/30 hover:-translate-y-1"
          >
            Details
          </a>
        )}
      </div>
    </div>
  );
};

// ProjectsSection component
const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Split into columns of 2
  const columns = [];
  for (let i = 0; i < projectLinks.length; i += 2) {
    columns.push(projectLinks.slice(i, i + 2));
  }
  const totalColumns = columns.length;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalColumns) % totalColumns);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalColumns);
  };

  const getColumn = (offset) =>
    columns[(currentIndex + offset + totalColumns) % totalColumns];

  return (
    <section id="projects" className="relative py-24 px-8 mt-10 text-white">
      {/* Section Header */}
      <div
        className="text-center mb-16"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="300"
      >
        <h2 className="text-3xl font-bold">
          <span className="text-primary text-amber-400">My Projects & Activities</span>
        </h2>
        <p className="mt-2 text-sm text-white/60">
          {currentIndex + 1} / {totalColumns}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <button
          onClick={goPrev}
          className="text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition"
        >
          ›
        </button>
      </div>

      {/* Carousel Display */}
      <div className="flex justify-center items-start gap-6">
        {/* Previous Group (dimmed) */}
        <div className="flex flex-col gap-6">
          {getColumn(-1).map((project, idx) => (
            <ProjectCard key={`prev-${idx}`} project={project} dimmed />
          ))}
        </div>

        {/* Current Group (highlighted) */}
        <div className="flex flex-col gap-6">
          {getColumn(0).map((project, idx) => (
            <ProjectCard key={`curr-${idx}`} project={project} highlight />
          ))}
        </div>

        {/* Next Group (dimmed) */}
        <div className="flex flex-col gap-6">
          {getColumn(1).map((project, idx) => (
            <ProjectCard key={`next-${idx}`} project={project} dimmed />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

