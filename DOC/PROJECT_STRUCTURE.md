# Portfolio structure and editing guide

The app has three hash routes, so direct links and refresh work on static hosting:

- `#/about` (also the default): navigation, animated image section, six project previews.
- `#/portfolio`: the complete collection, with filters and pagination.
- `#/contact`: the existing contact content.

## Component ownership

All component implementations live in `src/components/`; each has its own CSS file in
`src/styles/`. `src/styles/global.css` holds shared base styles and page layout.
Each new component stylesheet starts with editable CSS custom properties.

- `Navbar` contains `NavBrand` and `NavLinks`.
- `About` owns the two image links, entrance animation, and pointer brightness effect.
- `FeaturedProjects` contains `ProjectsTitle` and `ProjectGrid`; it previews the first six data entries.
- `Projects` composes the full portfolio with the same title/grid plus filtering and pagination.
- `ProjectGrid` renders `ProjectCard` entries.
- `ProjectCard` contains `ProjectImage`, a title/links row (`ProjectTitle` and
  `ProjectLinks`), `ProjectDescription`, and `ProjectTechStack`.

## Add a project

1. Put the screenshot in `assets/images/` and import it at the top of `src/data/projects.js`.
2. Copy the complete Shopping Cart object. Change its unique `id`, title, description,
   categories, screenshot source/alt text, repository URL, live URL, and `techStack` array.
3. Place the object in the desired display order. The first six appear on the landing page;
   every entry is available on Portfolio. Category IDs match `projectFilters` in the same file.

Example tech stack: `techStack: ["React", "JavaScript", "CSS"]`.
Only list technologies actually used. Missing screenshots use a placeholder, missing URLs
hide their icons, and missing tech stacks render no badges.

## Adjust appearance

- Navigation: `Navbar.css`, `NavBrand.css`, and `NavLinks.css`.
- Hero height, image position, fit, timing, brightness: `About.css`.
- Preview spacing: `FeaturedProjects.css`; heading: `ProjectsTitle.css`; columns/gaps: `ProjectGrid.css`.
- Card frame/hover: `ProjectCard.css`; each card child has its own named stylesheet.
- Tech badge colors, font, padding, gap, and wrapping: `ProjectTechStack.css`.
- Individual card: target `#project-shopping-cart` (or the corresponding project ID).
- Individual badge: target `.project-tech__tag[data-technology="React"]` within a card.

## Add a navigation link

Copy an entry in `src/data/navigation.js` and edit `id`, `label`, and `href`.
Existing routes and external URLs work immediately. For a new internal page, also add
its route and component to `src/App.jsx`.
