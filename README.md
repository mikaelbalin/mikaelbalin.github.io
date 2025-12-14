[![Deploy Storybook to Pages](https://github.com/mikaelbalin/mikaelbalin.github.io/actions/workflows/storybook.yml/badge.svg?branch=main)](https://github.com/mikaelbalin/mikaelbalin.github.io/actions/workflows/storybook.yml)
![Vercel Status](https://vercelbadge.vercel.app/api/mikaelbalin/mikaelbalin.github.io?style=flat)
[![codecov](https://codecov.io/gh/mikaelbalin/mikaelbalin.github.io/branch/main/graph/badge.svg)](https://codecov.io/gh/mikaelbalin/mikaelbalin.github.io)

## Installing

A quick introduction of the minimal setup you need to get an app up & running.

### 1. Configure `.npmrc`

Create a `.npmrc` file in the project root with the following content:

```
# https://github.com/vercel/next.js/issues/68805 and https://pnpm.io/npmrc#public-hoist-pattern
public-hoist-pattern[]=*@libsql*

registry=https://registry.npmjs.org
@kaelui:registry=https://npm.pkg.github.com

//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Install dependencies

```shell
pnpm install
```

### 3. Setup Postgres

Start the PostgreSQL database using Podman:

```sh
podman compose --file docker-compose.yml up --detach
```

### 4. Configure environment variables

Copy the example environment file and fill in the required values:

```sh
cp .env.example .env.development
```

See the `.env.example` file for the required variables and their descriptions (e.g., database connection string, secrets, etc.).

Alternatively, you can use Vercel Environment Variables:

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

### 5. Start development server

```shell
pnpm dev
```

## Initial Configuration

Before running the project, you need to set up environment variables. See the `.env.example` file for the required variables and their descriptions. Copy this file to `.env.development` and fill in the necessary values (e.g., database connection string, secrets, etc.).

You will need to use the environment variables [defined in `.env.example`](.env.example). It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables).

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

## Developing

Here's a brief intro about what a developer must do in order to start developing the project further:

```shell
pnpm dev
```

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here:

```shell
pnpm build
```

### Deploying / Publishing

In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
git push
```

After that Storybook will be deployed to GitHub pages and app to Vercel.

## Update dependencies

```shell
pnpm up --interactive --latest
```

## Scripts

- `generate:importmap`: Generates an import map for the admin panel to resolve imports correctly
- `migrate:create`: Creates a new migration file for database schema changes
