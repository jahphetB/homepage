import { useEffect, useId, useRef, useState } from "react";
import "../styles/ProjectFilter.css";

export default function ProjectFilter({ options, activeFilters, onApply, onClear }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(activeFilters);
  const filterRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setDraftFilters(activeFilters);
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDraftFilters(activeFilters);
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFilters, isOpen]);

  const togglePanel = () => {
    setDraftFilters(activeFilters);
    setIsOpen((currentState) => !currentState);
  };

  const toggleDraftFilter = (filterId) => {
    setDraftFilters((currentFilters) =>
      currentFilters.includes(filterId)
        ? currentFilters.filter((id) => id !== filterId)
        : [...currentFilters, filterId],
    );
  };

  const applyFilters = () => {
    onApply(draftFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setDraftFilters([]);
    onClear();
    setIsOpen(false);
  };

  const selectedCount = activeFilters.length;

  return (
    <div className="project-filter" ref={filterRef}>
      <button
        className="project-filter__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={togglePanel}
      >
        <svg className="project-filter__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />
        </svg>
        <span>Filters</span>
        {selectedCount > 0 && (
          <span className="project-filter__count">
            {selectedCount} selected
          </span>
        )}
        <svg className="project-filter__chevron" viewBox="0 0 16 16" aria-hidden="true">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </button>

      {isOpen && (
        <div className="project-filter__panel" id={panelId}>
          <fieldset className="project-filter__options">
            <legend className="project-filter__legend">Filter projects by category</legend>
            {options.map(({ id, label }) => (
              <label className="project-filter__option" key={id}>
                <input
                  className="project-filter__checkbox"
                  type="checkbox"
                  checked={draftFilters.includes(id)}
                  onChange={() => toggleDraftFilter(id)}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>

          <div className="project-filter__actions">
            <button
              className="project-filter__action project-filter__action--clear"
              type="button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
            <button
              className="project-filter__action project-filter__action--apply"
              type="button"
              onClick={applyFilters}
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
