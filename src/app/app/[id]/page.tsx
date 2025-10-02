"use server";

import { getApp } from "@/actions/get-app";
import { createApp } from "@/actions/create-app";
import AppWrapper from "../../../components/app-wrapper";
import { freestyle } from "@/lib/freestyle";
import { db } from "@/db/schema";
import { appUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUser } from "@/auth/stack-auth";
import { memory } from "@/mastra/agents/builder";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/dist/client/link";
import { chatState } from "@/actions/chat-streaming";
import { redirect } from "next/navigation";

export default async function AppPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { id } = await params;
  const search = await searchParams;

  const user = await getUser();

  // Check if this is a new app creation request
  const isNew = search.isNew === "true";
  let message: string | undefined;
  
  if (isNew) {
    if (Array.isArray(search.message)) {
      message = search.message[0];
    } else {
      message = search.message;
    }
    
    if (message) {
      // Create the new app
      const newApp = await createApp({
        initialMessage: decodeURIComponent(message),
      });
      
      // Redirect to the actual app ID
      redirect(`/app/${newApp.id}`);
    }
  }

  const userPermission = (
    await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.userId, user.userId))
      .limit(1)
  ).at(0);

  if (!userPermission?.permissions) {
    return <ProjectNotFound />;
  }

  const app = await getApp(id).catch(() => undefined);

  if (!app) {
    return <ProjectNotFound />;
  }

  const { uiMessages } = await memory.query({
    threadId: id,
    resourceId: id,
  });

  const { codeServerUrl, ephemeralUrl } = await freestyle.requestDevServer({
    repoId: app?.info.gitRepo,
  });

  console.log("requested dev server");

  // Use the previewDomain from the database, or fall back to a generated domain
  const domain = app.info.previewDomain;

  return (
    <AppWrapper
      key={app.info.id}
      baseId={app.info.baseId}
      codeServerUrl={codeServerUrl}
      appName={app.info.name}
      initialMessages={uiMessages}
      consoleUrl={ephemeralUrl + "/__console"}
      repo={app.info.gitRepo}
      appId={app.info.id}
      repoId={app.info.gitRepo}
      domain={domain ?? undefined}
      running={(await chatState(app.info.id)).state === "running"}
    />
  );
}

function ProjectNotFound() {
  return (
    <div className="text-center my-16">
      Project not found or you don&apos;t have permission to access it.
      <div className="flex justify-center mt-4">
        <Link className={buttonVariants()} href="/">
          Go back to home
        </Link>
      </div>
    </div>
  );
}
