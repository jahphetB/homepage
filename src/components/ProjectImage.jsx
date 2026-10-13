import "../styles/ProjectImage.css";

export default function ProjectImage({ project }) {
  return (
    <div id={`project-${project.id}-screenshot`} className="project-image">
      {project.screenshot ? (
        <img className="project-image__image" src={project.screenshot.src}
          alt={project.screenshot.alt} loading="lazy" />
      ) : (
        <p className="project-image__placeholder">screenshot<br />of project</p>
      )}
    </div>
  );
}
