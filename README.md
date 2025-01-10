# [mikaellbalin.github.io](mikaellbalin.github.io)

[![pages-build-deployment](https://github.com/mikaelbalin/mikaelbalin.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/mikaelbalin/mikaelbalin.github.io/actions/workflows/pages/pages-build-deployment)

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up & running.

```shell
pnpm install
```

### Initial Configuration

Some projects require initial configuration (e.g. access tokens or keys).

```shell
# Database connection string
POSTGRES_URL=postgres://postgres:<password>@127.0.0.1:5432/payload
# Used to encrypt JWT tokens
PAYLOAD_SECRET=secret
# Used to configure CORS, format links and more. No trailing slash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

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

Landing page design: [Canva](https://www.canva.com/design/DAF-waWoppc/ZR0oa4X3YnQuOHEo-85Hjw/view?utm_content=DAF-waWoppc&utm_campaign=designshare&utm_medium=link&utm_source=ed#7)
`generate:importmap`
`migrate:create`
