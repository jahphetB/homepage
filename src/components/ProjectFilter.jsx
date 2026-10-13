import "../styles/ProjectFilter.css";

export default function ProjectFilter({ options, activeFilter, onFilterChange }) {
  return (
    <div className="project-filter" role="group" aria-label="Filter projects">
      {options.map(({ id, label }) => {
        const isActive = activeFilter === id;

        return (
          <button
            key={id}
            className="project-filter__button"
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(isActive ? null : id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
