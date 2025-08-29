import { z } from "npm:zod";
import { promisify } from "node:util";
import { exec } from "node:child_process";
import { McpServer } from "npm:@modelcontextprotocol/sdk/server/mcp.js";
const execAsync = promisify(exec);

export const addTools = (server: McpServer) => {
  
  // Add an addition tool
  server.registerTool("add", {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() },
  }, async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  }));

  server.tool(
    "nmap-scan-simple",
    "Simple Nmap scan of target with default options",
    {
      ipAddress: z.string().ip(), //z.string().ip(), // Convert to array of strings?
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

  server.tool(
    "nmap-scan-advanced",
    "Advanced Nmap scan, pass all the arguments required",
    {
      nmapArgs: z.string(),
    },
    async ({ nmapArgs }) => {
      const { stdout, stderr } = await execAsync(`nmap ${nmapArgs}`);
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

  server.tool(
    "amass-surface-mapping",
    "OWASP Project. For network mapping of attack surfaces and external asset discovery using open source intelligence gathering and reconnaissance techniques",
    {
      subCommand: z.enum(["intel", "enum", "viz", "track", "db"]),
      amassArgs: z.string(),
    },
    async ({ subCommand, amassArgs }) => {
      const { stdout, stderr } = await execAsync(
        `amass ${subCommand} ${amassArgs}`,
      );
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

  server.tool(
    "tlsx-connection-verification",
    "Tool for TLS based data collection. TLS Ciphers, Certificates and other SSL/TLS details of the target.",
    {
      tlsxArgs: z.string(),
    },
    async ({ tlsxArgs }) => {
      console.log(`tlsxArgs: ${tlsxArgs}`);
      const { stdout, stderr } = await execAsync(`tlsx ${tlsxArgs}`);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
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

  server.tool(
    "hashcat",
    "hashcat password recovery tool",
    {
      hashcatArgs: z.string(),
    },
    async ({ hashcatArgs }) => {
      const { stdout, stderr } = await execAsync(`hashcat ${hashcatArgs}`);
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
};
