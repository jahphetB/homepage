import { useRef } from "react";
import simonLeeImage from "../../assets/images/Iridescent-Liquid-Glass-Hand.png";
import mohammadRahmaniImage from "../../assets/images/Neon __dev_ Stone Plaque.png";
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
        <div className="about-copy about-copy--designer">
          <h2 className="about-copy__title">designer.</h2>
          <p className="about-copy__description">
            Shaping thoughtful interfaces where clarity, color, and human experience work together.
          </p>
        </div>
      </div>

      <div className="about-panel about-panel--right">
        <img
          className="about-panel__image"
          src={mohammadRahmaniImage}
          alt="Neon developer symbol carved into a stone plaque"
        />
        <div className="about-copy about-copy--builder">
          <h2 className="about-copy__title">builder.</h2>
          <p className="about-copy__description">
            Turning ambitious ideas into reliable products with clean code and purposeful engineering.
          </p>
        </div>
      </div>
    </header>
  );
}
