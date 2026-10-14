import ProjectCard from "./ProjectCard";
import "../../styles/portfolio/ProjectGrid.css";

export default function ProjectGrid({ projects }) {
  return (
    <div className="projects-grid">
      {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
    </div>
  );
}
