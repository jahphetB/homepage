import { useRef } from "react";
import simonLeeImage from "../../assets/images/Iridescent-Glass-Hand-on-White-left.png";
import mohammadRahmaniImage from "../../assets/images/Neon __dev_ Stone Plaque.png";
import AboutCopy from "./AboutCopy";
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
    sectionRef.current?.style.removeProperty("--designer-scale");
    sectionRef.current?.style.removeProperty("--builder-scale");
  }

  function handlePointerMove(event) {
    const section = sectionRef.current;
    if (!section) return;

    const bounds = section.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
    const directionFromCenter = Math.max(-1, Math.min(1, horizontalPosition * 2 - 1));
    const brightnessBase = readNumberControl(section, "--brightness-base", 0.72);
    const brightnessRange = readNumberControl(section, "--brightness-range", 0.32);
    const copyScaleBase = readNumberControl(section, "--copy-scale-base", 1);
    const copyScaleRange = readNumberControl(section, "--copy-scale-range", 0.08);
    const designerProximity = Math.max(0, -directionFromCenter);
    const builderProximity = Math.max(0, directionFromCenter);

    section.style.setProperty(
      "--left-brightness",
      brightnessBase - brightnessRange * directionFromCenter,
    );
    section.style.setProperty(
      "--right-brightness",
      brightnessBase + brightnessRange * directionFromCenter,
    );
    section.style.setProperty("--designer-scale", copyScaleBase + copyScaleRange * designerProximity);
    section.style.setProperty("--builder-scale", copyScaleBase + copyScaleRange * builderProximity);
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
      <div className="about-panel about-panel--left">
        <img
          className="about-panel__image"
          src={simonLeeImage}
          alt="Colorful abstract hand representing creative design"
        />
        <AboutCopy variant="designer" title="designer">
          Shaping thoughtful interfaces where clarity, color, and human experience work together.
        </AboutCopy>
      </div>

      <div className="about-panel about-panel--right">
        <img
          className="about-panel__image"
          src={mohammadRahmaniImage}
          alt="Neon developer symbol carved into a stone plaque"
        />
        <AboutCopy variant="builder" title="builder.">
          Turning ambitious ideas into reliable products with clean code and purposeful engineering.
        </AboutCopy>
      </div>
    </header>
  );
}
