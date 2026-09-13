# SEO Improvements Plan

Applies the SEO work from `aurora-colony-pub` (PR #7 "Setup initial seo things" and the later business profiles `sameAs` commit) to both portfolio apps. Everything Astro-specific or local-business-specific is left out.

## Current state

Checked against the live sites and local builds:

- Neither site has a canonical link, Open Graph tags, a Twitter card, or JSON-LD.
- `https://tonyneuhold.com/robots.txt`, `/sitemap.xml`, and `https://react.tonyneuhold.com/robots.txt` all return 404.
- `react.tonyneuhold.com` serves the same content as `tonyneuhold.com`, and nothing tells search engines which one is preferred.
- `/blog` returns 200 on the Svelte site. It is a placeholder ("Lorem Ipsum" test post) and inherits the home page title and description from `svelte/src/app.html`.
- The title and description are duplicated in `svelte/src/app.html` and `react/app/layout.tsx`. Both site origins are hardcoded in `Footer.svelte` and `Footer.tsx`.
- `favicon.ico` only has 16×16 and 32×32 frames. Google recommends a favicon larger than 48×48 ([docs](https://developers.google.com/search/docs/appearance/favicon-in-search)).
- Project thumbnail alt text (`thumbnailDescription`) is generic ("MesoPro Logo.", "Places iOS App Thumbnail.") and has a typo ("React Cacluator").

Already fine: one `<h1>` on the home page (Hero), `h2` era cards, `h3` project names, `lang="en"`, font preloading, and `www.tonyneuhold.com` already 301s to the apex.

## Steps

### 1. Remove the blog

- Delete `svelte/src/routes/blog/+page.svelte`, `svelte/src/posts/test.md`, and `svelte/src/util/stripFrontMatter.ts`.
- `svelte/package.json`: remove `marked` and `mdsvex`, then `pnpm i` to update the lockfile.
- `svelte/svelte.config.js`: remove the `mdsvex` import and preprocessor, and `.md` from `extensions`.
- `.claude/CLAUDE.md`: drop "mdsvex for `.md` routes" from the `svelte/svelte.config.js` entry.

`/blog` returns 404 after deploy. It held only placeholder content, so no redirect.

### 2. Shared site metadata

New file `packages/shared/config/siteMetadata.ts` exporting a `siteMetadata` object, next to the existing `socialLinks` and `projects` config. Both apps need identical values for the title, description, canonical, OG, and JSON-LD, and today the title, description, and origins are already copied across four files.

Fields:

- `siteUrl` (`https://tonyneuhold.com`) and `reactSiteUrl` (`https://react.tonyneuhold.com`)
- `siteName`: `Anton Neuhold`
- `title`: `Anton (Tony) Neuhold | Senior Software Engineer`
- `description`: `A timeline of web, mobile, and backend projects by Anton (Tony) Neuhold, a Senior Software Engineer in Canby, Oregon.`
- `ogImage`: `width` 1200, `height` 630, `alt`

Wire-up:

- Export it from `packages/shared/index.ts`.
- `svelte/src/components/Footer.svelte` and `react/app/components/Footer.tsx`: replace the hardcoded origins with `siteMetadata.reactSiteUrl` and `siteMetadata.siteUrl`.
- `.claude/CLAUDE.md`: add `siteMetadata.ts` to the "content driving both sites" entry alongside `projects.ts` and `socialLinks.ts`.

### 3. JSON-LD graph

New file `packages/shared/config/seoGraphJson.ts`, a static config file in the same style as `siteMetadata.ts`, exported from `packages/shared/index.ts`. Aurora builds its graph in `SeoGraph.service.ts` because it awaits content collections at build time; nothing here is async or per-page, so the graph is a plain constant.

- Add `schema-dts` to `packages/shared` devDependencies (types only).
- A non-exported `seoGraph` object typed with the `Graph` type from `schema-dts`, and an exported `seoGraphJson`: the object serialized with `<` escaped as `<`. That escape is how the [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) keeps the string safe inside a `<script>`. Both apps inject `seoGraphJson` unchanged.
- Entities, each with a stable `@id` fragment on `siteMetadata.siteUrl` (aurora gets the same from `makeIds`):
  - `WebSite`: `name` (`siteMetadata.siteName`) and `url`. Google reads this from the home page for the site name shown in results ([docs](https://developers.google.com/search/docs/appearance/site-names)).
  - `ProfilePage`: `url`, `name`, `description`, `isPartOf` the WebSite, `mainEntity` the Person. Google lists "About Me" pages as a valid use ([docs](https://developers.google.com/search/docs/appearance/structured-data/profile-page)).
  - `Person`: `name` `Anton Neuhold`, `jobTitle` `Senior Software Engineer`, `description`, `url`, and `sameAs` mapped from `socialLinks` (aurora builds `sameAs` from its social links and business profiles the same way).

### 4. Asset generation scripts

A root `scripts/` folder, as in aurora, so the share image and icons are reproducible rather than one-off exports.

Setup:

- Root `package.json`: add `tsx`, `playwright`, and `@types/node` devDependencies, plus aurora's `generate:assets` script: `tsx scripts/generate-favicons.ts && tsx scripts/generate-og-image.ts`.
- `pnpm-workspace.yaml`: add `esbuild: true` to `allowBuilds` with a short comment. `tsx` pulls in `esbuild`, which the lockfile does not have yet, and aurora allows its build the same way.
- `scripts/tsconfig.json` with Node types (aurora's), added to the references in the root `tsconfig.json` so the editor and the root ESLint config's typed linting pick the scripts up.

`scripts/generate-og-image.ts` and `scripts/og-image/index.html`:

- Same flow as aurora's script: launch Chromium with `--allow-file-access-from-files`, open the template at a 1200×630 viewport, wait for `document.fonts.ready`, and screenshot to `packages/shared/images/og-image.png`. The existing `./images/*` export exposes it to both apps.
- The template links `packages/shared/global-styles/global.css` directly. It is plain CSS, so aurora's `design-tokens.ts` Tailwind rewrite and `addStyleTag` injection are not needed. It declares the same Roboto `@font-face` as `svelte/src/app.html`, pointing at `svelte/static/fonts/`.
- Content: the Hero's name and role text on the `html` background gradient.

`scripts/generate-favicons.ts`:

- Source: `packages/shared/images/sparkles.svg` (already added).
- Renders with `rsvg-convert` and packs with `magick`, the approach in aurora's `generate-logos-utils.ts` (both tools are on PATH on this machine). Only this script renders SVGs, so the helpers stay in this file unexported instead of a separate utils file.
- Outputs, written to both apps from one config object:
  - `favicon.ico` with 16, 32, and 48 frames, replacing `svelte/static/favicon.ico` and `react/app/favicon.ico`.
  - A 180×180 apple touch icon on a white background (as aurora's touch icons are), written to `svelte/static/apple-touch-icon.png` and `react/app/apple-icon.png`. Google accepts `rel="apple-touch-icon"` as a Search favicon (favicon docs above).
- Link tags: add `<link rel="apple-touch-icon">` next to the favicon link in `svelte/src/app.html`. React needs none, since Next's `apple-icon` file convention writes the tag ([docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)).

Run `pnpm generate:assets` and commit the generated files.

### 5. Home page head tags

Svelte:

- `svelte/src/app.html`: remove the static `<title>` and description, since `app.html` can't read `siteMetadata`.
- `svelte/src/routes/+page.svelte`: add a `<svelte:head>` ([SvelteKit SEO docs](https://svelte.dev/docs/kit/seo)) containing:
  - `<title>` and `description`
  - `<link rel="canonical">` to the absolute home URL `https://tonyneuhold.com/` (Google recommends absolute canonicals, [docs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls))
  - `og:type` (`website`), `og:site_name`, `og:locale` (`en_US`), `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`
  - `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`, the same set aurora's `<Seo>` component emits
  - `seoGraphJson` wrapped in `<script type="application/ld+json">` through `{@html}`, with a `svelte/no-at-html-tags` disable comment. A plain `<script type="application/ld+json">{json}</script>` does not work: compiling it emits the literal text `{json}`.
- Import `shared/images/og-image.png` and resolve it against `siteMetadata.siteUrl` with `new URL(...)`, because SvelteKit renders asset paths as relative (the live head uses `./_app/...`).

React:

- `react/app/layout.tsx`: add `metadataBase: new URL(siteMetadata.reactSiteUrl)`, keep `icons`, and move `title` and `description` to the page. `metadataBase` is the React origin because the OG image is served from this site under `/_next/static/media/`.
- `react/app/page.tsx`:
  - Export `metadata` with `title`, `description`, `alternates.canonical`, `openGraph`, and `twitter` carrying the same values as the Svelte tags. All of `openGraph` stays in the page: Next merges `metadata` shallowly, so a nested `openGraph` in one segment replaces another's entirely ([docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)).
  - `alternates.canonical` and `openGraph.url` are the absolute `https://tonyneuhold.com/`, so search consolidates on the primary domain. Google supports cross-domain `rel="canonical"` between similar pages as long as the duplicate stays crawlable ([Search Central blog](https://developers.google.com/search/blog/2009/12/handling-legitimate-cross-domain)). The image URL is the static import's `.src`, which `metadataBase` makes absolute.
  - Render `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seoGraphJson }} />` inside `<main>`, a native `<script>` rather than `next/script`, per the JSON-LD guide.

### 6. robots.txt and sitemap.xml (Svelte site)

- `svelte/static/robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://tonyneuhold.com/sitemap.xml`.
- `svelte/static/sitemap.xml`: one `<url>` with `<loc>https://tonyneuhold.com/</loc>`. No `changefreq` or `priority`, which Google ignores, and no build-time `lastmod`, which Google only uses when it is verifiably accurate ([docs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)).

Trade-offs:

- The static files hardcode the origin, where aurora derives both files from `Astro.site`. The alternative is prerendered `+server.ts` routes that read `siteMetadata.siteUrl`, but each needs its own `export const prerender = true`, since server routes do not inherit it from `+layout.ts` ([docs](https://svelte.dev/docs/kit/page-options#prerender)). The domain is stable, so static files are less code.
- Google says a site of about 500 pages or fewer, with every page linked from the home page, may not need a sitemap ([docs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)). It is still two static files, and it gives Bing and Search Console something to submit.

The React site gets neither file, since its only page sets its canonical to `tonyneuhold.com`.

### 7. Descriptive thumbnail alt text

`packages/shared/config/projects.ts`: rewrite each `thumbnailDescription` to describe what its image in `packages/shared/images/` actually shows (a screenshot of what, or which logo), and fix "Cacluator". Aurora made the same pass on its menu image alts. Both apps already read this field.

### 8. Test

`svelte/src/routes/page.spec.ts`: add a test that renders the page and asserts `document.head` has the canonical link and an `application/ld+json` script whose parsed `@graph` includes a `ProfilePage`.

### 9. Validation

From the root: `pnpm test`, `pnpm lint`, `pnpm check`.

Then `pnpm build` and inspect:

- `svelte/build/index.html` and `react/out/index.html`: exactly one title, description, canonical, and JSON-LD block, plus the OG and Twitter tags and an `apple-touch-icon` link. Every URL is absolute, and both canonicals are `https://tonyneuhold.com/`.
- `svelte/build/robots.txt` and `svelte/build/sitemap.xml` exist, and `svelte/build/blog.html` does not.
- `magick identify` shows 16, 32, and 48 frames in both `favicon.ico` files; `og-image.png` is 1200×630 and the apple touch icons are 180×180.
- Both JSON-LD blocks pass the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).

## After merge (manual)

1. Bing Webmaster Tools: import the existing Search Console property and submit `https://tonyneuhold.com/sitemap.xml`.
2. `README.md`: add the Bing Webmaster Tools link to the Analytics section, like aurora's README table.

## Not carried over

- Local business pieces (`BarOrPub`, address, geo, hours, Google Business Profile, NAP cleanup, directions link): the portfolio is not a business.
- `_redirects`: `www` already 301s to the apex, and the removed routes (the SvelteKit starter's `about` and `todos`, and the placeholder `/blog`) hold nothing worth redirecting.
- `_headers`: aurora planned it as optional and never shipped it.
- `favicon.svg`: Google Search does not list SVG among its supported favicon formats (favicon docs above), and the ICO plus apple touch icon cover browsers and Search.
- Web manifest, 192/512 icons, and `theme-color`: a portfolio has no home screen install use, and the page background is a multi-color gradient rather than one brand color.
- `@jdevalk/seo-graph-core`: its builders assemble per-page graphs and return `Record<string, unknown>`, which is why aurora needs `toEntity()` to narrow them. One static object typed with `schema-dts` is less code.
- Lighthouse PR vs. prod comparison: a CI change rather than an SEO one, and the existing PR comment already reports each preview's SEO score.
