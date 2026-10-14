# Deploy this portfolio on Vercel

The GitHub repository is `jahphetB/homepage`. This is a static React/Vite app;
Vercel builds it from source and serves the generated `dist/` folder. No server,
environment variables, or Vercel-specific runtime are required for the current app.

## Import from GitHub

1. In Vercel, choose **Add New → Project** and import `jahphetB/homepage`.
2. Use the repository root as **Root Directory** and `main` as the production branch.
3. Select the **Vite** framework preset if it is not detected automatically.
4. Confirm **Build Command** is `npm run build` and **Output Directory** is `dist`.
5. Deploy, then open the assigned Vercel URL.

The app uses hash routes (`/#/home`, `/#/portfolio`, `/#/about`, and
`/#/contact`). Their path before `#` is always `/`, so a SPA rewrite is not
needed for the current navigation. Revisit routing configuration if the app
later switches to clean URLs such as `/portfolio`.

## Check the deployed site

- Load the root URL and each hash route directly, including after a refresh.
- On Portfolio, confirm the initial result is nine projects and test the filter
  and page-size selector.
- Check images, fonts, project links, contact links, and mobile layout.
- Confirm Vercel reports a successful production build for the latest `main` commit.

Before publicizing the site, review the placeholder project cards, generic About
copy, and whether the published contact details are the ones you want online.
The footer currently says licensing information has not been published.
