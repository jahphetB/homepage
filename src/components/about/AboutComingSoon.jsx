import "../../styles/about/AboutComingSoon.css";

// One accessible destination for the About detail pages while their content is in progress.
export default function AboutComingSoon({ title }) {
	return (
		<section className="about-coming-soon" aria-labelledby="about-coming-soon-heading">
			<div className="about-coming-soon__content">
				<p className="about-coming-soon__eyebrow">About / {title}</p>
				<h1 className="about-coming-soon__heading" id="about-coming-soon-heading">{title}</h1>
				<p className="about-coming-soon__message">Coming soon. This page is currently being designed and built.</p>
				<a className="about-coming-soon__back" href="#/about">Back to About</a>
			</div>
		</section>
	);
}
