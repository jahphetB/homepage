import "../styles/ProjectPagination.css";

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage);

  return sortedPages.flatMap((page, index) => {
    const previousPage = sortedPages[index - 1];
    return previousPage && page - previousPage > 1 ? ["ellipsis", page] : [page];
  });
}

function ArrowIcon({ direction }) {
  return (
    <svg
      className={`project-pagination__arrow project-pagination__arrow--${direction}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="m10 3-5 5 5 5" />
    </svg>
  );
}

export default function ProjectPagination({
  currentPage,
  pageSize,
  pageSizeOptions,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageItems = getPageItems(currentPage, totalPages);
  const firstResult = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastResult = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="project-pagination" aria-label="Project pagination">
      <nav className="project-pagination__navigation" aria-label="Project pages">
        <button
          className="project-pagination__button project-pagination__button--previous"
          type="button"
          aria-label="Previous project page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ArrowIcon direction="previous" />
        </button>

        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span className="project-pagination__ellipsis" key={`ellipsis-${index}`} aria-hidden="true">
              …
            </span>
          ) : (
            <button
              className="project-pagination__button project-pagination__button--page"
              type="button"
              key={item}
              aria-label={`Project page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ),
        )}

        <button
          className="project-pagination__button project-pagination__button--next"
          type="button"
          aria-label="Next project page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ArrowIcon direction="next" />
        </button>
      </nav>

      <div className="project-pagination__summary-row">
        <p className="project-pagination__summary" aria-live="polite">
          Results: {firstResult}–{lastResult} of {totalItems}
        </p>

        <label className="project-pagination__page-size">
          <span className="project-pagination__page-size-label">Projects per page</span>
          <select
            className="project-pagination__select"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
