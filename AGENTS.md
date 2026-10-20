# Rayline product documentation

This Mintlify site has exactly three top-level tabs: ARC, Agent Gateway, Workshop.

- Keep each product's guides in its namespace. Shared Rayline workspace/key/usage material lives under platform/, owned by ARC navigation and cross-linked from Agent Gateway.
- Workshop accounts, AI credits, and Cloud credits are not Rayline API balances.
- Use ARC for adaptive Responses/Decisions; Agent Gateway for hosted and local model access and routing policies, primarily for coding agents and subagents but not limited to them. Keep technical subagent terminology and CLI flags intact. The active CLI binary is rayline, not the former rl.
- Ground executable examples in the actual implementation or a pinned released CLI. Never infer API support from a protocol's name.
- ARC is in beta and open to any Rayline API key; do not describe an approval gate. Publish ARC model IDs only as the router serves them: the beta tier IDs `rayline/arc-swift` and `rayline/arc-sage`. Do not document `-1.0` IDs (cut near launch) or the usage-billed `arc` mode (still being designed). The beta notice lives once, in snippets/arc-preview.mdx. Workshop's existing in-app ARC selector is a separate routing option; do not imply that a Workshop account is needed for the APIs. Keep implementation-only simulation details out of public copy; never fabricate SDKs, production hosts, streaming, tools, benchmarks, or launch dates.
- Agent Gateway's confirmed launch policy is 0% commission. Hosted inference still costs money. Coordinate publishing that policy with the billing release.
- ARC launch rates are a proposal, not active billing. Regenerate snippets/arc-rates.mdx from the parent monorepo's scripts/rayline-docs-rates.ts; do not hand-maintain a second rate card.
- Attribute vLLM Semantic Router and link our public fork. Distinguish available runtime source from unreleased ARC model artifacts and their licenses.
- Use active voice, concise second-person instructions, sentence-case headings, bold UI labels, and code formatting for commands.
- Preserve working deep links through explicit redirects. Keep Workshop links and images namespaced.
- Preserve the shared paper/ink themes, Akkurat/Sohne typography, rounded surfaces, accessible contrast, and system theme default.
- Run mint validate and mint broken-links before review. Stop the local preview first: validation rebuilds its shared generated files.
- Do not publish, change domains, or merge to an auto-deploy branch without release authorization. See README.md for the cutover gates.
