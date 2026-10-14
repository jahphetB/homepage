import { projects } from "../../data/projects";
import ProjectsTitle from "../portfolio/ProjectsTitle";
import ProjectGrid from "../portfolio/ProjectGrid";
import GoToPortfolio from "./GoToPortfolio";
import "../../styles/home/FeaturedProjects.css";

const previewLimit = 6;

export default function FeaturedProjects() {
  return (
    <section className="featured-projects" aria-labelledby="featured-projects-title">
      <ProjectsTitle id="featured-projects-title">Some of my recent projects</ProjectsTitle>
      <ProjectGrid projects={projects.slice(0, previewLimit)} />
      <GoToPortfolio />
    </section>
  );
}
