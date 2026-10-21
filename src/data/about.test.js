import { test } from "node:test";
import assert from "node:assert/strict";
import { aboutLinks, backgroundEntries, bookEntries, educationGroups, experienceEntries, factEntries, skillGroups } from "./about.js";

test("About collections have stable, unique entry IDs", () => {
	const entries = [
		...experienceEntries,
		...educationGroups.flatMap((group) => group.entries),
		...backgroundEntries,
		...factEntries,
		...bookEntries,
	];
	assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
	assert.ok(skillGroups.every((group) => group.id && group.skills.length > 0));
});

test("only the game and books include media, all backed by real image files", () => {
	const entries = [
		...experienceEntries,
		...educationGroups.flatMap((group) => group.entries),
		...backgroundEntries,
		...factEntries,
		...bookEntries,
	];
	const withMedia = entries.filter((entry) => entry.media);
	assert.deepEqual(withMedia.map((entry) => entry.id), ["fifa-since-2008", "the-pragmatic-programmer", "full-stack-react-typescript-node"]);
	assert.ok(withMedia.every((entry) => entry.media.src && entry.media.alt && entry.media.kind !== "placeholder"));
});

test("future About destinations use the site's hash-route convention", () => {
	assert.equal(aboutLinks.experience, "#/about/experience/");
	assert.ok(Object.values(aboutLinks).every((href) => href.startsWith("#/about/")));
});
