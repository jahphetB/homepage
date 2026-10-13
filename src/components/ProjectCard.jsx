import githubIcon from "../../assets/icons/github.svg";
import openInNewIcon from "../../assets/icons/open-in-new.svg";
import "../styles/ProjectCard.css";

export default function ProjectCard({ project }) {
  const projectId = `project-${project.id}`;
  return (
    <article id={projectId} className="project-card">
      <div id={`${projectId}-screenshot`} className="project-screenshot"><p id={`${projectId}-screenshot-text`} className="project-screenshot-text">screenshot<br />of project</p></div>
      <div id={`${projectId}-info`} className="project-info">
        <div id={`${projectId}-header`} className="project-header">
          <h3 id={`${projectId}-title`} className="project-title">{project.title}</h3>
          <div id={`${projectId}-links`} className="project-links">
            <a id={`${projectId}-github-link`} className="project-link" href="#" aria-label={`${project.title} GitHub`}><img id={`${projectId}-github-icon`} className="project-link-icon" src={githubIcon} alt="" /></a>
            <a id={`${projectId}-live-link`} className="project-link" href="#" aria-label={`Open ${project.title}`}><img id={`${projectId}-live-icon`} className="project-link-icon" src={openInNewIcon} alt="" /></a>
          </div>
        </div>
        <p id={`${projectId}-description`} className="project-description">{project.description}</p>
      </div>
    </article>
  );
}
