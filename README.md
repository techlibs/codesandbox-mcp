# CodeSandbox MCP Server

A Model Context Protocol (MCP) server that exposes CodeSandbox SDK operations as tools for AI agents.

- Runtime: Node.js 18+
- Auth: `CODESANDBOX_API_TOKEN` (or `CSB_API_KEY`)
- SDK: Official `@codesandbox/sdk`

## 🚀 Quick Start

**New to CodeSandbox MCP?** Check out our [comprehensive demo project](./examples/quick-start/) that walks you through:
- Complete setup with different AI clients
- Real-world usage examples
- Step-by-step tutorials
- Common workflows and best practices

## 📚 Examples and Tutorials

- **[Quick Start Demo](./examples/quick-start/)** - Complete end-to-end tutorial
- **[Sample Workflows](./examples/quick-start/sample-workflows.md)** - Real-world usage patterns
- **[Troubleshooting Guide](./examples/quick-start/troubleshooting.md)** - Common issues and solutions
- **[Advanced Usage](./examples/quick-start/advanced-usage.md)** - Advanced features and integrations

## Install / Run

Use via `npx` in your MCP client config.

Example (Cursor/Claude Desktop mcp.json snippet):

```json
{
  "mcpServers": {
    "codesandbox": {
      "command": "npx",
      "args": [
        "-y",
        "@techlibs/codesandbox-mcp@latest",
        "--read-only"
      ],
      "env": {
        "CODESANDBOX_API_TOKEN": "<your-api-token>"
      }
    }
  }
}
```

CLI binary name: `mcp-server-codesandbox`

You can also run directly:

```sh
npx -y @techlibs/codesandbox-mcp@latest --help
```

Flags:
- `--read-only`: disallow mutating tools (write/rename) and default sessions to read permission
- `--vm-tier <tier>`: default VM tier when creating/resuming
- `--hibernation-timeout <seconds>`: default inactivity hibernation timeout
- `--keep-alive`: keep sessions active while connected
- `--log-level <error|warn|info|debug>`

## Tools (Stateless)

All tools are stateless: no server-managed session registry. Each call performs the SDK operation directly using only the provided arguments.

- `createSandbox`
  - Description: Create a sandbox (optionally from template `id`) and optionally start with custom VM settings.
  - Params:
    - `privacy` (public|private): Privacy of the sandbox.
    - `title` (string): Optional title.
    - `description` (string): Optional description.
    - `tags` (string[]): Up to 10 tags.
    - `path` (string): Destination folder path inside your workspace.
    - `id` (string): Template sandbox ID to fork from.
    - `ipcountry` (string): ISO 3166-1 alpha-2 country hint for VM scheduling.
    - `vmTier` (string): VM tier (e.g. Pico, Nano, ...). Overrides server default.
    - `hibernationTimeoutSeconds` (number): Inactivity timeout before VM hibernates.
    - `automaticWakeupConfig.http` (boolean): Auto-wake on HTTP.
    - `automaticWakeupConfig.websocket` (boolean): Auto-wake on WebSocket.

- `resumeSandbox`
  - Description: Resume (or start) a sandbox VM.
  - Params:
    - `sandboxId` (string): Target sandbox ID.

- `hibernateSandbox`
  - Description: Hibernate a sandbox VM (saves and sleeps the VM).
  - Params:
    - `sandboxId` (string): Target sandbox ID.

- `getSandboxInfo`
  - Description: Get sandbox metadata without starting the VM.
  - Params:
    - `sandboxId` (string): Sandbox ID to fetch.

- `updateSandbox`
  - Description: Update VM settings for a running sandbox.
  - Params:
    - `sandboxId` (string): Target sandbox ID.
    - `vmTier` (string): Change VM tier (Pico|Nano|Micro|Small|Medium|Large|XLarge).
    - `hibernationTimeoutSeconds` (number): Update inactivity hibernation timeout.

- `createSession`
  - Description: Create a session for a sandbox (no state is stored server-side).
  - Params:
    - `sandboxId` (string): Target sandbox ID.
    - `sessionId` (string, optional): Provide a specific session ID; if omitted a UUID is generated.
    - `permission` (read|write): Session permission. Use `read` for safe, non-mutating access.
    - `env` (Record<string,string>, optional): Environment variables for the session.
    - `git` (object, optional): Git identity/options for the session creation.
      - `provider` (string): e.g. "github".
      - `username` (string, optional)
      - `accessToken` (string, optional)
      - `email` (string)
      - `name` (string, optional)

- `resumeSession`
  - Description: Connect to an existing session by `sandboxId` + `sessionId`. If the session does not exist, it will be created using the optional parameters.
  - Params:
    - `sandboxId` (string): Target sandbox ID.
    - `sessionId` (string): Session identifier to connect to.
    - `permission` (read|write, optional): Used if creating the session.
    - `env` (Record<string,string>, optional): Used if creating the session.

- `readFile`
  - Description: Read a file from the sandbox filesystem. The tool connects per call using `sandboxId` + `sessionId`.
  - Params:
    - `sandboxId` (string): Target sandbox ID.
    - `sessionId` (string): Session identifier (created if missing as needed).
    - `permission` (read|write, optional): Used if creating the session.
    - `env` (Record<string,string>, optional): Used if creating the session.
    - `path` (string): Absolute path inside the sandbox filesystem.
    - `encoding` (utf8|base64, optional): Encoding for the returned content (default `utf8`).

- `readdir`
  - Description: List files and directories at a given path. The tool connects per call using `sandboxId` + `sessionId`.
  - Params:
    - `sandboxId` (string): Target sandbox ID.
    - `sessionId` (string): Session identifier (created if missing as needed).
    - `permission` (read|write, optional): Used if creating the session (defaults to `read` in read-only mode).
    - `env` (Record<string,string>, optional): Used if creating the session.
    - `path` (string): Absolute path to list within the sandbox filesystem.

- `writeFile`
  - Description: Write a file in the sandbox filesystem. The tool connects per call using `sandboxId` + `sessionId`.
  - Params:
    - `sandboxId` (string): Target sandbox ID.
    - `sessionId` (string): Session identifier (created if missing as needed). Must allow write.
    - `permission` (read|write, optional): Used if creating the session (typically `write`).
    - `env` (Record<string,string>, optional): Used if creating the session.
    - `path` (string): Absolute path to the file.
    - `content` (string): Content to write (encoded per `encoding`).
    - `encoding` (utf8|base64, optional): Content encoding (default `utf8`).
    - `overwrite` (boolean, optional): Overwrite existing file (default `true`).
    - `create` (boolean, optional): Create the file if missing (default `true`).

- `rename`
  - Description: Rename/move a file or directory. The tool connects per call using `sandboxId` + `sessionId`.
  - Params:
    - `sandboxId` (string): Target sandbox ID.
    - `sessionId` (string): Session identifier (created if missing as needed). Must allow write.
    - `permission` (read|write, optional): Used if creating the session (typically `write`).
    - `env` (Record<string,string>, optional): Used if creating the session.
    - `from` (string): Source path.
    - `to` (string): Destination path.
    - `overwrite` (boolean, optional): Overwrite if destination exists (default `true`).

Notes:
- Filesystem operations connect a `SandboxClient` for the duration of the call and dispose it immediately; no state is retained.
- Outputs are returned as text blocks (JSON payloads serialized to string) for broad client compatibility.

## Development

- Build: `npm run build`
- Dev (stdio): `npm run dev` (requires token env var)

## Environment

- `CODESANDBOX_API_TOKEN` (preferred) or `CSB_API_KEY`: PAT with scopes for Sandbox Creation, Read/Edit, VM Manage, Preview Token Manage.

## Limitations

- This server targets CodeSandbox sandboxes (VMs), not legacy projects.
- Session resume uses `sandbox.connect({ id: sessionId })`.
