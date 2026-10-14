import "../../styles/portfolio/ProjectTitle.css";

export default function ProjectTitle({ id, children }) {
  return <h3 id={id} className="project-title">{children}</h3>;
}
