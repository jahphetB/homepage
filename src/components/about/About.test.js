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
let AboutComingSoon;
let readPage;
let SkillsSection;

before(async () => {
	vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
	({ default: About } = await vite.ssrLoadModule("/src/components/about/About.jsx"));
	({ default: AboutSection } = await vite.ssrLoadModule("/src/components/about/AboutSection.jsx"));
	({ default: AboutMedia } = await vite.ssrLoadModule("/src/components/about/AboutMedia.jsx"));
	({ default: AboutComingSoon } = await vite.ssrLoadModule("/src/components/about/AboutComingSoon.jsx"));
	({ readPage } = await vite.ssrLoadModule("/src/App.jsx"));
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
	assert.match(markup, /There are no blog posts yet/);
	assert.match(markup, /The Pragmatic Programmer/);
	assert.match(markup, /Full-Stack React, TypeScript, and Node/);
	assert.equal((markup.match(/class="about-media__image"/g) ?? []).length, 3);
	assert.doesNotMatch(markup, /about-media--placeholder/);
	for (const href of Object.values(aboutLinks)) assert.ok(markup.includes(`href="${href}"`));
	assert.equal((markup.match(/class="about-group /g) ?? []).length, 2);
});

test("About detail destinations have a useful temporary page and a way back", () => {
	const markup = renderToStaticMarkup(React.createElement(AboutComingSoon, { title: "Experience" }));
	assert.match(markup, /Coming soon\. This page is currently being designed and built\./);
	assert.match(markup, /href="#\/about"/);
	assert.match(markup, /aria-labelledby="about-coming-soon-heading"/);
});

test("all About detail URLs resolve without falling back to Home", () => {
	for (const href of Object.values(aboutLinks)) {
		assert.equal(readPage(href), href.slice(1));
	}
	assert.equal(readPage("#/about"), "about");
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
	assert.match(education, /The College of Idaho/);
	assert.match(education, /Additional Education and Learning/);
});

test("media is absent by default and the game image has descriptive alt text", () => {
	assert.equal(renderToStaticMarkup(React.createElement(AboutMedia, { media: undefined })), "");
	assert.equal(renderToStaticMarkup(React.createElement(AboutMedia, { media: { alt: "Future image" } })), "");
	const game = renderToStaticMarkup(React.createElement(AboutMedia, { media: factEntries[0].media }));
	assert.match(game, /fifa-collections/);
	assert.match(game, /alt="A collection of FIFA soccer game cases"/);
});
