# Portfolio

Just a simple portfolio for different projects that have been worked on.

[See the live site here](https://tonyneuhold.com/)

## Architecture

There are two versions of this portfolio with some shared code between them. This was mainly done as practice managing a shared codebase with two largely different technologies and as a way to practice deployment for two different projects out of a monorepo. 

- [React portfolio](./react)
- [Svelte portfolio](./svelte)

The packages are managed with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces) which means there is a root `package.json` then any number of sub-projects 1 level deep with their own `package.json`. Dependencies are shared if they are the same version.
