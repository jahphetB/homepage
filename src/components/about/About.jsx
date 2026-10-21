import "../../styles/about/About.css";
import { aboutGroupIntroductions, educationGroups, experienceEntries } from "../../data/about";
import AboutGroup from "./AboutGroup";
import AboutSection from "./AboutSection";

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
						<AboutSection id="experience" title="Experience" introduction="Work, teaching, and research that shaped how I build and learn." entries={experienceEntries} />
						<AboutSection id="education" title="Education" introduction="Formal study alongside continued, project-based learning." groups={educationGroups} />
					</AboutGroup>
					<AboutGroup {...aboutGroupIntroductions.personal} />
				</div>
			</div>
		</section>
	);
}
