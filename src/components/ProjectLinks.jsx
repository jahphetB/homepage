import githubIcon from "../../assets/icons/github.svg";
import "../styles/ProjectLinks.css";

export default function ProjectLinks({ project }) {
  if (!project.repositoryUrl && !project.liveUrl) return null;
  return (
    <div id={`project-${project.id}-links`} className="project-links">
      {project.repositoryUrl && (
        <a className="project-links__link project-links__link--github"
          href={project.repositoryUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`Open ${project.title} GitHub repository in a new tab`}>
          <img className="project-links__icon" src={githubIcon} alt="" />
        </a>
      )}
      {project.liveUrl && (
        <a className="project-links__link project-links__link--live"
          href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`Open live ${project.title} project in a new tab`}>
          <svg className="project-links__icon" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M14 3h7v7M21 3 10 14M10 3H4v17h17v-6" />
          </svg>
        </a>
      )}
    </div>
  );
}
