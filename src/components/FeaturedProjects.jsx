import { projects } from "../data/projects";
import ProjectsTitle from "./ProjectsTitle";
import ProjectGrid from "./ProjectGrid";
import "../styles/FeaturedProjects.css";

const previewLimit = 6;

export default function FeaturedProjects() {
  return (
    <section className="featured-projects" aria-labelledby="featured-projects-title">
      <ProjectsTitle id="featured-projects-title">Some of my projects</ProjectsTitle>
      <ProjectGrid projects={projects.slice(0, previewLimit)} />
    </section>
  );
}
