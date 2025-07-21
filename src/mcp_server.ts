import { McpServer } from "npm:@modelcontextprotocol/sdk/server/mcp.js";
import { addTools } from "./mcp_server_tools.ts";

/**
 * TODO:
 * Dirsearch - https://github.com/maurosoria/dirsearch
 */

const server = new McpServer({
  name: "security-mcp-server",
  version: "0.1.0",
}, {
  capabilities: {
    tools: {
      "nmap-scan-simple": false,
      "nmap-scan-advanced": false,
      "amass-surface-mapping": false,
      "tlsx-connection-verification": false,
      "hashcat": false,
    },
    resources: {
      // Data sources the AI can access and load into context
    },
    prompts: {
      // Reusable templates or guides for LLM interactions
    }
  },
});

addTools(server)

export default server;