# saeedadam.com

Personal portfolio of Saeed Adam, Senior Software Engineer (.NET).

Built with [Nuxt](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com), based on the MIT-licensed
[Nuxt UI Portfolio template](https://github.com/nuxt-ui-templates/portfolio) (commit `b5042cd`, 2026-11-25).

## Editing content

All text lives in `content/`, so most updates need no code changes:

| File | What it controls |
|---|---|
| `content/index.yml` | Home page: hero, about summary, work experience, contact section |
| `content/about.md` | Full About page (Markdown) |
| `content/projects.yml` | Projects page header |
| `content/projects/*.yml` | One file per project (ordered by file name) |
| `app/app.config.ts` | Photo, email, social links, "open to opportunities" badge |

Search for `PLACEHOLDER` to find text that still needs to be written.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm generate   # static site in .output/public
```

> On Windows, `pnpm lint` can crash with `ERR_UNSUPPORTED_ESM_URL_SCHEME` because the generated
> `.nuxt/eslint.config.mjs` imports a raw `C:/...` path. It works on Linux/CI.

## Deployment

Static site, deployed on Netlify (`netlify.toml`). The contact form uses
[Netlify Forms](https://docs.netlify.com/forms/setup/): submissions appear in the Netlify dashboard under
**Forms**, where you can enable email notifications.
