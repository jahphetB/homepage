import ProjectImage from "./ProjectImage";
import ProjectTitle from "./ProjectTitle";
import ProjectLinks from "./ProjectLinks";
import ProjectDescription from "./ProjectDescription";
import ProjectTechStack from "./ProjectTechStack";
import "../../styles/portfolio/ProjectCard.css";

export default function ProjectCard({ project }) {
  const projectId = `project-${project.id}`;

  return (
    <article id={projectId} className="project-card" aria-labelledby={`${projectId}-title`}>
      <ProjectImage project={project} />
      <div id={`${projectId}-info`} className="project-card__info">
        <div id={`${projectId}-header`} className="project-card__header">
          <ProjectTitle id={`${projectId}-title`}>{project.title}</ProjectTitle>
          <ProjectLinks project={project} />
        </div>
        <ProjectDescription id={`${projectId}-description`}>
          {project.description}
        </ProjectDescription>
        <ProjectTechStack projectId={projectId} technologies={project.techStack} />
      </div>
    </article>
  );
}
