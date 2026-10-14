import "../styles/HomeHeroText.css";

export default function HomeHeroText({ variant, title, children }) {
  return (
    <div className={`home-hero-text home-hero-text--${variant}`}>
      <h2 className="home-hero-text__title">{title}</h2>
      <p className="home-hero-text__description">{children}</p>
    </div>
  );
}
