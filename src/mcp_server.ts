import {
  McpServer,
  ResourceTemplate,
} from "npm:@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "npm:zod";
import { promisify } from "node:util";
import { exec } from "node:child_process";
const execAsync = promisify(exec);

const server = new McpServer({
  name: "security-mcp-server",
  version: "0.1.0",
}, {
  capabilities: {
    tools: {},
  },
});

server.tool(
  "nmap-scan-simple",
  "Simple Nmap scan of target with default options",
  {
    ipAddress: z.string().ip(),
  },
  async ({ ipAddress }) => {
    const { stdout, stderr } = await execAsync(`nmap ${ipAddress}`);
    if (stderr) {
      return {
        content: [
          {
            type: "text",
            text: `error result ${stderr}`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `scan results ${stdout}`,
        },
      ],
    };
  },
);

export default server;
