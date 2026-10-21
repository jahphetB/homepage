import About from "./components/about/About";
import AboutComingSoon from "./components/about/AboutComingSoon";
import { aboutDetailPages } from "./data/about";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Projects from "./components/portfolio/Projects";
import FeaturedProjects from "./components/home/FeaturedProjects";
import BackToTop from "./components/layout/BackToTop";
import SiteFooter from "./components/layout/SiteFooter";
import ResearchPage from "./components/research/ResearchPage";

export function readPage(hash = window.location.hash) {
  const route = hash.slice(1);
  if (route === "/portfolio") return "portfolio";
  if (route === "/about") return "about";
  if (aboutDetailPages[route]) return route;
  if (route === "/contact") return "contact";
  if (route === "/bfbbn-page") return "research";
  return "home";
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const aboutDetail = aboutDetailPages[page];

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
      <Navbar currentPage={aboutDetail ? "about" : page} />
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
        {aboutDetail && <AboutComingSoon title={aboutDetail.title} />}
        {page === "contact" && <Contact />}
        {page === "research" && <ResearchPage />}
      </main>
      <BackToTop />
      <SiteFooter />
    </div>
  );
}
