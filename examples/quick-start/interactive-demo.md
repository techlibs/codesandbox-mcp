# Interactive Demo Script

This script provides a simple way to test your CodeSandbox MCP server setup.

## Prerequisites

Before running this demo, ensure you have:
1. CodeSandbox API token configured
2. MCP client (Claude Desktop, Cursor, etc.) properly set up
3. Access to your AI assistant

## Demo Commands

Copy and paste these commands one by one into your AI assistant to test different features:

### 1. Test Basic Connection
```
Please test if the CodeSandbox MCP server is working by listing all available CodeSandbox tools.
```

**Expected Result:** Your AI should list all available tools like `createSandbox`, `readFile`, `writeFile`, etc.

### 2. Create a Simple Sandbox
```
Create a new React TypeScript sandbox with the title "MCP Demo Test" and the description "Testing CodeSandbox MCP integration". Use privacy setting "public".
```

**Expected Result:** Your AI should:
- Create a new sandbox
- Return the sandbox ID
- Provide the CodeSandbox URL

### 3. Test File Reading
```
Using the sandbox created above, list all files in the root directory.
```

**Expected Result:** Your AI should show the directory structure of the React template.

### 4. Test File Writing
```
In the same sandbox, create a new file called "/src/demo.txt" with the content:
"Hello from CodeSandbox MCP!
This file was created through the MCP server.
Demo completed successfully."
```

**Expected Result:** Your AI should create the file and confirm the operation.

### 5. Test File Reading Again
```
Read the contents of the file "/src/demo.txt" that we just created.
```

**Expected Result:** Your AI should return the exact content we wrote to the file.

### 6. Test Session Creation
```
Create a new session for this sandbox with write permissions and set an environment variable called "DEMO_MODE" with the value "true".
```

**Expected Result:** Your AI should create a session and return the session ID.

### 7. Test Advanced Operations
```
Create a simple React component in the file "/src/components/DemoComponent.tsx" with the following features:
- Accept a "message" prop of type string
- Display the message in a styled div
- Include proper TypeScript types
- Add some basic CSS styling
```

**Expected Result:** Your AI should create a properly structured React component file.

### 8. Test Directory Listing
```
Show me the complete file structure of the sandbox, including the new files we created.
```

**Expected Result:** Your AI should display the full directory tree including our new files.

## Verification Checklist

After running all commands, verify that:

- [ ] All commands executed without errors
- [ ] Sandbox was created successfully
- [ ] Files were read and written correctly
- [ ] Sessions were created properly
- [ ] The sandbox is accessible via CodeSandbox URL
- [ ] All created files are visible in the CodeSandbox interface

## Next Steps

If the demo completed successfully:

1. **Explore More Examples:** Check out [sample-workflows.md](./sample-workflows.md)
2. **Try Advanced Features:** Read [advanced-usage.md](./advanced-usage.md)
3. **Build Your Project:** Start working on your actual development tasks

If you encountered issues:

1. **Check Configuration:** Verify your MCP client setup
2. **Review Logs:** Look for error messages in your AI client
3. **Consult Troubleshooting:** See [troubleshooting.md](./troubleshooting.md)
4. **Get Help:** Open an issue on GitHub with details

## Success Indicators

Your setup is working correctly if:

✅ **All tools are available** - Your AI can list CodeSandbox MCP tools  
✅ **Sandboxes can be created** - New sandbox creation works  
✅ **File operations work** - Reading and writing files succeeds  
✅ **Sessions can be managed** - Session creation and management works  
✅ **No authentication errors** - API token is working properly  

## Troubleshooting Quick Fixes

### "Tool not found" errors
- Restart your AI client
- Check MCP configuration file
- Verify the server is installed: `npx @techlibs/codesandbox-mcp@latest --help`

### "Authentication failed" errors
- Check your API token in the configuration
- Verify token has required scopes
- Try generating a new token

### "Sandbox creation failed" errors
- Check your CodeSandbox account quota
- Try with a different template or settings
- Verify network connectivity

## Custom Demo Ideas

Once the basic demo works, try these custom scenarios:

### Web Development Demo
```
Create a full-stack application with React frontend and Express backend, 
including proper TypeScript setup, API routes, and basic authentication.
```

### Migration Demo
```
Help me migrate a simple HTML/CSS/JS project to a modern React setup 
with TypeScript, proper component structure, and build tools.
```

### Collaboration Demo
```
Set up a development environment with multiple sessions - one for 
development, one for reviewing, and one for demonstrations.
```

---

**Demo completed successfully?** You're ready to start using CodeSandbox MCP for real development work! 🎉