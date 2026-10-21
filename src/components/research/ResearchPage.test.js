import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;
let ResearchPage;
let ProjectLinks;
let projects;

before(async () => {
	vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
	({ default: ResearchPage } = await vite.ssrLoadModule("/src/components/research/ResearchPage.jsx"));
	({ default: ProjectLinks } = await vite.ssrLoadModule("/src/components/portfolio/ProjectLinks.jsx"));
	({ projects } = await vite.ssrLoadModule("/src/data/projects.js"));
});

after(async () => {
	await vite?.close();
});

test("research page renders all requested sections from the real dataset", () => {
	const markup = renderToStaticMarkup(React.createElement(ResearchPage));
	for (const section of ["research-methodology", "research-dashboard", "research-simulator", "research-findings", "research-reproducibility"]) {
		assert.match(markup, new RegExp(`id="${section}"`));
	}
	assert.match(markup, /Computational Limits of Short Programs/);
	assert.match(markup, /maximum observed halted steps at length 6/);
	assert.match(markup, /View classification counts/);
	assert.match(markup, /brainfuck-productivity\.pdf/);
	assert.match(markup, /Published/i);
});

test("research card opens the research route in a new tab", () => {
	const project = projects.find((entry) => entry.id === "bb(n)-short-programs-complexicity-research");
	assert.ok(project);
	assert.equal(project.liveUrl, "https://homepage-jahphet.vercel.app/#/bfbbn-page");
	const markup = renderToStaticMarkup(React.createElement(ProjectLinks, { project }));
	assert.match(markup, /target="_blank"/);
	assert.match(markup, /rel="noopener noreferrer"/);
});
