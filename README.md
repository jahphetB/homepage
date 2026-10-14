# Yaphet Bashahider — Portfolio

A personal space for the projects I design and build. The site brings together a visual introduction, selected work, a filterable portfolio, and ways to get in touch.

**[Visit the live site](https://homepage-one-pi-12.vercel.app/)** · [Explore the portfolio](https://homepage-one-pi-12.vercel.app/#/portfolio)

## What you'll find

- A responsive home page with an animated, interactive design-and-development hero.
- Six featured project cards on Home and a full portfolio with category filters, pagination, screenshots, tech stacks, and links to source code and live demos.
- Separate About and Contact pages, plus contact information at the bottom of Home.
- Shared navigation, footer, and a back-to-top button.

The portfolio currently includes a few placeholder cards reserved for future work.

## Built with

React, JavaScript, Vite, and CSS. The app uses hash-based client-side routes (`#/home`, `#/portfolio`, `#/about`, and `#/contact`) so those pages can be opened directly on static hosting.

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the production build:

```bash
npm run build
npm run preview
```

## Project organization

```text
assets/              Images and icons
src/components/      React components grouped by feature
src/styles/          Matching component CSS and global styles
src/data/            Project entries and navigation links
src/utils/           Shared browser behavior
DOC/                 Structure and deployment guides
```

Each component keeps its own stylesheet in the corresponding feature folder. To add a project, place its image in `assets/images/`, then copy and edit an entry in [`src/data/projects.js`](src/data/projects.js). The first six entries appear on Home; the full list appears on Portfolio. For more detail, see the [project structure guide](DOC/PROJECT_STRUCTURE.md).

## Deployment

The source lives on GitHub, and the site is hosted on Vercel. Vercel builds the app with `npm run build` and serves `dist/`. See the [deployment guide](DOC/DEPLOYMENT.md) for the repository import settings and post-deployment checks.

## License

No license has been published for this repository. Please contact the author before reusing its code or assets.
