"use client";

import Image from "next/image";
import {
  PromptInput,
  // PromptInputAction,
  // PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp, SquareIcon, Paperclip, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { compressImage, CompressedImage } from "@/lib/image-compression";

interface PromptInputBasicProps {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onSubmitWithImages?: (text: string, images: CompressedImage[]) => void;
  isGenerating?: boolean;
  input?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  stop: () => void;
}

export function PromptInputBasic({
  onSubmit: handleSubmit,
  onSubmitWithImages,
  stop,
  isGenerating = false,
  input = "",
  onValueChange,
  disabled,
}: PromptInputBasicProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoading(isGenerating);
  }, [isGenerating]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setIsCompressing(true);
    const newImages: CompressedImage[] = [];

    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        try {
          const compressed = await compressImage(file);
          newImages.push(compressed);
        } catch (error) {
          console.error("Failed to compress image:", error);
        }
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    setIsCompressing(false);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitWithData = () => {
    if (onSubmitWithImages && (input.trim() || images.length > 0)) {
      onSubmitWithImages(input, images);
      setImages([]);
    } else if (handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full">
      {/* Image previews */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image.data}
                alt={`Upload ${index + 1}`}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded border"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b text-center">
                {Math.round(image.compressedSize / 1024)}KB
              </div>
            </div>
          ))}
        </div>
      )}

      <PromptInput
        value={input}
        onValueChange={(value) => onValueChange?.(value)}
        isLoading={isLoading || isCompressing}
        onSubmit={handleSubmitWithData}
        className="w-[90%] mx-auto bg-white dark:bg-accent rounded-lg transition-all duration-200 ease-in-out border-0 mb-3 relative"
      >
        <PromptInputTextarea
          placeholder={
            isGenerating
              ? "Moov is moving..."
              : isCompressing
                ? "Compressing images..."
                : "Ask Moov..."
          }
          className="pr-10 bg-transparent dark:bg-transparent min-h-[80px]"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={handleSubmitWithData}
          disabled={isGenerating || disabled || (input.trim() === "" && images.length === 0)}
          className="absolute right-2 bottom-2 h-6 w-6 rounded-md bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
            <title>Send AI Message</title>
            <g transform="translate(4 4)">
              <path d="M 0 4 L 4 0 L 8 4" fill="transparent" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="text-white"></path>
              <path d="M 4 1.5 L 4 8" fill="transparent" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="text-white"></path>
            </g>
          </svg>
        </button>
      </PromptInput>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
