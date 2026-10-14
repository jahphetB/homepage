import "../../styles/portfolio/ProjectTechStack.css";

export default function ProjectTechStack({ projectId, technologies = [] }) {
  return (
    <div id={`${projectId}-technology`} className="project-tech">
      <ul className="project-tech__list" aria-label="Technology stack">
        {technologies.map((technology) => (
          <li className="project-tech__tag" key={technology} data-technology={technology}>
            {technology}
          </li>
        ))}
      </ul>
    </div>
  );
}
