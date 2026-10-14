import "../styles/Navbar.css";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";

export default function Navbar({ currentPage }) {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <NavBrand currentPage={currentPage} />
      <NavLinks currentPage={currentPage} />
    </nav>
  );
}
