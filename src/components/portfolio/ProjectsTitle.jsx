import "../../styles/portfolio/ProjectsTitle.css";

export default function ProjectsTitle({ id, children }) {
  return <h2 id={id} className="projects-title">{children}</h2>;
}
