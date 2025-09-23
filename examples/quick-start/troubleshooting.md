# Troubleshooting Guide

This guide helps you resolve common issues when using the CodeSandbox MCP server.

## Common Issues and Solutions

### 1. Authentication Problems

#### "Cannot find CodeSandbox token" or "Invalid API token"

**Symptoms:**
- Error messages about missing or invalid API tokens
- Authentication failures when connecting to CodeSandbox

**Solutions:**

1. **Verify Token Location:**
   ```bash
   # Check your environment variables
   echo $CODESANDBOX_API_TOKEN
   # or
   echo $CSB_API_KEY
   ```

2. **Check Token Scopes:**
   - Go to [CodeSandbox Dashboard](https://codesandbox.io/dashboard)
   - Navigate to Settings → Developer
   - Ensure your token has these scopes:
     - Sandbox Creation
     - Read/Edit permissions
     - VM Management
     - Preview Token Management

3. **Update Configuration:**
   - Restart your AI client after updating the token
   - Ensure the token is in the correct environment section of your MCP config

#### "Token expired" or "Unauthorized"

**Solutions:**
1. Generate a new API token from CodeSandbox Dashboard
2. Update your MCP configuration with the new token
3. Restart your AI client

### 2. Connection Issues

#### "Sandbox creation failed" or "Cannot connect to sandbox"

**Symptoms:**
- Sandboxes fail to create
- Connection timeouts
- VM startup failures

**Solutions:**

1. **Check Account Quota:**
   - Verify you haven't exceeded your CodeSandbox plan limits
   - Check if you have available VM hours

2. **Network Issues:**
   ```bash
   # Test connectivity to CodeSandbox
   curl -I https://api.codesandbox.io/v1/status
   ```

3. **Retry with Different Settings:**
   ```json
   {
     "args": [
       "npx", "-y", "@techlibs/codesandbox-mcp@latest",
       "--vm-tier", "Pico",
       "--hibernation-timeout", "300"
     ]
   }
   ```

#### "Session connection timeout"

**Solutions:**
1. **Resume Hibernated Sandbox:**
   ```
   Resume sandbox [SANDBOX_ID] before creating a session
   ```

2. **Check Sandbox Status:**
   ```
   Get info for sandbox [SANDBOX_ID] to check its current state
   ```

3. **Create New Session:**
   ```
   Create a new session for sandbox [SANDBOX_ID] with read permission
   ```

### 3. File Operation Issues

#### "File not found" or "Permission denied"

**Solutions:**

1. **Check File Paths:**
   - Use absolute paths starting with `/`
   - Verify the file exists with `readdir`

2. **Session Permissions:**
   ```
   Create a new session with write permission for sandbox [SANDBOX_ID]
   ```

3. **File Path Examples:**
   ```
   /src/App.tsx          ✓ Correct
   src/App.tsx           ✗ Missing leading slash
   ./src/App.tsx         ✗ Relative path not supported
   ```

#### "Cannot write to read-only session"

**Solutions:**
1. **Create Write Session:**
   ```
   Create a new session with write permission
   ```

2. **Check Server Mode:**
   - If server is started with `--read-only`, remove this flag
   - Update your MCP configuration to remove `--read-only`

### 4. MCP Client Issues

#### "MCP server not responding" or "Tool not found"

**Solutions:**

1. **Restart AI Client:**
   - Close and reopen Claude Desktop, Cursor, etc.
   - Wait for MCP server to fully initialize

2. **Check Configuration:**
   ```json
   {
     "mcpServers": {
       "codesandbox": {
         "command": "npx",
         "args": ["-y", "@techlibs/codesandbox-mcp@latest"],
         "env": {
           "CODESANDBOX_API_TOKEN": "your-token-here"
         }
       }
     }
   }
   ```

3. **Verify Installation:**
   ```bash
   npx -y @techlibs/codesandbox-mcp@latest --help
   ```

#### "Package not found" or "Command failed"

**Solutions:**
1. **Clear NPX Cache:**
   ```bash
   npx clear-npx-cache
   ```

2. **Manual Installation:**
   ```bash
   npm install -g @techlibs/codesandbox-mcp
   ```

3. **Use Local Path:**
   ```json
   {
     "command": "node",
     "args": ["/path/to/codesandbox-mcp/dist/cli.js"]
   }
   ```

### 5. Performance Issues

#### "Operations are slow" or "Timeouts"

**Solutions:**

1. **Optimize VM Tier:**
   ```json
   {
     "args": ["--vm-tier", "Small"]
   }
   ```

2. **Enable Keep-Alive:**
   ```json
   {
     "args": ["--keep-alive"]
   }
   ```

3. **Adjust Hibernation:**
   ```json
   {
     "args": ["--hibernation-timeout", "1800"]
   }
   ```

#### "Memory or resource limits"

**Solutions:**
1. **Use Larger VM Tier:**
   - Available tiers: Pico, Nano, Micro, Small, Medium, Large, XLarge

2. **Clean Up Sessions:**
   ```
   List all active sessions and close unused ones
   ```

### 6. Debugging Steps

When encountering issues, follow these debugging steps:

#### Step 1: Enable Debug Logging
```json
{
  "args": ["--log-level", "debug"]
}
```

#### Step 2: Test Basic Connectivity
```
Create a simple sandbox to test basic functionality
```

#### Step 3: Verify Tools Are Available
Ask your AI assistant:
```
List all available CodeSandbox MCP tools
```

#### Step 4: Check Sandbox Status
```
Get information about sandbox [SANDBOX_ID]
```

#### Step 5: Test File Operations
```
List files in the root directory of sandbox [SANDBOX_ID]
```

## Environment-Specific Issues

### macOS

#### Permission Issues
```bash
# Fix permissions for Claude Desktop config
chmod 600 ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

#### Node.js Version
```bash
# Ensure Node.js 18+ is installed
node --version
# If needed, update using nvm
nvm install 18
nvm use 18
```

### Windows

#### PowerShell Execution Policy
```powershell
# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Path Issues
- Use forward slashes in configuration paths
- Escape backslashes if necessary

### Linux

#### Dependencies
```bash
# Install required dependencies
sudo apt-get update
sudo apt-get install nodejs npm curl
```

## Getting Additional Help

### Log Collection

When reporting issues, include:

1. **MCP Configuration:**
   ```json
   // Your complete MCP server configuration
   ```

2. **Error Messages:**
   - Complete error text
   - Stack traces if available

3. **Environment Info:**
   ```bash
   node --version
   npm --version
   npx @techlibs/codesandbox-mcp@latest --help
   ```

4. **Steps to Reproduce:**
   - Exact prompts used
   - Expected vs actual behavior

### Community Support

- **GitHub Issues**: [Open an issue](https://github.com/techlibs/codesandbox-mcp/issues)
- **Discussions**: [Join discussions](https://github.com/techlibs/codesandbox-mcp/discussions)

### Professional Support

For enterprise support or custom implementations:
- Contact [TechLibs](https://techlibs.com)
- Review [CodeSandbox Enterprise](https://codesandbox.io/enterprise) options

## Preventive Measures

### Regular Maintenance

1. **Update Regularly:**
   ```bash
   npm update -g @techlibs/codesandbox-mcp
   ```

2. **Monitor Usage:**
   - Check CodeSandbox dashboard for usage statistics
   - Monitor VM hours and storage

3. **Backup Important Work:**
   - Export sandboxes regularly
   - Use version control for important projects

### Best Practices

1. **Use Appropriate VM Tiers:** Don't over-provision resources
2. **Set Reasonable Timeouts:** Avoid unnecessarily long hibernation times
3. **Clean Up Sessions:** Close unused sessions promptly
4. **Monitor Logs:** Use appropriate log levels for your use case

---

**Still having issues?** Please open a GitHub issue with detailed information about your problem, including configuration, error messages, and steps to reproduce.