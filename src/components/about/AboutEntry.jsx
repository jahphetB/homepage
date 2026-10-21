import AboutMedia from "./AboutMedia";
import "../../styles/about/AboutEntry.css";

// One data-driven entry; optional media and details do not alter its outer structure.
export default function AboutEntry({ entry, headingLevel = 4 }) {
	const Heading = `h${headingLevel}`;
	return (
		<article className={`about-entry about-entry--${entry.id}`} id={`about-entry-${entry.id}`} aria-labelledby={`about-entry-${entry.id}-title`}>
			<AboutMedia media={entry.media} />
			<div className="about-entry__body">
				{entry.sample && <span className="about-entry__sample-label">Fictional sample</span>}
				<Heading className="about-entry__title" id={`about-entry-${entry.id}-title`}>{entry.title}</Heading>
				{entry.context && <p className="about-entry__context">{entry.context}</p>}
				{entry.description && <p className="about-entry__description">{entry.description}</p>}
				{entry.details?.length > 0 && <ul className="about-entry__details">{entry.details.map((detail) => <li className="about-entry__detail" key={detail.id}><span className="about-entry__detail-text">{detail.text}</span>{detail.note && <span className="about-entry__detail-note">{detail.note}</span>}</li>)}</ul>}
			</div>
		</article>
	);
}
