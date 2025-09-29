"use client";

import { useRouter } from "next/navigation";
import { PromptInput, PromptInputActions } from "@/components/ui/prompt-input";
import Image from "next/image";
import LogoSvg from "@/logo.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExampleButton } from "@/components/ExampleButton";
import { UserButton } from "@stackframe/stack";
import { UserApps } from "@/components/user-apps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PromptInputTextareaWithTypingAnimation } from "@/components/prompt-input";
import { motion } from "framer-motion";
import { useEffect } from "react";

const queryClient = new QueryClient();

const typingOptions = [
  "a landing page for my...",
  "a dashboard to...",
  "a blog about...",
  "a personal portfolio of..."
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const [typingText, setTypingText] = useState("");
  const [baseText] = useState("Ask Dooi to create ");
  const router = useRouter();

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typeSpeed = 50;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      const currentOption = typingOptions[currentIndex];
      
      if (isDeleting) {
        currentText = currentOption.substring(0, currentText.length - 1);
        typeSpeed = 25;
      } else {
        currentText = currentOption.substring(0, currentText.length + 1);
        typeSpeed = 50;
      }

      setTypingText(currentText);

      if (!isDeleting && currentText === currentOption) {
        typeSpeed = 800; // Pause at end
        timeoutId = setTimeout(() => {
          isDeleting = true;
          typeText();
        }, typeSpeed);
        return;
      }

      if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % typingOptions.length;
        typeSpeed = 200; // Pause before next option
      }

      timeoutId = setTimeout(typeText, typeSpeed);
    };

    const initialTimer = setTimeout(typeText, 500); // Start after 0.5 seconds
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    router.push(
      `/app/new?message=${encodeURIComponent(prompt)}`
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen p-4 relative" style={{ 
        backgroundImage: 'url(/background.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        <div className="flex w-full justify-between items-center px-20">
          <Image
            className="dark:invert"
            src={LogoSvg}
            alt="Adorable Logo"
            width={90}
            height={90}
          />
          <div className="flex items-center gap-2 flex-1 justify-end">
            <UserButton />
          </div>
        </div>

        <div>
          <div className="w-full max-w-6xl px-4 sm:px-0 mx-auto flex flex-col items-center mt-52 sm:mt-60 md:mt-72 col-start-1 col-end-1 row-start-1 row-end-1 z-10">
            <p className="text-black text-center mb-2 font-semibold" style={{ fontSize: '40px', lineHeight: '1', fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            Your landing page <br />
            shouldn't look AI generated
            </p>

            {/* Hero Input Component */}
            <div className="flex justify-center items-center z-20 relative mt-8">
              <div style={{ width: '768px', height: '146px' }}>
              <div className="h-full flex flex-col">
                <motion.div
                  className="rounded-2xl h-full flex flex-col"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 12px rgba(0, 0, 0, 0.05)",
                  }}
                  whileHover={{ 
                    boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 8px 24px rgba(0, 0, 0, 0.15)" 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top Section - Input Area */}
                  <div className="flex-1" style={{ padding: '24px 26px' }}>
                    <div className="flex items-center w-full" style={{ gap: '12px' }}>
                      <motion.input
                        className="flex-1 bg-transparent text-black placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                        placeholder={baseText + typingText}
                        type="text"
                        value={projectDescription}
                        onChange={(e) => {
                          setProjectDescription(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                        onFocus={() => {
                          // Stop typing animation when user focuses on input
                          setTypingText("");
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Section - Action Buttons */}
                  <div className="flex items-center justify-between mt-auto" style={{ padding: '0 16px 16px 16px' }}>
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      {/* Plus button */}
                      <motion.button 
                        className="rounded-full bg-transparent flex items-center justify-center transition-transform"
                        style={{ width: '32px', height: '32px' }}
                        whileHover={{ scale: 1.25, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                          <path d="M8 3.33333V12.6667M3.33333 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>
                    
                    {/* Submit button */}
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="rounded-full flex items-center justify-center transition-all bg-black hover:bg-gray-800"
                      style={{ width: '32px', height: '32px' }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960" className="shrink-0 text-white" fill="currentColor">
                        <path d="M442.39-616.87 309.78-487.26q-11.82 11.83-27.78 11.33t-27.78-12.33q-11.83-11.83-11.83-27.78 0-15.96 11.83-27.79l198.43-199q11.83-11.82 28.35-11.82t28.35 11.82l198.43 199q11.83 11.83 11.83 27.79 0 15.95-11.83 27.78-11.82 11.83-27.78 11.83t-27.78-11.83L521.61-618.87v348.83q0 16.95-11.33 28.28-11.32 11.33-28.28 11.33t-28.28-11.33q-11.33-11.33-11.33-28.28z"></path>
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
              </div>
            </div>
            <Examples setPrompt={setPrompt} />
          </div>
        </div>
        
        {/* Hero 아래 새로운 섹션 */}
        <div className="w-full bg-white py-16 mt-44 max-w-7xl h-screen mx-auto rounded-3xl relative">
          <div className="absolute top-6 left-8 mt-2 font-sf-pro font-bold text-2xl text-gray-900 select-none" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif", fontWeight: 700 }}>
            Start from templates
          </div>
        </div>
        
        <div className="py-8 mx-0 sm:-mx-4">
          <UserApps />
        </div>
      </main>
    </QueryClientProvider>
  );
}

function Examples({ setPrompt }: { setPrompt: (text: string) => void }) {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-3 px-2 w-full max-w-4xl mx-auto">
        <ExampleButton
          text="Dog Food Marketplace"
          promptText="Build a dog food marketplace where users can browse and purchase premium dog food."
          onClick={(text) => {
            console.log("Example clicked:", text);
            setPrompt(text);
          }}
        />
        <ExampleButton
          text="Personal Website"
          promptText="Create a personal website with portfolio, blog, and contact sections."
          onClick={(text) => {
            console.log("Example clicked:", text);
            setPrompt(text);
          }}
        />
        <ExampleButton
          text="Burrito B2B SaaS"
          promptText="Build a B2B SaaS for burrito shops to manage inventory, orders, and delivery logistics."
          onClick={(text) => {
            console.log("Example clicked:", text);
            setPrompt(text);
          }}
        />
      </div>
    </div>
  );
}
