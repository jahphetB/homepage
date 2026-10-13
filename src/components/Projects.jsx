import { useState } from "react";
import { projectFilters, projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import "../styles/Projects.css";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState(null);
  const visibleProjects = activeFilter
    ? projects.filter((project) => project.categories.includes(activeFilter))
    : projects;

  return (
    <main id="main-content">
      <section id="projects-section" className="projects-section">
        <div className="projects-section__heading-row">
          <h2 id="projects-heading" className="section-heading projects-section__heading">
            My Projects
          </h2>
          <ProjectFilter
            options={projectFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
