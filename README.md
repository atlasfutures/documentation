# Rayline documentation

One Mintlify site, three product tabs: **ARC · Agent Gateway · Workshop**.

## Local preview and checks

Use Bun to install the pinned CLI if needed:

```sh
bun add --global mint@4.2.387
mint validate
mint broken-links
mint dev --port 3014 --no-open
```

Run validation before starting the preview; both use the CLI's shared generated files.

From the parent monorepo:

```sh
bun scripts/rayline-docs-rates.ts
bun run node scripts/check-rayline-docs.mjs
bun run node scripts/rayline-docs-smoke.mjs
bun run node scripts/rayline-docs-navigation.mjs
```

The last two commands require the running preview and installed Playwright browsers. They check real Chromium, Firefox, and WebKit across mobile, tablet, desktop, and ultrawide widths in both themes, plus every route, legacy redirects, product switching, and history.

## Content ownership

- `arc/`: Responses, Decisions, open source, compatibility, and launch pricing.
- `rules-router/`: client setup, explicit policies, current CLI, usage, and troubleshooting.
- `workshop/`: migrated Workshop articles, including Cloud and Desktop sidebar sections.
- `platform/`: shared Rayline workspace keys and usage.
- `snippets/arc-rates.mdx`: generated launch-price snapshot. In the parent, generate a patch with `bun scripts/rayline-docs-rates.ts --patch`, review it, and apply it.

Existing Rayline paths redirect inside this site's `docs.json`. Workshop's old domain needs host-level redirects; the parent repository contains their manifest at `docs/rayline-docs-workshop-redirects.json`.

## Publication gates

This is an implementation preview, not a billing or API launch.

1. Approve the canonical docs domain and configure the old Workshop host to redirect paths and fragments into `/workshop/`.
2. Test the hosted Mintlify preview, including real search indexing and old-domain redirects. Search is unavailable in the local CLI preview.
   The local CLI also drops query strings on configured redirects. Verify query preservation on the hosted deployment; implement host-level forwarding if needed. Do not treat the local path-redirect check as evidence that query forwarding works.
3. Confirm ARC production contracts, live inference, and supported features before removing preview notices or publishing executable production examples.
4. Coordinate the 0% Agent Gateway commission and ARC rate card with actual billing enforcement and an effective date. The current docs do not change charges.
5. Publish the documentation repository and update the parent submodule pointer together. Verify in-app documentation links through the redirects before retiring the old Workshop publishing source.

The original Workshop `docs-site/` remains intact during this transition. Do not run the one-time migration over edited consolidated content. Before cutover, reconcile changes made to the still-published old source.

Import provenance: the 64 Workshop articles and three local SVG assets came from `atlasfutures/memex-desktop/docs-site` at parent revision `55382d8d67996f794d5e33e4eb88060bd9b993cc`. Existing Rayline articles came from documentation revision `c09bb732544d9f2a225d3f24dc493cf7f325685a`. Consult those repositories for original author history. Current CLI guidance was checked against `rayline-ai/rayline` revision `7bd2849c99d26ef21be396360d4e4d61c5444c3d`.

The design and migration rationale is in the parent repository's `docs/rayline-docs-evolution.md`.
