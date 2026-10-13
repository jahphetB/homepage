import "./Navbar.css";

const navigationItems = [
  { label: "About", target: "about-section" },
  { label: "Work", target: "work-section" },
  { label: "Education", target: "education-section" },
  { label: "Contact", target: "contact-section" },
];

export default function Navbar() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="site-nav__name" href="#about-section">Yaphet Bashahider</a>
      <div className="site-nav__links">
        {navigationItems.map(({ label, target }) => (
          <a key={target} className="site-nav__link" href={`#${target}`}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
