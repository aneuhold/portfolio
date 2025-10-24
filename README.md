# Portfolio

Just a simple portfolio for different projects that have been worked on.

## 🚀 Live Sites

<!-- prettier-ignore -->
| Framework | Live Site |
|-----------|-----------|
| **SvelteKit** | **[🔗 View Portfolio](https://tonyneuhold.com/)** |
| **React/Next.js** | **[🔗 View Portfolio](https://react.tonyneuhold.com/)** |

## Architecture

There are two versions of this portfolio with some shared code between them. Each app is developed and deployed separately on different domains.

- [Svelte portfolio code](./svelte)
- [React portfolio code](./react)

## Deployment Process

```mermaid
sequenceDiagram
    Github main Branch->>GitHub Actions: push
    GitHub Actions->>Netlify: built files
```

## Dev Setup

Overall, first run the installation command: `pnpm run i` in the root directory.

To start development for react:

- Run `pnpm react` in the root directory

To start development for svelte:

- Run `pnpm svelte` in the root directory

## Analytics

- [Link to Google Analytics for the Portfolio](https://analytics.google.com/analytics/web/#/a169638120p509733093/reports/intelligenthome) (Mainly setup as an experiment)
