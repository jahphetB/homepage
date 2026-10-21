import { useState } from "react";
import "../../styles/about/AboutMedia.css";

// Missing media renders nothing; a visible placeholder must be requested explicitly.
export default function AboutMedia({ media }) {
	const [failedSrc, setFailedSrc] = useState(null);
	if (!media || (media.kind !== "placeholder" && (!media.src || media.src === failedSrc))) return null;
	const aspect = media.aspect === "portrait" ? "portrait" : "landscape";
	if (media.kind === "placeholder") {
		return (
			<figure className={`about-media about-media--${aspect} about-media--placeholder`} aria-label={media.label}>
				<span className="about-media__placeholder-label">{media.label}</span>
			</figure>
		);
	}
	return (
		<figure className={`about-media about-media--${aspect}`}>
			<img className="about-media__image" src={media.src} alt={media.alt ?? ""} loading="lazy" onError={() => setFailedSrc(media.src)} />
			{media.caption && <figcaption className="about-media__caption">{media.caption}</figcaption>}
		</figure>
	);
}
