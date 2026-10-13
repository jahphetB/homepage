import { useRef } from "react";
import leftHandImage from "../../assets/images/Iridescent-Glass-Hand-on-White-left.png";
import rightHandImage from "../../assets/images/Neon-Iridescent-Glass-Hand.png";
import "../styles/About.css";

function readNumberControl(element, propertyName, fallback) {
  const value = Number.parseFloat(getComputedStyle(element).getPropertyValue(propertyName));
  return Number.isFinite(value) ? value : fallback;
}

export default function About() {
  const sectionRef = useRef(null);

  function resetInteraction() {
    sectionRef.current?.style.removeProperty("--left-brightness");
    sectionRef.current?.style.removeProperty("--right-brightness");
  }

  function handlePointerMove(event) {
    const section = sectionRef.current;
    if (!section) return;

    const bounds = section.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
    const directionFromCenter = Math.max(-1, Math.min(1, horizontalPosition * 2 - 1));
    const brightnessBase = readNumberControl(section, "--brightness-base", 0.72);
    const brightnessRange = readNumberControl(section, "--brightness-range", 0.32);

    section.style.setProperty(
      "--left-brightness",
      brightnessBase - brightnessRange * directionFromCenter,
    );
    section.style.setProperty(
      "--right-brightness",
      brightnessBase + brightnessRange * directionFromCenter,
    );
  }

  return (
    <header
      id="about-section"
      ref={sectionRef}
      aria-label="Creative design and software development"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetInteraction}
      onPointerCancel={resetInteraction}
    >
      <a className="about-panel about-panel--left" href="#/portfolio" aria-label="Explore my design and development portfolio">
        <img
          className="about-panel__image"
          src={leftHandImage}
          alt="Colorful abstract hand representing creative design"
        />
      </a>

      <a className="about-panel about-panel--right" href="#/portfolio" aria-label="View my portfolio projects">
        <img
          className="about-panel__image"
          src={rightHandImage}
          alt="Iridescent glass hand representing software development"
        />
      </a>
    </header>
  );
}
