import { useRef } from "react";
import simonLeeImage from "../../assets/images/simon-lee-ldg40aCeOXo-unsplash.jpg";
import mohammadRahmaniImage from "../../assets/images/mohammad-rahmani-8qEB0fTe9Vw-unsplash.jpg";
import "../styles/About.css";

const BASE_BRIGHTNESS = 0.72;
const BRIGHTNESS_RANGE = 0.32;

export default function About() {
  const sectionRef = useRef(null);

  function resetBrightness() {
    sectionRef.current?.style.removeProperty("--left-brightness");
    sectionRef.current?.style.removeProperty("--right-brightness");
  }

  function handlePointerMove(event) {
    const section = sectionRef.current;
    if (!section) return;

    const bounds = section.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
    const directionFromCenter = Math.max(-1, Math.min(1, horizontalPosition * 2 - 1));

    section.style.setProperty(
      "--left-brightness",
      BASE_BRIGHTNESS - BRIGHTNESS_RANGE * directionFromCenter,
    );
    section.style.setProperty(
      "--right-brightness",
      BASE_BRIGHTNESS + BRIGHTNESS_RANGE * directionFromCenter,
    );
  }

  return (
    <header
      id="about-section"
      ref={sectionRef}
      aria-label="Creative design and software development"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetBrightness}
      onPointerCancel={resetBrightness}
    >
      <div className="about-panel about-panel--left">
        <img
          className="about-panel__image"
          src={simonLeeImage}
          alt="Colorful abstract hand representing creative design"
        />
      </div>

      <div className="about-panel about-panel--right">
        <img
          className="about-panel__image"
          src={mohammadRahmaniImage}
          alt="Code displayed on a screen representing software development"
        />
      </div>
    </header>
  );
}
