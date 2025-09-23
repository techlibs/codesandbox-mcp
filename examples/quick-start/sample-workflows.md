# Sample Workflows

This document provides additional workflow examples that demonstrate the power and flexibility of the CodeSandbox MCP server.

## Workflow 1: Full-Stack Application Setup

### Prompt Example:
```
Create a complete full-stack application setup with:
1. A React TypeScript frontend
2. A Node.js Express backend with TypeScript
3. Shared types between frontend and backend
4. Basic authentication setup
5. Database schema (using SQLite for simplicity)
```

### What the AI Will Do:
1. Create a new sandbox with a suitable template
2. Set up project structure with `frontend/`, `backend/`, and `shared/` directories
3. Configure TypeScript for both frontend and backend
4. Create shared type definitions
5. Set up basic authentication endpoints
6. Create database schema and initialization scripts

## Workflow 2: Code Review and Refactoring

### Prompt Example:
```
Please review the code in sandbox [SANDBOX_ID] and:
1. Identify potential improvements
2. Refactor any code that doesn't follow best practices
3. Add proper TypeScript types where missing
4. Improve error handling
5. Add comprehensive comments
```

### What the AI Will Do:
1. Read all source files using `readFile`
2. Analyze code structure and patterns
3. Identify issues and improvement opportunities
4. Rewrite files with improvements using `writeFile`
5. Provide detailed explanations of changes made

## Workflow 3: API Documentation Generation

### Prompt Example:
```
Analyze the Express API in sandbox [SANDBOX_ID] and:
1. Generate comprehensive API documentation
2. Create example requests and responses
3. Add OpenAPI/Swagger specification
4. Create a README with usage examples
```

### What the AI Will Do:
1. Read API route files and controllers
2. Extract endpoint definitions and parameters
3. Generate markdown documentation
4. Create OpenAPI specification file
5. Write comprehensive README with examples

## Workflow 4: Testing Setup

### Prompt Example:
```
Set up a complete testing environment for sandbox [SANDBOX_ID]:
1. Configure Jest for unit testing
2. Set up Cypress for e2e testing
3. Create sample test files
4. Add test scripts to package.json
5. Set up CI/CD configuration
```

### What the AI Will Do:
1. Install and configure testing frameworks
2. Create test configuration files
3. Write sample tests for existing code
4. Update package.json with test scripts
5. Create GitHub Actions workflow file

## Workflow 5: Performance Optimization

### Prompt Example:
```
Analyze and optimize the performance of the application in sandbox [SANDBOX_ID]:
1. Identify performance bottlenecks
2. Optimize bundle size
3. Implement code splitting
4. Add performance monitoring
5. Create a performance report
```

### What the AI Will Do:
1. Analyze bundle composition and dependencies
2. Implement lazy loading and code splitting
3. Optimize images and assets
4. Add performance monitoring tools
5. Generate detailed performance analysis report

## Workflow 6: Migration from Local to CodeSandbox

### Prompt Example:
```
Help me migrate my local project to CodeSandbox:
1. Analyze the local project structure
2. Create appropriate sandbox template
3. Transfer all files maintaining structure
4. Update configuration for cloud environment
5. Ensure all dependencies work in CodeSandbox
```

### What the AI Will Do:
1. Create new sandbox with appropriate template
2. Recreate directory structure using `mkdir` equivalent operations
3. Transfer files using `writeFile`
4. Update configuration files for cloud environment
5. Verify all dependencies and scripts work

## Workflow 7: Collaborative Development Setup

### Prompt Example:
```
Set up a collaborative development environment:
1. Create multiple sessions with different permissions
2. Set up shared environment variables
3. Create development guidelines
4. Set up git configuration for team
5. Create collaboration documentation
```

### What the AI Will Do:
1. Create multiple sessions using `createSession`
2. Set up appropriate permissions and environment variables
3. Create development workflow documentation
4. Configure git settings for collaboration
5. Create team onboarding guide

## Workflow 8: Debugging Assistance

### Prompt Example:
```
Help me debug the application in sandbox [SANDBOX_ID]:
1. Analyze error logs and console output
2. Review recent changes that might cause issues
3. Suggest debugging strategies
4. Add debugging tools and logging
5. Create step-by-step debugging guide
```

### What the AI Will Do:
1. Read log files and error outputs
2. Analyze recent code changes
3. Add console.log statements and debugging tools
4. Suggest debugging approaches
5. Create debugging documentation

## Best Practices for Workflow Prompts

### 1. Be Specific
- Include exact sandbox IDs when working with existing sandboxes
- Specify file paths when referring to particular files
- Mention specific technologies and frameworks you're using

### 2. Provide Context
- Explain the purpose of your application
- Mention any constraints or requirements
- Share relevant background information

### 3. Request Step-by-Step Actions
- Ask for explanations of what will be done
- Request confirmation before major changes
- Ask for progress updates during long operations

### 4. Ask for Documentation
- Request explanations of changes made
- Ask for usage instructions
- Request best practices recommendations

### 5. Verify Results
- Ask the AI to test changes after implementation
- Request verification of functionality
- Ask for summaries of what was accomplished

## Advanced Techniques

### Chaining Operations
You can chain multiple operations in a single prompt:

```
First, create a new React sandbox, then set up ESLint and Prettier, 
then create a component library structure, and finally add Storybook 
for component documentation.
```

### Conditional Operations
Use conditional logic in your prompts:

```
If the sandbox [SANDBOX_ID] is using JavaScript, convert it to TypeScript. 
If it's already using TypeScript, optimize the type definitions and 
add stricter compiler options.
```

### Batch Operations
Process multiple items at once:

```
For each component in the src/components directory of sandbox [SANDBOX_ID], 
add proper TypeScript interfaces, improve accessibility, and add unit tests.
```

## Tips for Effective Workflows

1. **Start Small**: Begin with simple operations and gradually build complexity
2. **Test Frequently**: Ask the AI to test changes after each major modification
3. **Document Everything**: Request documentation for all changes and decisions
4. **Use Version Control**: Take advantage of CodeSandbox's built-in version control
5. **Collaborate**: Share sandboxes with team members for review and feedback

## Getting Help

If you need help with any of these workflows:

1. Check the [troubleshooting guide](./troubleshooting.md)
2. Review the [advanced usage documentation](./advanced-usage.md)
3. Open an issue on GitHub with specific details about your use case