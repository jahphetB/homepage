import { navigationItems } from "../data/navigation";
import "../styles/NavLinks.css";
import { scrollToPageTop } from "../utils/scrollToPageTop";

export default function NavLinks({ currentPage }) {
  return (
    <div className="nav-links">
      {navigationItems.map(({ id, label, href }) => (
        <a key={id} className="nav-links__link" href={href}
          onClick={id === "home" && currentPage === "home" ? scrollToPageTop : undefined}
          aria-current={id === currentPage ? "page" : undefined}>
          {label}
        </a>
      ))}
    </div>
  );
}
