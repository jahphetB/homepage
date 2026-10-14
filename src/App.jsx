import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import FeaturedProjects from "./components/FeaturedProjects";
import BackToTop from "./components/BackToTop";
import SiteFooter from "./components/SiteFooter";

function readPage() {
  const route = window.location.hash.slice(1);
  if (route === "/portfolio") return "portfolio";
  if (route === "/about") return "about";
  if (route === "/contact") return "contact";
  return "home";
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
        {page === "home" && (
          <>
            <Home />
            <FeaturedProjects />
            <Contact />
          </>
        )}
        {page === "portfolio" && <Projects />}
        {page === "about" && <About />}
        {page === "contact" && <Contact />}
      </main>
      <BackToTop />
      <SiteFooter />
    </div>
  );
}
