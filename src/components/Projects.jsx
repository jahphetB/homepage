import { useState } from "react";
import { projectFilters, projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import ProjectPagination from "./ProjectPagination";
import "../styles/Projects.css";

const pageSizeOptions = [3, 6, 9];

export default function Projects() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const filteredProjects = activeFilters.length
    ? projects.filter((project) =>
        activeFilters.some((filter) => project.categories.includes(filter)),
      )
    : projects;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const firstProjectIndex = (currentPage - 1) * pageSize;
  const visibleProjects = filteredProjects.slice(firstProjectIndex, firstProjectIndex + pageSize);

  const applyFilters = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setCurrentPage(1);
  };

  const changePageSize = (nextPageSize) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  return (
    <main id="main-content">
      <section id="projects-section" className="projects-section">
        <div className="projects-section__heading-row">
          <h2 id="projects-heading" className="section-heading projects-section__heading">
            My Projects
          </h2>
          <ProjectFilter
            options={projectFilters}
            activeFilters={activeFilters}
            onApply={applyFilters}
            onClear={clearFilters}
          />
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <ProjectPagination
          currentPage={Math.min(currentPage, totalPages)}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          totalItems={filteredProjects.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={changePageSize}
        />
      </section>
    </main>
  );
}
