// Ordered About content. Add or reorder entries here without changing their UI components.
// `media` is optional; only explicit `kind: "placeholder"` entries show placeholders.
export const aboutGroupIntroductions = {
	professional: {
		id: "professional-background",
		title: "Professional Background",
		introduction: "-",
	},
	personal: {
		id: "more-about-me",
		title: "More About Me",
		introduction: "A little about where I come from and what keeps me curious.",
	},
};

export const aboutLinks = {
	experience: "#/about/experience/",
	education: "#/about/education/",
	personal: "#/about/more-about-me/",
	blog: "#/about/blog/",
};

// Shared detail-page registry; add a route here when a new About destination is needed.
export const aboutDetailPages = Object.fromEntries([
	[aboutLinks.experience, "Experience"],
	[aboutLinks.education, "Education"],
	[aboutLinks.personal, "More About Me"],
	[aboutLinks.blog, "Personal Blog"],
].map(([href, title]) => [href.slice(1), { href, title }]));

export const experienceEntries = [
	{
		id: "integration-specialist",
		title: "Integration Specialist",
		context: "The College of Idaho",
		details: [
			{ id: "web-development", text: "Web development" },
			{ id: "web-design", text: "Web design" },
			{ id: "systems-integration", text: "Systems integration" },
		],
	},
	{
		id: "teaching-assistant-grader",
		title: "Teaching Assistant / Grader",
		details: [
			{ id: "calculus", text: "Calculus" },
			{ id: "statistics", text: "Statistics" },
			{ id: "tutoring-grading", text: "Tutoring and grading" },
		],
	},
	{
		id: "independent-study-research",
		title: "Independent Study and Research",
		details: [
			{ id: "algorithms-java", text: "Data Structures and Algorithms using Java", note: "Supervised by Dr. Jonny Comes" },
			{ id: "brainfuck-research", text: "Computational Limits of Short Brainfuck Programs", note: "Supervised by Dr. David Rosoff" },
		],
	},
];

export const educationGroups = [
	{
		id: "formal-education",
		title: "Education",
		entries: [
			{ id: "college-of-idaho", title: "The College of Idaho", context: "Caldwell, ID · Class of 2026", description: "Bachelor's degree in Computer Science and Mathematics." },
			{ id: "mekelle-university", title: "Mekelle University", context: "Ethiopia · 2020–2021 · approximately nine months", description: "Software Engineering." },
			{ id: "blessed-g-michael", title: "Blessed G/Michael Catholic School", context: "Bahir Dar, Ethiopia", description: "High school." },
		],
	},
	{
		id: "additional-education",
		title: "Additional Education and Learning",
		entries: [
			{ id: "alx-africa", title: "ALX Africa", context: "First cohort in Ethiopia · approximately six months", description: "Web fundamentals and related technical training." },
			{ id: "odin-project", title: "The Odin Project", description: "A full-stack web development curriculum with practical projects in HTML, CSS, JavaScript, React, and related tools." },
		],
	},
];

export const skillGroups = [
	{ id: "frontend", title: "Frontend Development", skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"] },
	{ id: "tools-quality", title: "Tools and Testing", skills: ["Git", "Vite", "Webpack", "Jest", "Vitest", "React Testing Library"] },
	{ id: "systems-research", title: "Systems and Research", skills: ["APIs", "Python", "Java", "Data Structures and Algorithms", "Data Analysis"] },
	{ id: "backend", title: "Backend Development", skills: ["APIs", "NodeJS", "PostgreSQL", "Express framework", "JWT authentication"] },
];

export const backgroundEntries = [
	{
		id: "bahir-dar-to-us",
		title: "I was born and raised in Bahir Dar, Ethiopia",
		description: "And moved to the United States in 2021 to attend college.",
	},
];

export const factEntries = [
	{
		id: "fifa-since-2008",
		title: "Football games, year after year",
		description: "I have played every annual FIFA/EA Sports FC soccer game release since 2008.",
		media: { src: new URL("../../assets/images/fifa-collections.jpg", import.meta.url).href, alt: "A collection of FIFA soccer game cases", aspect: "portrait" },
	},
	{
		id: "zera-yacob",
		title: "Zera Yacob is a mentor",
		description: "Ethiopian philosopher Zera Yacob is one of my inspirations and mentors—yes, I know we have never met, but I mean it.",
	},
	{ id: "wushu", title: "Martial arts", description: "I hold a blue belt in Wushu martial arts." },
	{ id: "running-gym", title: "Running and the gym", description: "I enjoy running and working out at the gym." },
];

export const blogPreview = {
	id: "personal-blog",
	title: "Personal Blog",
	description: "There are no blog posts yet.",
	href: aboutLinks.blog,
};

export const bookEntries = [
	{
		id: "full-stack-react-typescript-node",
		title: "Full-Stack React, TypeScript, and Node",
		description: "-",
		media: { src: new URL("../../assets/images/full-stack-book.jpg", import.meta.url).href, alt: "Full-Stack React, TypeScript, and Node book cover", aspect: "portrait" },
	},
	{
		id: "the-pragmatic-programmer",
		title: "The Pragmatic Programmer",
		description: "-",
		media: { src: new URL("../../assets/images/the-pragmatic-programmer.jpg", import.meta.url).href, alt: "The Pragmatic Programmer book cover", aspect: "portrait" },
	}
];
