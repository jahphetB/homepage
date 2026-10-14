import "../../styles/portfolio/ProjectDescription.css";

export default function ProjectDescription({ id, children }) {
  return <p id={id} className="project-description">{children}</p>;
}
