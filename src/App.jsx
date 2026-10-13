import About from "./components/About";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import FeaturedProjects from "./components/FeaturedProjects";

function readPage() {
  const route = window.location.hash.slice(1);
  if (route === "/portfolio") return "portfolio";
  if (route === "/contact") return "contact";
  return "about";
}

export default function App() {
  const [page, setPage] = useState(readPage);

  useEffect(() => {
    const handleNavigation = () => {
      setPage(readPage());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handleNavigation);
    return () => window.removeEventListener("hashchange", handleNavigation);
  }, []);

  return (
    <div id="page-body">
      <Navbar currentPage={page} />
      <main id="main-content">
        {page === "about" && (
          <>
            <About />
            <FeaturedProjects />
          </>
        )}
        {page === "portfolio" && <Projects />}
        {page === "contact" && <Contact />}
      </main>
    </div>
  );
}
