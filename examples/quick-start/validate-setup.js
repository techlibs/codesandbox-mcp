#!/usr/bin/env node

/**
 * CodeSandbox MCP Setup Validator
 * 
 * This script helps validate your CodeSandbox MCP setup and configuration.
 * Run this before using the MCP server to catch common issues early.
 */

import { spawn } from 'child_process';
import { readFile, access } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(level, message) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const prefix = {
    info: `${colors.blue}ℹ${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    warning: `${colors.yellow}⚠${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`
  }[level];
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

async function checkNodeVersion() {
  log('info', 'Checking Node.js version...');
  
  return new Promise((resolve) => {
    const proc = spawn('node', ['--version']);
    let output = '';
    
    proc.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        const version = output.trim();
        const majorVersion = parseInt(version.replace('v', '').split('.')[0]);
        
        if (majorVersion >= 18) {
          log('success', `Node.js version ${version} is supported`);
          resolve(true);
        } else {
          log('error', `Node.js version ${version} is not supported. Please upgrade to Node.js 18+`);
          resolve(false);
        }
      } else {
        log('error', 'Could not determine Node.js version');
        resolve(false);
      }
    });
  });
}

async function checkMcpPackage() {
  log('info', 'Checking CodeSandbox MCP package availability...');
  
  return new Promise((resolve) => {
    const proc = spawn('npx', ['-y', '@techlibs/codesandbox-mcp@latest', '--help'], { 
      stdio: ['ignore', 'pipe', 'pipe'] 
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        log('success', 'CodeSandbox MCP package is available');
        resolve(true);
      } else {
        log('error', 'Could not access CodeSandbox MCP package');
        resolve(false);
      }
    });
  });
}

async function checkApiToken() {
  log('info', 'Checking for CodeSandbox API token...');
  
  const token = process.env.CODESANDBOX_API_TOKEN || process.env.CSB_API_KEY;
  
  if (token) {
    if (token.length > 10) {
      log('success', 'CodeSandbox API token found in environment');
      return true;
    } else {
      log('warning', 'API token found but seems too short');
      return false;
    }
  } else {
    log('error', 'No CodeSandbox API token found. Set CODESANDBOX_API_TOKEN or CSB_API_KEY');
    return false;
  }
}

async function checkClaudeConfig() {
  log('info', 'Checking Claude Desktop configuration...');
  
  const possiblePaths = [
    join(homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json'), // macOS
    join(homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json'), // Windows
    join(homedir(), '.config', 'claude', 'claude_desktop_config.json') // Linux
  ];
  
  for (const configPath of possiblePaths) {
    try {
      await access(configPath);
      const config = JSON.parse(await readFile(configPath, 'utf8'));
      
      if (config.mcpServers && Object.keys(config.mcpServers).some(key => 
        key.includes('codesandbox') || 
        (config.mcpServers[key].args && config.mcpServers[key].args.includes('@techlibs/codesandbox-mcp'))
      )) {
        log('success', `Claude Desktop config found with CodeSandbox MCP: ${configPath}`);
        return true;
      } else {
        log('warning', `Claude Desktop config found but no CodeSandbox MCP configuration: ${configPath}`);
        return false;
      }
    } catch (error) {
      // File doesn't exist or can't be read, continue to next path
    }
  }
  
  log('warning', 'No Claude Desktop configuration found');
  return false;
}

async function checkNetworkConnectivity() {
  log('info', 'Checking network connectivity to CodeSandbox...');
  
  return new Promise((resolve) => {
    const proc = spawn('curl', ['-I', '-s', '--max-time', '10', 'https://api.codesandbox.io/v1/status'], {
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        log('success', 'Network connectivity to CodeSandbox API is working');
        resolve(true);
      } else {
        log('warning', 'Could not verify network connectivity to CodeSandbox (curl not available or network issue)');
        resolve(false);
      }
    });
  });
}

async function printSummary(results) {
  console.log('\n' + colors.bold + '=== Setup Validation Summary ===' + colors.reset);
  
  const checks = [
    { name: 'Node.js Version', passed: results.nodeVersion },
    { name: 'MCP Package', passed: results.mcpPackage },
    { name: 'API Token', passed: results.apiToken },
    { name: 'Claude Config', passed: results.claudeConfig },
    { name: 'Network', passed: results.network }
  ];
  
  checks.forEach(check => {
    const status = check.passed ? `${colors.green}PASS${colors.reset}` : `${colors.red}FAIL${colors.reset}`;
    console.log(`  ${check.name.padEnd(15)} ${status}`);
  });
  
  const passedCount = checks.filter(c => c.passed).length;
  const totalCount = checks.length;
  
  console.log(`\nResult: ${passedCount}/${totalCount} checks passed`);
  
  if (passedCount === totalCount) {
    log('success', 'Your setup looks good! You should be able to use CodeSandbox MCP.');
  } else if (passedCount >= 3) {
    log('warning', 'Your setup has some issues but might still work. Check the failed items above.');
  } else {
    log('error', 'Your setup has significant issues. Please fix the failed items before proceeding.');
  }
  
  console.log('\nNext steps:');
  console.log('  1. Fix any failed checks above');
  console.log('  2. Run the interactive demo: see examples/quick-start/interactive-demo.md');
  console.log('  3. Start building with CodeSandbox MCP!');
}

async function main() {
  console.log(colors.bold + 'CodeSandbox MCP Setup Validator' + colors.reset);
  console.log('Checking your setup for common issues...\n');
  
  const results = {
    nodeVersion: await checkNodeVersion(),
    mcpPackage: await checkMcpPackage(),
    apiToken: await checkApiToken(),
    claudeConfig: await checkClaudeConfig(),
    network: await checkNetworkConnectivity()
  };
  
  await printSummary(results);
}

main().catch(error => {
  log('error', `Validation failed: ${error.message}`);
  process.exit(1);
});