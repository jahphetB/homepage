import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";

export default function App() {
  return (
    <div id="page-body">
      <Navbar />
      <About />
      <Projects />
      <Education />
      <Contact />
    </div>
  );
}
