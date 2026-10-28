# Rayline documentation

One Mintlify site, four tabs: **Use in your tools · Build with ARC · API Reference · Workshop**.

## Local preview and checks

Use Bun to install the pinned CLI if needed:

```sh
bun add --global mint@4.2.387
mint validate
mint broken-links
node tests/legacy-fragments.mjs
mint dev --port 3014 --no-open
```

Run validation before starting the preview; both use the CLI's shared generated files.

From the parent monorepo:

```sh
bun scripts/rayline-docs-rates.ts --api-origin https://api.rayline.ai
bun run node scripts/check-rayline-docs.mjs
bun run node scripts/rayline-docs-smoke.mjs
bun run node scripts/rayline-docs-navigation.mjs
```

The last two commands require the running preview and installed Playwright browsers. They check real Chromium, Firefox, and WebKit across mobile, tablet, desktop, and ultrawide widths in both themes, plus every route, legacy redirects, product switching, and history.

## Content ownership

- `arc/`: generation, Decisions, open source, compatibility, and pricing.
- `raydock/`: on-device setup, CLI, and troubleshooting.
- `tools/`: harness integration guides.
- `legacy/rules-router/`: existing saved routing policies and billing.
- `workshop/`: migrated Workshop articles, including Cloud and Desktop sidebar sections.
- `platform/`: shared Rayline workspace keys and usage.
- `snippets/arc-rates.mdx`: generated effective-price snapshot for Swift, Sage, and Decisions. In the parent, generate a patch with `bun scripts/rayline-docs-rates.ts --api-origin https://api.rayline.ai --patch`, review it, and apply it. ARC Dynamic's pricing policy is authored separately in `arc/pricing.mdx`.

Existing Rayline paths redirect inside this site's `docs.json`. Workshop's old domain needs host-level redirects; the parent repository contains their manifest at `docs/rayline-docs-workshop-redirects.json`.

## Publication gates

This is an implementation preview, not a billing or API launch.

1. Approve the canonical docs domain and configure the old Workshop host to redirect paths and fragments into `/workshop/`.
2. Test the hosted Mintlify preview, including real search indexing and old-domain redirects. Search is unavailable in the local CLI preview.
   The local CLI also drops query strings on configured redirects. Verify query preservation on the hosted deployment; implement host-level forwarding if needed. Do not treat the local path-redirect check as evidence that query forwarding works.
3. Confirm ARC production contracts, live inference, and supported features before removing preview notices or publishing executable production examples.
4. Keep the generated Swift, Sage, and Decisions rates aligned with the effective price card. ARC Dynamic's authored pricing policy is served-model catalog inference pricing with 0% ARC commission and no additional routing fee. Coordinate the separate Rules Router commission cutover with billing enforcement.
5. Release the matching Raydock CLI, installers, and Homebrew formula before publishing the new install and upgrade instructions.
6. Publish the documentation repository and update the parent submodule pointer together. Verify in-app documentation links through the redirects before retiring the old Workshop publishing source.

The original Workshop `docs-site/` remains intact during this transition. Do not run the one-time migration over edited consolidated content. Before cutover, reconcile changes made to the still-published old source.

Import provenance: the 64 Workshop articles and three local SVG assets came from `atlasfutures/memex-desktop/docs-site` at parent revision `55382d8d67996f794d5e33e4eb88060bd9b993cc`. Existing Rayline articles came from documentation revision `c09bb732544d9f2a225d3f24dc493cf7f325685a`. Consult those repositories for original author history. The Raydock command migration is coordinated with rayline-ai/rayline#136, atlasfutures/memex-desktop#7808, and rayline-ai/homebrew-tap#1. The previous published command is `rayline` (0.2.14); keep the publication gate above until the matching Raydock release is available.

The design and migration rationale is in the parent repository's `docs/rayline-docs-evolution.md`.
