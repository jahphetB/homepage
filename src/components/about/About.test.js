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

before(async () => {
	vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
	({ default: About } = await vite.ssrLoadModule("/src/components/about/About.jsx"));
	({ default: AboutSection } = await vite.ssrLoadModule("/src/components/about/AboutSection.jsx"));
	({ default: AboutMedia } = await vite.ssrLoadModule("/src/components/about/AboutMedia.jsx"));
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
	assert.equal((markup.match(/class="about-group /g) ?? []).length, 2);
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
