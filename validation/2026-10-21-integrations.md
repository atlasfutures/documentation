# Tool integration validation — 2026-10-21

Status: in progress. Live dev tests only; not production certification.

## Scope and completion criteria

Work one tool at a time. Test direct API and Rayline Local gateway paths with
at least two actual prompts each, including tool execution and streamed completion.
Verify the result against a fixture and inspect recorded usage. Capture real UI
evidence, update the guide, and report product bugs to TopazBay for assignment.
Separate gateway location, ARC decision location, and inference location.
On-device inference and local ARC execution are later phases.
Codex/ChatGPT desktop is last; it is hosting the active documentation session.

Order: Claude Code → OpenCode → pi → oh-my-pi → Hermes → OpenClaw →
Claude Desktop Code → Kilo Code → Roo Code → Codex CLI → Codex/ChatGPT desktop.
Additional uncertain harness names need identification before adding instructions.

## Environment

- API: `https://api-dev.rayline.ai`; no production credential use.
- Claude Code: 2.1.273, macOS arm64.
- Rayline installed: 0.2.6+7bd2849c99d2.
- Latest public GitHub release observed: 0.2.7.
- Local test build: unreleased 0.2.10, rayline-ai/rayline commit
  `a2db8785f30c41c8f821662dd1a1d73d71558115`; built with locked dependencies.
- Test fixtures and private transcripts are outside this repo, under David's
  `arc-lanes/testing/tool-integrations-20261021` directory.
- Requests use a three-line receipt: Notebook 12.50, Pen 3.25, Folder 4.75.
  Expected total: 20.50. Cheapest: Pen; price spread: 9.25.

## Results

| Tool/path | Sage request | Swift request | Visual evidence | Status |
| --- | --- | --- | --- | --- |
| Claude Code / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Actual dev usage screenshot captured privately | Passed bounded smoke; guide in progress |
| Claude Code / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Direct usage capture; Local capture pending | Passed on unreleased 0.2.10 |
| OpenCode 2.0.25 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Pending | Passed bounded dev smoke |
| OpenCode 2.0.25 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Pending | Passed bounded dev smoke |
| pi 0.80.2 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| pi 0.80.2 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| oh-my-pi 18.12.6 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| oh-my-pi 18.12.6 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |

The direct Claude Code sessions were `7429fc65-ca6c-46e4-a149-8eb71abbfc66`
and `a0d390db-f869-45d6-85fa-d9916dae61fd`. Both used a separate configuration
folder, safe mode, no MCP servers, and only the Read tool. These checks establish
that the client completes a real file-tool round trip, not arbitrary extension,
subagent, compaction, or resume compatibility. Claude's cost estimates explicitly
have `costBasis: unknown`; they are not authoritative Rayline charges.

The platform showed four successful Messages calls (two model turns per task),
Sage served by Claude Opus 5.5 and Swift by Claude Haiku 5.5. The UI amounts were
rounded; do not use them for exact billing claims.

## Bugs and blockers

1. **Release gap:** guides require 0.2.8/0.2.9, but latest public release is 0.2.7.
   Sent to TopazBay, Agent Mail 13778. TopazBay confirmed and contacted release
   maintainers; no tag/release will be created by this lane. Source-build results
   must be repeated on the released binary.
2. **Claude Desktop launcher unavailable:** rayline#94 remains unmerged according
   to the coordinator. Do not present its guide as a released integration.
3. **Screenshot tooling:** computer-use access to terminal apps is denied. Use
   actual Rayline usage UI evidence for CLI tools; never fabricate terminal shots.

An initial Local launch collided with another daemon on 21809. It was abandoned;
that attempt is not a validation result. This lane uses separately checked free
23808/23809/23811/23812 ports and does not stop other agents' daemons.

Local metrics independently recorded four completed HTTP 200 calls, four remote,
zero local and zero errors. `selected_model` was `rayline/arc-dev` throughout;
this is a routing alias and does not establish the served inference model.
Reported to TopazBay for investigation.


## Additional observations

- OpenCode must use `--standalone` to consume the current process configuration.
  The test runner also sets `PWD` to its working directory; an initial runner
  attempt with inherited `PWD` was discarded and repeated correctly.
- pi's `compat.sendSessionAffinityHeaders` is pi-specific. It is not an omp
  setting; omp warned and ignored it in this smoke. The documented omp
  configuration omits it. This was a test-runner issue, not a Rayline bug.
- Real pi and omp HTML session exports were opened through computer use and
  captured. Their custom-model cost display is not billing evidence.
- TopazBay confirmed the existing in-repo `images/` convention (Agent Mail
  13786). Optimized screenshots are stored there; no CDN credential is needed.
