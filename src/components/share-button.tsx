"use client";

import { Button } from "@/components/ui/button";
import {
  Share2Icon,
  LinkIcon,
  CopyIcon,
  ExternalLinkIcon,
  RocketIcon,
  Loader2Icon,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { publishApp } from "@/actions/publish-app";
import { useState } from "react";

interface ShareButtonProps {
  className?: string;
  domain?: string;
  appId: string;
}

export function ShareButton({ className, domain, appId }: ShareButtonProps) {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await publishApp({
        appId: appId,
      });
      toast.success("Latest version published successfully!");
    } catch (error) {
      toast.error("Failed to publish app");
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Button
      variant="default"
      size="default"
      className={`flex items-center gap-2 bg-black text-white hover:bg-gray-800 h-10 px-2 ${className || ""}`}
      onClick={handlePublish}
      disabled={isPublishing}
    >
      {isPublishing && (
        <Loader2Icon className="h-5 w-5 animate-spin" />
      )}
      <span style={{ fontSize: '15px', fontFamily: 'Pretendard, system-ui, sans-serif', fontWeight: 600 }}>
        Publish
      </span>
    </Button>
  );
}
