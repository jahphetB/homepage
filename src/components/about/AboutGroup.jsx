import "../../styles/about/AboutGroup.css";

// A top-level About chapter; future subsections are passed as children.
export default function AboutGroup({ id, title, introduction, children }) {
	return (
		<section className={`about-group about-group--${id}`} id={id} aria-labelledby={`${id}-heading`}>
			<div className="about-group__header">
				<h2 className="about-group__heading" id={`${id}-heading`}>{title}</h2>
				<p className="about-group__introduction">{introduction}</p>
			</div>
			{children && <div className="about-group__sections">{children}</div>}
		</section>
	);
}
