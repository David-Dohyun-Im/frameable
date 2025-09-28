/**
 * 🚀 AI Builder - Main Exports
 *
 * This is the main entry point for the AI Builder library.
 * Import what you need to customize your AI app!
 */

// Agent configuration - customize your AI's behavior
export { SYSTEM_MESSAGE } from "./system";

// Internal services - for advanced usage with custom agents
export { AIService } from "./internal/ai-service";
export {
  sendMessageWithStreaming,
  getStreamState,
  isStreamRunning,
  stopStream,
  waitForStreamToStop,
  clearStreamState,
  getStream,
  setStream,
  setupAbortCallback,
  updateKeepAlive,
  handleStreamLifecycle,
} from "./internal/stream-manager";

// Pre-configured agent (uses the default todo tool)
export { builderAgent } from "@/mastra/agents/builder";

// Todo tool for task management
export { todoTool } from "../tools/todo-tool";

// Type exports for TypeScript
export type { UIMessage } from "ai";
export type { Agent } from "@mastra/core/agent";

/**
 * 🎯 Quick Start Examples
 *
 * // Use the default builder agent
 * import { builderAgent, sendMessageWithStreaming } from "@/lib";
 *
 * const response = await sendMessageWithStreaming(
 *   builderAgent,
 *   appId,
 *   mcpUrl,
 *   userMessage
 * );
 *
 * // Create your own custom agent
 * import { Agent } from "@mastra/core/agent";
 * import { anthropic } from "@ai-sdk/anthropic";
 * import { Memory } from "@mastra/memory";
 * import { PostgresStore, PgVector } from "@mastra/pg";
 *
 * const myCustomAgent = new Agent({
 *   name: "MyCustomAgent",
 *   model: anthropic("claude-4-sonnet-20250514"),
 *   instructions: "Your custom instructions here",
 *   memory: new Memory({
 *     options: { lastMessages: 1000 },
 *     vector: new PgVector({ connectionString: process.env.DATABASE_URL! }),
 *     storage: new PostgresStore({ connectionString: process.env.DATABASE_URL! }),
 *   }),
 *   tools: {
 *     your_custom_tool: yourTool,
 *   },
 * });
 *
 * // Use your custom agent with all the streaming and durability features
 * const response = await sendMessageWithStreaming(
 *   myCustomAgent,
 *   appId,
 *   mcpUrl,
 *   userMessage
 * );
 */
