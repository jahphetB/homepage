import "../styles/AboutCopy.css";

export default function AboutCopy({ variant, title, children }) {
  return (
    <div className={`about-copy about-copy--${variant}`}>
      <h2 className="about-copy__title">{title}</h2>
      <p className="about-copy__description">{children}</p>
    </div>
  );
}
