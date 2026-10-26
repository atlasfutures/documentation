# Rayline product documentation

This Mintlify site has four top-level tabs: Use in your tools, Build with ARC, API Reference, Workshop. Every article has one sidebar owner; cross-link rather than duplicate.

- URLs keep their existing namespaces (`arc/`, `rules-router/`, `platform/`, `tools/`, `workshop/`) even when navigation moves a page to another tab; do not rename files for appearance. Shared workspace/key/usage/billing/privacy material lives under platform/.
- Workshop accounts, AI credits, and Cloud credits are not Rayline API balances.
- Use ARC models for adaptive model selection and generation, and ARC Decisions for routing decisions; Agent Gateway for hosted and local model access and routing policies, for agent harnesses and subagents across coding, research, automation, and other workflows. Keep technical subagent terminology and CLI flags intact. The active CLI binary is rayline, not the former rl.
- Ground executable examples in the actual implementation or a pinned released CLI. Never infer API support from a protocol's name.
- ARC is in beta and open to any Rayline API key; do not describe an approval gate. First-party model IDs follow `arc-[name]-[version]`: `arc-swift-1.0`, `arc-sage-1.0` (fixed rate cards) and `arc-1.0` (configurable ARC, billed at the served model's catalog price with no ARC fee). Bare `arc-swift`/`arc-sage` still resolve, but never document or advertise them. The prefixed `rayline/arc-swift` and `rayline/arc-sage` are for third-party gateway listings only; the Rayline API refuses them (404 on generation, 409 `non_arc_lookup` on Decisions), so never document them as aliases. API quickstarts default to Swift; coding-tool guides default to Sage. Describe specific availability limits on the relevant page; do not add generic beta banners. Quality claims are labelled "cross-validation (held-out)". Workshop's existing in-app ARC selector is a separate routing option. Keep implementation-only simulation details out of public copy; never fabricate SDKs, production hosts, streaming, tools, benchmarks, or launch dates.
- Agent Gateway's confirmed launch policy is 0% commission. Hosted inference still costs money. Coordinate publishing that policy with the billing release.
- ARC rates come from the effective price card (GET /v1/arc/prices). Regenerate snippets/arc-rates.mdx with the parent monorepo's `bun scripts/rayline-docs-rates.ts --api-origin <origin> --patch`; do not hand-maintain a second rate card.
- Attribute vLLM Semantic Router and link our public fork. Distinguish available runtime source from unreleased ARC model artifacts and their licenses.
- Use active voice, concise second-person instructions, sentence-case headings, bold UI labels, and code formatting for commands.
- Preserve working deep links through explicit redirects. Keep Workshop links and images namespaced.
- Preserve the shared paper/ink themes, Akkurat/Sohne typography, rounded surfaces, accessible contrast, and system theme default.
- Run mint validate and mint broken-links before review. Stop the local preview first: validation rebuilds its shared generated files.
- Do not publish, change domains, or merge to an auto-deploy branch without release authorization. See README.md for the cutover gates.

## Customer-facing integration guides

- Lead with the cloud Rayline platform setup; present Rayline Local as an optional connection or explain when a tool requires it. Use protocol names only where they explain a configuration field.
- ARC Sage suits challenging coding and agent tasks; ARC Swift is a fast workhorse for everyday tasks. Both support coding and agent workflows.
- Keep test dates, source revisions, validation matrices, release coordination, and agent-session details in private engineering records, not published guides. Describe actionable product limits without recounting the test that found them.
- Place screenshots beside the setup steps they explain (provider settings, model selection, connection controls). Do not use test-result screenshots as proof of agent work. Use actual tool brand marks on tool cards.
