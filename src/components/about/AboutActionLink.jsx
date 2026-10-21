import "../../styles/about/AboutActionLink.css";

// Navigation uses a link, styled as a button, so browser history works normally.
export default function AboutActionLink({ href, label }) {
	return <a className="about-action-link" href={href}><span className="about-action-link__label">{label}</span><span className="about-action-link__arrow" aria-hidden="true">↗</span></a>;
}
