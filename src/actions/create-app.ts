"use server";

import { getUser } from "@/auth/stack-auth";
import { appsTable, appUsers } from "@/db/schema";
import { db } from "@/db/schema";
import { freestyle } from "@/lib/freestyle";
import { templates } from "@/lib/templates";
import { selectBestTemplate } from "@/lib/template-selector";
import { memory, builderAgent } from "@/mastra/agents/builder";
import { sendMessageWithStreaming } from "@/lib/internal/stream-manager";

export async function createApp({
  initialMessage,
}: {
  initialMessage?: string;
}) {
  console.time("get user");
  const user = await getUser();
  console.timeEnd("get user");

  if (!initialMessage) {
    throw new Error("Initial message is required for template selection");
  }

  console.time("template selection");
  const templateSelection = await selectBestTemplate(initialMessage);
  console.timeEnd("template selection");

  console.log(`Selected template: ${templateSelection.selectedTemplate.name} (confidence: ${templateSelection.confidence})`);
  console.log(`Reasoning: ${templateSelection.reasoning}`);

  console.time("git");
  const repo = await freestyle.createGitRepository({
    name: "Unnamed App",
    public: true,
    source: {
      type: "git",
      url: templateSelection.selectedTemplate.repo,
    },
  });
  await freestyle.grantGitPermission({
    identityId: user.freestyleIdentity,
    repoId: repo.repoId,
    permission: "write",
  });

  const token = await freestyle.createGitAccessToken({
    identityId: user.freestyleIdentity,
  });

  console.timeEnd("git");

  console.time("dev server");
  let mcpEphemeralUrl: string;
  let fs: any;
  let ephemeralUrl: string;
  
  try {
    const devServerResult = await freestyle.requestDevServer({
      repoId: repo.repoId,
    });
    console.timeEnd("dev server");
    
    ({ mcpEphemeralUrl, fs, ephemeralUrl } = devServerResult);
    console.log("Dev server created successfully:", { mcpEphemeralUrl, ephemeralUrl });
  } catch (error) {
    console.timeEnd("dev server");
    console.error("Failed to create dev server:", error);
    throw error;
  }

  console.time("database: create app");
  const app = await db.transaction(async (tx) => {
    const appInsertion = await tx
      .insert(appsTable)
      .values({
        gitRepo: repo.repoId,
        name: initialMessage,
      })
      .returning();

    await tx
      .insert(appUsers)
      .values({
        appId: appInsertion[0].id,
        userId: user.userId,
        permissions: "admin",
        freestyleAccessToken: token.token,
        freestyleAccessTokenId: token.id,
        freestyleIdentity: user.freestyleIdentity,
      })
      .returning();

    return appInsertion[0];
  });
  console.timeEnd("database: create app");

  console.time("mastra: create thread");
  await memory.createThread({
    threadId: app.id,
    resourceId: app.id,
  });
  console.timeEnd("mastra: create thread");

  if (initialMessage) {
    console.time("send initial message");

    // Send the initial message using the same infrastructure as the chat API
    await sendMessageWithStreaming(builderAgent, app.id, mcpEphemeralUrl, fs, {
      id: crypto.randomUUID(),
      parts: [
        {
          text: initialMessage,
          type: "text",
        },
      ],
      role: "user",
    });

    console.timeEnd("send initial message");
  }

  return app;
}
