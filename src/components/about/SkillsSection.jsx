import AboutMedia from "./AboutMedia";
import AboutSection from "./AboutSection";
import "../../styles/about/SkillsSection.css";

// Skill groups stay data-driven while retaining their own presentation and optional media.
export default function SkillsSection({ groups, media }) {
	return (
		<AboutSection id="technical-skills" title="Technical Skills" introduction="Technologies and methods I have used in projects, coursework, and research." media={media}>
			<div className="about-skills__groups">
				{groups.map((group) => (
					<article className={`about-skills__group about-skills__group--${group.id}`} id={`about-skills-${group.id}`} key={group.id} aria-labelledby={`about-skills-${group.id}-heading`}>
						<AboutMedia media={group.media} />
						<h4 className="about-skills__heading" id={`about-skills-${group.id}-heading`}>{group.title}</h4>
						<ul className="about-skills__list">{group.skills.map((skill) => <li className="about-skills__item" data-skill={skill} key={skill}>{skill}</li>)}</ul>
					</article>
				))}
			</div>
		</AboutSection>
	);
}
