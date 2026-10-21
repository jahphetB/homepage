import { blogPreview } from "../../data/about";
import AboutSection from "./AboutSection";
import "../../styles/about/BlogSection.css";

// Keep the preview useful while the blog route is built in the next phase.
export default function BlogSection({ preview = blogPreview }) {
	return (
		<AboutSection id={preview.id} title={preview.title} action={{ href: preview.href, label: "More" }}>
			<p className="about-blog__empty-state">{preview.description}</p>
		</AboutSection>
	);
}
