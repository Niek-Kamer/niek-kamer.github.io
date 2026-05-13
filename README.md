# niekkamer

Personal portfolio and writing. Embedded ZK, low-level Rust performance,
Plonky3 / Goldilocks writeups.

Live at https://niek-kamer.github.io/niekkamer/.

## Stack

- [Astro 6](https://astro.build) — static site generator, MDX content
- [Vanilla Extract](https://vanilla-extract.style) — typed CSS-in-TS
- [Bun](https://bun.sh) — package manager + runtime
- [Rust](https://www.rust-lang.org) — design tokens authored in `tokens-gen/`,
  codegen'd to TypeScript at build time
- [Fraunces](https://fonts.google.com/specimen/Fraunces) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — typography
- [Shiki](https://shiki.style) + [KaTeX](https://katex.org) — code highlighting and math
- Deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml`

## Local development

```sh
bun install
bun run dev      # http://localhost:4321/niekkamer/
```

## Build

```sh
bun run build    # runs `bun run codegen` (Rust → TS) then `astro build`
bun run preview  # serve the built site
```

`bun run codegen` requires a Rust toolchain (`cargo`). The deploy workflow
installs `dtolnay/rust-toolchain@stable` automatically.

## Content

- `src/content/writing/` — long-form posts (MDX, math + Shiki code)
- `src/content/projects/` — project case studies
- `src/content/about/` — about-page prose
- `src/data/site.ts` — site metadata, author socials
