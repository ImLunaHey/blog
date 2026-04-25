# blog

A small Astro + React site that lists my blog entries by reading
`com.whtwnd.blog.entry` records straight from atproto via
[WhiteWind](https://whtwnd.com). No CMS, no DB — entries live on my PDS,
the site just renders them. Was deployed at `blog.imlunahey.com`.

> **Superseded by [imlunahey.com/blog](https://imlunahey.com/blog)** — same
> data source, integrated into the main site.

## Stack

- Astro 5 + `@astrojs/react`
- `@atproto/api` to fetch blog records
- React Query for caching
- Dockerfile + nginx config for static deploy

## Local dev

```bash
npm install
npm run dev   # http://localhost:4321
```
