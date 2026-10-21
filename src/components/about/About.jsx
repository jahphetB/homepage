import "../../styles/about/About.css";
import { aboutGroupIntroductions, aboutLinks, backgroundEntries, educationGroups, experienceEntries, factEntries, skillGroups } from "../../data/about";
import AboutGroup from "./AboutGroup";
import AboutSection from "./AboutSection";
import BlogSection from "./BlogSection";
import BooksSection from "./BooksSection";
import SkillsSection from "./SkillsSection";

export default function About() {
	return (
		<section className="about-page" aria-labelledby="about-page-heading">
			<div className="about-page__content">
				<h1 id="about-page-heading" className="about-page__heading">About me</h1>
				<p className="about-page__paragraph">
					I’m Yaphet Bashahider, a designer and developer who enjoys turning ideas into
					clear, useful digital experiences. I care about how a product feels and how
					reliably it works, and I keep learning through the projects I build.
				</p>
				<div className="about-page__groups">
					<AboutGroup {...aboutGroupIntroductions.professional}>
						<AboutSection id="experience" title="Experience" introduction="" entries={experienceEntries} action={{ href: aboutLinks.experience, label: "More" }} />
						<AboutSection id="education" title="Education" introduction="." groups={educationGroups} action={{ href: aboutLinks.education, label: "More" }} />
						<SkillsSection groups={skillGroups} />
					</AboutGroup>
					<AboutGroup {...aboutGroupIntroductions.personal} action={{ href: aboutLinks.personal, label: "More About Me" }}>
						<AboutSection id="personal-background" title="Where I Come From" entries={backgroundEntries} />
						<AboutSection id="random-facts" title="A Few Random Facts" entries={factEntries} />
						<BlogSection />
						<BooksSection />
					</AboutGroup>
				</div>
			</div>
		</section>
	);
}
