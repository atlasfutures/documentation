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
Claude Desktop Code → Kilo Code → Cline → Unreal Agent → Codex CLI → Roomote → Cursor → Codex/ChatGPT desktop.
Unreal Agent identifies the candidate previously described as Unity/Unreal. The
separate system-prompt-code harness remains unidentified.

## Environment

- API: `https://api-dev.rayline.ai`; no production credential use.
- Claude Code: 2.1.273, macOS arm64.
- Rayline installed: 0.2.6+7bd2849c99d2.
- Published CLI: 0.2.10+a2db8785f30c via get.rayline.ai, released at 21:57Z.
  GitHub Releases is not the CLI distribution source.
- Initial Local test build: 0.2.10 source, rayline-ai/rayline commit
  `a2db8785f30c41c8f821662dd1a1d73d71558115`; built with locked dependencies.
- Test fixtures and private transcripts are outside this repo, under David's
  `arc-lanes/testing/tool-integrations-20261021` directory.
- Requests use a three-line receipt: Notebook 12.50, Pen 3.25, Folder 4.75.
  Expected total: 20.50. Cheapest: Pen; price spread: 9.25.

## Results

| Tool/path | Sage request | Swift request | Visual evidence | Status |
| --- | --- | --- | --- | --- |
| Claude Code / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Actual dev usage screenshot embedded in guide | Passed bounded smoke; guide in progress |
| Claude Code / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Direct usage capture; Local capture pending | Passed on 0.2.10 source |
| OpenCode 2.0.25 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Actual OpenCode web session screenshot | Passed bounded dev smoke |
| OpenCode 2.0.25 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Actual OpenCode web session screenshot | Passed bounded dev smoke |
| pi 0.80.2 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| pi 0.80.2 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| oh-my-pi 18.12.6 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| oh-my-pi 18.12.6 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| Hermes source 3fa571a51 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| Hermes source 3fa571a51 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Native session-export screenshot | Passed bounded dev smoke |
| OpenClaw 2026.10.5 Linux arm64 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Pending: gateway UI startup failure | Passed bounded dev smoke |
| OpenClaw 2026.10.5 Linux arm64 / Local gateway → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | Pending: gateway UI startup failure | Passed bounded dev smoke |
| Kilo CLI 7.8.15 / direct dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | CLI session viewed in official VS Code extension | Passed bounded dev smoke |
| Kilo CLI 7.8.15 / Local → dev | Read tool, correct total, exit 0 | Read tool, correct cheapest/spread, exit 0 | CLI session viewed in official VS Code extension | Passed bounded dev smoke |
| Cline VS Code 4.1.25 / direct dev | File read, correct total | File read, correct cheapest/spread | Actual editor screenshot | Passed with OpenAI Compatible provider |
| Cline VS Code 4.1.25 / Local → dev | File read, correct total | File read, correct cheapest/spread | Actual editor screenshot | Passed with explicit mappings and Web Search off |
| Codex CLI 0.163.0 / direct dev | Shell read, correct total, exit 0 | Shell read, correct cheapest/spread, exit 0 | Pending | Passed bounded dev smoke |
| Codex CLI 0.163.0 / Local → dev | Shell read, correct total, exit 0 | Shell read, correct cheapest/spread, exit 0 | Pending | Passed source and published 0.2.10 daemon |
| Unreal Agent 0.3.1 / direct dev | Bash read, correct total, exit 0 | Bash read, correct cheapest/spread, exit 0 | Pending | Passed bounded dev smoke |
| Unreal Agent 0.3.1 / Local → dev | Empty output; no tool or answer | Empty output; no tool or answer | Pending | Failed, despite exit 0 |

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

1. **Release-channel correction:** the initial GitHub-release check was insufficient.
   TopazBay corrected it in 13817: 0.2.10 shipped through get.rayline.ai. Downloaded
   official macOS arm64 rayline/rld artifacts, checked their SHA256 against
   latest.json, and repeated Codex Sage and Swift on the published daemon. Both
   passed. Other source-build rows are not relabelled as released-binary tests.
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


## Hermes and OpenClaw

Hermes used its pinned package-manager runtime, Python 3.14.7, source commit
`3fa571a51a6bf1220dfe9a7a23fcd5bb9482a1af`. This is a source check, not a released
binary claim. Its SQLite session records confirm one successful `read_file` per
task and the expected direct or loopback `billing_base_url`.

OpenClaw 2026.10.5 (1b58cb9) used the official npm package in a dedicated
`node:24-bookworm-slim` container. Session transcripts confirm a successful `read`
for every task; transport logs show two HTTP 200 SSE responses per task. Local
needed `models.providers.rayline.request.allowPrivateNetwork: true` for the
configured `host.docker.internal:23811` endpoint. Initial blocked attempts are
retained separately; they are not passing results. Reported/resolved as a docs
configuration gap with TopazBay (13790/13791).

OpenClaw's gateway UI fails at startup with `SQLite snapshot requires a captured
physical file identity`, although embedded agent requests pass. Screenshot
capture remains pending. Reproducer sent to TopazBay for assignment (13792).
Claude Desktop PR rayline-ai/rayline#94 remains open/unmerged as rechecked.
Roo Code's official docs announce shutdown on May 15, 2026; its repository is
archived. David chose to prioritize Cline and mark Roo as legacy; Roo is outside
the active validation queue.

## Kilo

Kilo CLI 7.8.15 passed all four dev tasks (direct and Local, Sage and Swift).
Each JSONL transcript contains a completed `read` tool call and the correct
fixture answer. The actual Local Swift session was opened in the official
VS Code extension and captured; requests initiated by the extension are not
yet validated. Trusted explicit `KILO_CONFIG` supports environment references;
project config rejects them. The Local-only editor config uses the non-secret
`local-client` placeholder.

## Cline investigation (in progress)

Cline VS Code 4.1.25 offers only built-in Claude IDs in its Anthropic selector.
The initial Local attempt requested `claude-sonnet-5`; direct-model selection
bypassed the main ARC route and returned 401. An explicit model route maps
`claude-sonnet-5` to ARC Sage on the development endpoint. Fresh tasks then
returned 503 `model service unavailable`, with automatic retries cancelled.
Reported to TopazBay for assignment (Agent Mail 13804). Basic Sage and Swift
requests still return 200. The Cline wire payload includes the server-side
`web_search_20250305` tool and `eager_input_streaming` on function tools.
Reducing `max_tokens` from 38400 to 2048 alone did not fix the failure.
Disabling Settings → Features → Web Search and starting new tasks resolved the
Local file-tool workflow. Sage and Swift both completed file reads and returned
the expected answers. Cline direct OpenAI Compatible at api-dev /v1 also passed
both Sage and Swift tasks (2048 output limit, 200000 context setting, web search
off). Actual UI screenshots captured for both paths. David explicitly approved
saving the existing dev key in this isolated Cline profile.

A minimal body containing only a user message and
`tools: [{"type":"web_search_20250305","name":"web_search"}]` reproduces the
503; sent to assigned investigator BoldFox (13811). His trace investigation
reports `no_capable_arm` from the Sage cell, not a general router outage.
TopazBay reports #7607 merged as 853f7c4212 and deployed to dev
(routerproxy-00601-nuh). Independent minimal-payload retest confirmed 400 `unsupported_server_tool`. The fix returns an
actionable 400; it does not add provider-side web-search support, so keep that
setting off.

## Codex and Unreal Agent

Codex CLI 0.163.0 used a separate CODEX_HOME, read-only sandbox, disabled shell
snapshots, and excluded the upstream key from shell environments. All four
source-path tasks completed a real cat operation and a correct answer. Two Local
tasks then passed again through published rld 0.2.10+a2db8785f30c on port 24011.
Model metadata warnings remain; context-window and compaction behavior is unverified.
The Oct-20 production Responses 404 is historical, not evidence that dev fails.
Desktop has not been restarted or tested; it hosts this work and needs a separate
supervising session. CLI results do not establish desktop compatibility.

Unreal Agent official v0.3.1 runner (darwin arm64, SHA256 checked) completed both
direct Responses tasks with successful Bash cat operations. Local Responses
returned empty Output arrays and no tool calls on both tiers, despite exit zero.
Alternate Anthropic mode failed both tasks with Invalid Anthropic Messages API
request. TopazBay assigned BronzeGlacier (13815); reproducer update sent in 13821.
Do not document Local as working until real file-tool tasks pass after the fix.

## Queue expansion — Roomote, Cursor, review and background agents

David requested Roomote instead of Roo Code and added Cursor. Neither is validated.
Cline remains in scope; Roomote is a separate product, not a rename of its extension.

| Priority | Candidate | Validation unit | Status |
| --- | --- | --- | --- |
| Next | [Roomote](https://github.com/RooCodeInc/Roomote) | Self-hosted worker, model endpoint, task completion and review artifact | Queued; source-available licensing, not assumed OSI open source |
| Next | [Cursor](https://cursor.com) | Editor chat/agent, CLI, and cloud agents separately | Queued; BYOK does not establish Tab or cloud-agent support |
| Discovery | [PR Agent](https://github.com/The-PR-Agent/pr-agent) | Review a fixture diff with known defects and check file/line attribution | Not validated |
| Discovery | [OpenHands](https://github.com/OpenHands/OpenHands) | Background task, tool execution, result collection and resume | Not validated |
| Discovery | [Goose](https://github.com/aaif-goose/goose) | Headless/recipe execution and result collection | Not validated |

For review tools, replace the receipt-only acceptance check with two fixture diffs
containing known defects; verify useful findings and correct locations. For
background workers, run two bounded tasks and inspect durable completion/failure
state plus tool results. Test Sage and Swift, direct and Local where the tool can
reach the gateway. A cloud worker's localhost is not the user's Mac: document the
actual gateway placement and connectivity instead of recommending a loopback URL
that cannot work. No public gateway exposure is authorized by this queue entry.

Record model/custom-endpoint support, protocol, credential owner, retry behavior,
cost/usage evidence, and screenshots before adding a working integration guide.
Review output stays in the isolated test fixture; posting review comments to
unrelated repositories is not part of this task.

Cursor's official BYOK reference says custom keys apply to chat models, while Tab
uses Cursor's built-in models. This is a product constraint to verify per surface,
not evidence that ARC already works:
https://prod.cursor.com/help/models-and-usage/api-keys

## Kilo editor follow-up

The official 7.8.15 VS Code extension initiated and completed four new requests
(two tasks on each path), using the same receipt fixture. Local Sage at 22:20:39Z
returned 20.50; Local Swift at 22:21:05Z returned Pen 3.25 and spread 9.25.
Direct Sage at 22:23:24Z returned 20.50; Direct Swift at 22:23:59Z returned Pen
3.25 and spread 9.25. Every UI session shows an executed Read tool. This closes
the earlier extension-initiated-request gap. A new Local screenshot records the
actual extension request rather than the CLI-history viewer.

Direct editor test used KILO_CONFIG pointing outside the workspace and an
inherited RAYLINE_KEY, without writing the credential into configuration. A new
VS Code user-data path exceeded the Unix socket limit at first; shortening it
resolved startup. This was a test-environment path issue, not a Rayline failure.

## Released Claude Code follow-up

Claude Code 2.1.307 (official darwin-arm64 checksum verified) passed Sage and
Swift Read tasks through the published Rayline 0.2.10 env launcher and the
published rld 0.2.10 gateway on port 24011. All four returned the correct
fixture results and exit 0. The earlier 2.1.273 client received a Sage upstream
minimum-version error requiring 2.1.280+. No global Claude installation changed.
Raw sanitized results: scratch `claude-released-launcher-env` and
`claude-released-local-2307`. These are live dev checks, not production checks.

## OpenClaw native control UI

OpenClaw 2026.10.5 on macOS arm64, Node 24.22.1, passed both Local UI tasks
with real read calls. Sage returned 20.50; Swift returned Pen 3.25 and spread
9.25. Screenshot embedded in guide. Gateway bound to loopback port 23822,
provider forwarded to the dev-backed rld on 23811. Native startup succeeded
with SQLite identity checks intact. Node 24.5.0 was rejected by OpenClaw for
the known Node SQLite NUL truncation issue. Container UI remains unverified;
its CLI had passed all four tasks.

## Codex optional web search

Codex 0.163.0 with `web_search = "live"` and arc-swift failed direct dev with
`request_shape` (exit 1). Local returned exit 0 but said it had no web-search
tool and did not perform the task: this is a failed acceptance test, not a
successful search. Reported to TopazBay in message 13845 for investigation.
Earlier file-reading tests explicitly disabled web search.
