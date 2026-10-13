import { navigationItems } from "../data/navigation";
import "../styles/NavLinks.css";

export default function NavLinks({ currentPage }) {
  return (
    <div className="nav-links">
      {navigationItems.map(({ id, label, href }) => (
        <a key={id} className="nav-links__link" href={href}
          aria-current={id === currentPage ? "page" : undefined}>
          {label}
        </a>
      ))}
    </div>
  );
}
