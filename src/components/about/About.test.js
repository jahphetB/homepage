import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { aboutLinks, educationGroups, experienceEntries, factEntries } from "../../data/about.js";

let vite;
let About;
let AboutSection;
let AboutMedia;
let SkillsSection;

before(async () => {
	vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
	({ default: About } = await vite.ssrLoadModule("/src/components/about/About.jsx"));
	({ default: AboutSection } = await vite.ssrLoadModule("/src/components/about/AboutSection.jsx"));
	({ default: AboutMedia } = await vite.ssrLoadModule("/src/components/about/AboutMedia.jsx"));
	({ default: SkillsSection } = await vite.ssrLoadModule("/src/components/about/SkillsSection.jsx"));
});

after(async () => {
	await vite?.close();
});

test("About preserves its introduction and renders exactly two main chapters", () => {
	const markup = renderToStaticMarkup(React.createElement(About));
	assert.match(markup, /I’m Yaphet Bashahider, a designer and developer/);
	assert.match(markup, /clear, useful digital experiences/);
	assert.match(markup, /class="about-page__content"/);
	assert.match(markup, /Professional Background/);
	assert.match(markup, /More About Me/);
	assert.match(markup, /Integration Specialist/);
	assert.match(markup, /Teaching Assistant \/ Grader/);
	assert.match(markup, /Dr\. Jonny Comes/);
	assert.match(markup, /Dr\. David Rosoff/);
	assert.match(markup, /Bachelor&#x27;s degree in Computer Science and Mathematics/);
	assert.match(markup, /The Odin Project/);
	assert.match(markup, /Technical Skills/);
	assert.match(markup, /React Testing Library/);
	assert.match(markup, /I was born and raised in Bahir Dar, Ethiopia/);
	assert.match(markup, /FIFA\/EA Sports FC soccer game release since 2008/);
	assert.match(markup, /Zera Yacob/);
	assert.match(markup, /blue belt in Wushu/);
	assert.match(markup, /running and working out at the gym/);
	assert.equal((markup.match(/about-media--placeholder/g) ?? []).length, 1);
	assert.equal((markup.match(/class="about-group /g) ?? []).length, 2);
});

test("skill groups can be extended through data without changing their component", () => {
	const markup = renderToStaticMarkup(React.createElement(SkillsSection, {
		groups: [{ id: "sample", title: "Sample category", skills: ["First skill", "Second skill"] }],
	}));
	assert.match(markup, /Sample category/);
	assert.match(markup, /data-skill="Second skill"/);
	assert.doesNotMatch(markup, /about-media--placeholder/);
});

test("shared subsection renders ordered entries, grouped entries, and its route", () => {
	const experience = renderToStaticMarkup(React.createElement(AboutSection, {
		id: "experience",
		title: "Experience",
		entries: experienceEntries,
		action: { href: aboutLinks.experience, label: "More" },
	}));
	const education = renderToStaticMarkup(React.createElement(AboutSection, {
		id: "education",
		title: "Education",
		groups: educationGroups,
	}));
	assert.ok(experience.indexOf("Integration Specialist") < experience.indexOf("Teaching Assistant / Grader"));
	assert.match(experience, /#\/about\/experience\//);
	assert.match(education, /Formal Education/);
	assert.match(education, /Additional Education and Learning/);
});

test("media is absent by default and placeholders require an explicit request", () => {
	assert.equal(renderToStaticMarkup(React.createElement(AboutMedia, { media: undefined })), "");
	assert.equal(renderToStaticMarkup(React.createElement(AboutMedia, { media: { alt: "Future image" } })), "");
	const game = renderToStaticMarkup(React.createElement(AboutMedia, { media: factEntries[0].media }));
	assert.match(game, /about-media--placeholder/);
	assert.match(game, /FIFA \/ EA Sports FC cover image to come/);
});
