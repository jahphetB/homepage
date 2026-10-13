import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  return (
    <main id="main-content">
      <section id="work-section">
        <h2 id="work-heading" className="section-heading">My work</h2>
        <div id="projects-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>
    </main>
  );
}
