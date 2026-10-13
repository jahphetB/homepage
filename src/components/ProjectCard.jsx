import githubIcon from "../../assets/icons/github.svg";
import openInNewIcon from "../../assets/icons/open-in-new.svg";
import "../styles/ProjectCard.css";

export default function ProjectCard({ project }) {
  const projectId = `project-${project.id}`;

  return (
    <article id={projectId} className="project-card">
      <div id={`${projectId}-screenshot`} className="project-screenshot">
        {project.screenshot ? (
          <img
            id={`${projectId}-screenshot-image`}
            className="project-screenshot-image"
            src={project.screenshot.src}
            alt={project.screenshot.alt}
          />
        ) : (
          <p id={`${projectId}-screenshot-text`} className="project-screenshot-text">
            screenshot
            <br />
            of project
          </p>
        )}
      </div>
      <div id={`${projectId}-info`} className="project-info">
        <div id={`${projectId}-header`} className="project-header">
          <h3 id={`${projectId}-title`} className="project-title">
            {project.title}
          </h3>
          <div id={`${projectId}-links`} className="project-links">
            {project.repositoryUrl && (
              <a
                id={`${projectId}-github-link`}
                className="project-link"
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} GitHub repository in a new tab`}
              >
                <img
                  id={`${projectId}-github-icon`}
                  className="project-link-icon"
                  src={githubIcon}
                  alt=""
                />
              </a>
            )}
            {project.liveUrl && (
              <a
                id={`${projectId}-live-link`}
                className="project-link"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open live ${project.title} project in a new tab`}
              >
                <img
                  id={`${projectId}-live-icon`}
                  className="project-link-icon"
                  src={openInNewIcon}
                  alt=""
                />
              </a>
            )}
          </div>
        </div>
        <p id={`${projectId}-description`} className="project-description">
          {project.description}
        </p>
      </div>
    </article>
  );
}
