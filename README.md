# saeedadam.com

Personal portfolio of Saeed Adam, Senior Software Engineer (.NET).

Built with [Nuxt](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com), based on the MIT-licensed
[Nuxt UI Portfolio template](https://github.com/nuxt-ui-templates/portfolio) (commit `b5042cd`, 2026-11-25).

## Editing content

The site is bilingual: English at `/`, Arabic (RTL) at `/ar`. Page text lives in `content/en/` and
`content/ar/` (same file names in both); short UI strings (nav, buttons, form) live in `i18n/locales/`.

| File (per language) | What it controls |
|---|---|
| `content/<lang>/index.yml` | Home page: hero, about summary, work experience, contact section |
| `content/<lang>/about.md` | Full About page (Markdown) |
| `content/<lang>/projects.yml` | Projects page header |
| `content/<lang>/projects/*.yml` | One file per project (ordered by file name) |
| `i18n/locales/<lang>.json` | Navigation, buttons, form labels, messages |
| `app/app.config.ts` | Photo, email, social links, "open to opportunities" badge |

**Arabic text tips:** write `.NET` with an invisible left-to-right mark before it (`‎.NET`), otherwise the
dot jumps to the wrong side in right-to-left text. Arabic internal links must point to `/ar/...`.

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
