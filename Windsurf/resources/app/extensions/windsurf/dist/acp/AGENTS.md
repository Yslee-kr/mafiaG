# Windsurf ACP Connector

This directory contains the ACP client connector that manages the connection
lifecycle between the Windsurf IDE and the chisel agent.

## ACP Custom Capabilities Audit

The chisel agent defines `cognition.ai/`-prefixed custom capabilities that are
negotiated during the `initialize` handshake. A comprehensive audit of these
capabilities is maintained at:

> **[`devin-webapp/apps/chisel/cognition-acp/CAPABILITIES_AUDIT.md`](https://github.com/usacognition/devin-webapp/blob/main/apps/chisel/cognition-acp/CAPABILITIES_AUDIT.md)**

When modifying the `initialize` request in `windsurfAcpConnector.ts` — in
particular the `clientCapabilities` or `clientCapabilities._meta` fields — you
**must** update the audit table.

Currently, `WindsurfAcpConnector.initialize()` sends:

- `clientInfo: { name: MetadataProvider.ideName, version: ideVersion }` — standard ACP client identification; sends `"windsurf"`, `"windsurf-next"`, or `"windsurf-insiders"` so the agent can attribute analytics to the host IDE
- `clientCapabilities.elicitation: { form: {} }` — standard ACP elicitation support
- `clientCapabilities.fs: { readTextFile: true, writeTextFile: true }` — standard ACP file access support
- `clientCapabilities._meta`:
  - `cognition.ai/subagentSupport: true`
  - `cognition.ai/multiRootWorkspace: true`
  - `cognition.ai/partialContent: true` — enables partial form data in elicitation decline `_meta`
  - `cognition.ai/messageGrouping: true` — enables streaming tool call previews and `clientMessageId`-based chunk regrouping
  - `cognition.ai/groupedSessionConfigOptions: true` — opts in to receiving model config options organized into `SessionConfigSelectGroup` entries (grouped by model family) instead of a flat list
  - `cognition.ai/revert: true` — mutual opt-in for the revert-to-step extension methods (`cognition.ai/revert/{listSteps,preview,execute,forkFromStep}`). The agent only advertises the matching agent capability when this is sent. Callers gate UI on `supportsRevert(agentCapabilities)` from `@exa/windsurf-acp`.
  - `cognition.ai/mcp: true` — mutual opt-in for the MCP marketplace extension methods (`cognition.ai/mcp/{listServers,toggleServer,toggleTool}`). The agent only advertises the matching agent capability when this is sent. Callers gate UI on `supportsMcpManagement(agentCapabilities)` from `@exa/windsurf-acp`.
  - `cognition.ai/requestDiagnostics: BackgroundLintManager.getInstance().enabled` — gated on the `CASCADE_AUTO_FIX_LINTS` feature flag. When the flag is off, this is `false` and the agent never registers a diagnostics handler (zero round-trips). When `true`, the connector calls `BackgroundLintManager.watchForLints()` _before_ dispatching each `fs/write_text_file` request so the lint snapshot captures pre-edit state — matching Cortex's invariant that the watch window encompasses the edit. At `Stop` boundaries, the agent pulls lint diagnostics via the `_cognition.ai/request_diagnostics` extension method, which calls `consumeCollectedLints()` to return lints accumulated during the watch windows and mark them as returned. Early-return paths (no active editor, unsupported language, auto-fix disabled) call `finalizeActiveWatch()` instead, which cleans up the watch without consuming — collected lints remain available for the next valid pull.

Standard ACP `terminal` capability is omitted intentionally because Windsurf
handles terminals through its own extension APIs.
