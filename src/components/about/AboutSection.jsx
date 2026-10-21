import AboutActionLink from "./AboutActionLink";
import AboutEntry from "./AboutEntry";
import AboutMedia from "./AboutMedia";
import "../../styles/about/AboutSection.css";

// Shared subsection shell; entries, grouped entries, and specialized children can coexist.
export default function AboutSection({ id, title, introduction, entries = [], groups = [], media, action, children }) {
	return (
		<section className={`about-section about-section--${id}`} id={id} aria-labelledby={`${id}-heading`}>
			<div className="about-section__header">
				<h3 className="about-section__heading" id={`${id}-heading`}>{title}</h3>
				{introduction && <p className="about-section__introduction">{introduction}</p>}
			</div>
			<AboutMedia media={media} />
			{entries.length > 0 && <div className="about-section__entries">{entries.map((entry) => <AboutEntry entry={entry} key={entry.id} />)}</div>}
			{groups.length > 0 && <div className="about-section__groups">{groups.map((group) => <div className="about-section__subgroup" key={group.id}><h4 className="about-section__subheading">{group.title}</h4><div className="about-section__entries">{group.entries.map((entry) => <AboutEntry entry={entry} headingLevel={5} key={entry.id} />)}</div></div>)}</div>}
			{children && <div className="about-section__custom-content">{children}</div>}
			{action && <AboutActionLink href={action.href} label={action.label} />}
		</section>
	);
}
