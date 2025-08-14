# Portfolio

Just a simple portfolio for different projects that have been worked on.

[See the live site here](https://tonyneuhold.com/)

## Architecture

There are two versions of this portfolio with some shared code between them. Each app is developed and deployed separately on different domains.

- [React portfolio](./react)
- [Svelte portfolio](./svelte)

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
