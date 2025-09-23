# Quick Start Demo: CodeSandbox MCP Server

This is a complete end-to-end demonstration of how to use the CodeSandbox MCP server with AI clients to create, manage, and work with CodeSandbox environments.

## 🎯 What You'll Learn

By following this demo, you'll learn how to:

1. **Set up** the CodeSandbox MCP server with different AI clients
2. **Create** and manage CodeSandbox environments
3. **Perform file operations** (read, write, list directories)
4. **Manage sessions** for collaborative development
5. **Use real-world workflows** for AI-assisted development

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js 18+** installed
- **CodeSandbox API Token** with the following scopes:
  - Sandbox Creation
  - Read/Edit permissions
  - VM Management
  - Preview Token Management
- **MCP-compatible client** (we'll show examples for Claude Desktop and Cursor)

### Getting Your CodeSandbox API Token

1. Go to [CodeSandbox Dashboard](https://codesandbox.io/dashboard)
2. Navigate to Settings → Developer
3. Create a new Personal Access Token with required scopes
4. Save the token securely (you'll need it for configuration)

## 🚀 Step 1: Client Setup

Choose your preferred AI client and follow the setup instructions:

### Option A: Claude Desktop

1. Locate your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Copy the configuration from [`configs/claude-desktop.json`](./configs/claude-desktop.json)

3. Replace `<your-api-token>` with your actual CodeSandbox API token

### Option B: Cursor

1. Open Cursor Settings
2. Navigate to MCP Servers configuration
3. Use the configuration from [`configs/cursor.json`](./configs/cursor.json)
4. Replace `<your-api-token>` with your actual CodeSandbox API token

### Option C: Custom MCP Client

If you're using a different MCP client, adapt the configuration from [`configs/generic-mcp.json`](./configs/generic-mcp.json)

## 🔍 Step 1.5: Validate Your Setup (Optional)

Before proceeding, you can run our setup validation script to catch common issues:

```bash
node examples/quick-start/validate-setup.js
```

This will check your Node.js version, API token, configuration, and network connectivity.

## 🎮 Step 2: Interactive Demo

Once configured, restart your AI client and try these commands with your AI assistant:

> **💡 Prefer a guided approach?** Check out our [Interactive Demo Script](./interactive-demo.md) for step-by-step testing commands.

### Demo 1: Create a New Sandbox

```
Create a new React TypeScript sandbox for me and set it up with a simple "Hello World" component.
```

The AI will:
1. Use `createSandbox` to create a new sandbox
2. Use `createSession` to establish a development session
3. Use `writeFile` to create component files
4. Show you the sandbox URL and session ID

### Demo 2: Read and Modify Existing Code

```
Please read the package.json file from sandbox [SANDBOX_ID] and add a new script called "dev:watch" that runs "vite --watch".
```

The AI will:
1. Use `readFile` to read the package.json
2. Parse and modify the JSON
3. Use `writeFile` to save the updated file

### Demo 3: Explore Project Structure

```
Show me the complete file structure of sandbox [SANDBOX_ID] and explain what each main directory contains.
```

The AI will:
1. Use `readdir` to list directories recursively
2. Use `readFile` to examine key files
3. Provide a comprehensive overview

### Demo 4: Setup Development Environment

```
Help me set up a Node.js Express API in a new sandbox with TypeScript, proper folder structure, and basic error handling.
```

The AI will:
1. Create a new sandbox
2. Set up the project structure with multiple directories
3. Write configuration files (tsconfig.json, package.json)
4. Create basic Express server files
5. Set up proper TypeScript types

## 📁 Demo Files

This directory includes several pre-made configuration files and examples:

- [`configs/`](./configs/) - MCP client configuration files
- [`sample-workflows.md`](./sample-workflows.md) - Additional workflow examples
- [`troubleshooting.md`](./troubleshooting.md) - Common issues and solutions
- [`advanced-usage.md`](./advanced-usage.md) - Advanced features and use cases

## 🔧 Troubleshooting

### Common Issues

#### "Cannot find CodeSandbox token"
- Verify your API token is correctly set in the environment
- Check that the token has the required scopes
- Restart your AI client after configuration changes

#### "Sandbox creation failed"
- Ensure your CodeSandbox account has sufficient quota
- Check if you're using a valid template ID (if specified)
- Verify your internet connection

#### "Session connection timeout"
- The sandbox VM might be hibernating - use `resumeSandbox` first
- Check if the session ID exists with `getSandboxInfo`

For more troubleshooting help, see [`troubleshooting.md`](./troubleshooting.md)

## 🎯 Next Steps

After completing this demo:

1. **Explore Advanced Features**: Check out [`advanced-usage.md`](./advanced-usage.md)
2. **Try Different Templates**: Experiment with various sandbox templates
3. **Build Custom Workflows**: Create your own development workflows
4. **Share Your Experience**: Open an issue or discussion to share what you built!

## 📚 Additional Resources

- [CodeSandbox MCP Server Documentation](../../README.md)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [CodeSandbox SDK Documentation](https://github.com/codesandbox/codesandbox-sdk)

## 🤝 Contributing

Found issues with this demo or have ideas for improvements? Please:

1. Open an issue describing the problem or suggestion
2. Submit a pull request with improvements
3. Share your own workflow examples

---

**Happy coding! 🚀**