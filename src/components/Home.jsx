import { useRef } from "react";
import leftHandImage from "../../assets/images/Iridescent-Glass-Hand-on-White-left.png";
import rightHandImage from "../../assets/images/Neon-Iridescent-Glass-Hand.png";
import "../styles/Home.css";
import HomeHeroText from "./HomeHeroText";

function readNumberControl(element, propertyName, fallback) {
  const value = Number.parseFloat(getComputedStyle(element).getPropertyValue(propertyName));
  return Number.isFinite(value) ? value : fallback;
}

export default function Home() {
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
    const copyScaleRange = readNumberControl(section, "--copy-scale-range", 0.45);
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
      id="home-section"
      ref={sectionRef}
      aria-label="Creative design and software development"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetInteraction}
      onPointerCancel={resetInteraction}
    >
      <a className="home-panel home-panel--left" href="#/portfolio" aria-label="Explore my design and development portfolio">
        <img
          className="home-panel__image"
          src={leftHandImage}
          alt="Colorful abstract hand representing creative design"
        />

        <HomeHeroText variant="designer" title="designer">
          Simple, elegant, and functional UX/UI
        </HomeHeroText>
      </a>

      <a className="home-panel home-panel--right" href="#/portfolio" aria-label="View my portfolio projects">
        <img
          className="home-panel__image"
          src={rightHandImage}
          alt="Iridescent glass hand representing software development"
        />

        <HomeHeroText variant="builder" title="builder.">
          Ambitious ideas, clean code, and purposeful engineering.
        </HomeHeroText>
      </a>
    </header>
  );
}
