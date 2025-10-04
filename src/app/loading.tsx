"use client";

import { TopBar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import { ShareButton } from "@/components/share-button";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { useState } from "react";

export default function Loading() {
  const [isDesignMode, setIsDesignMode] = useState(false);
  
  return (
    <div 
      className="h-screen flex flex-col" 
      style={{ 
        height: "100dvh",
        backgroundImage: 'url(/drawingpaper.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Desktop and Mobile container */}
      <div 
        className="flex-1 overflow-hidden flex flex-col md:grid md:grid-cols-[0.8fr_2.2fr]"
        style={{ 
          backgroundImage: 'url(/drawingpaper.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Chat component placeholder */}
        <div className="h-full overflow-hidden flex flex-col">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ 
              backgroundImage: 'url(/drawingpaper.png)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Preview component with loading */}
        <div className="overflow-auto">
          <div className="h-full overflow-hidden relative">
            {/* WebView loading component */}
            <div 
              className="flex flex-col overflow-hidden h-screen transition-opacity duration-700 mt-[2px]"
              style={{ 
                backgroundImage: 'url(/drawingpaper.png)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Top bar */}
              <div 
                className="h-16 items-center flex pr-4 bg-background sticky top-0 justify-between gap-2 rounded-tr-lg"
                style={{ 
                  backgroundImage: 'url(/drawingpaper.png)', 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Left */}
                <div 
                  className="border-black rounded-md flex" 
                  style={{ 
                    width: '60px', 
                    height: '26px',
                    borderWidth: '1px'
                  }}
                >
                  {/* Left SVG area - 노란색 배경 */}
                  <div 
                    className="flex items-center justify-center border-r border-black rounded-l-lg"
                    style={{ 
                      width: '30px', 
                      height: '100%',
                      backgroundColor: '#FFF5D1'
                    }}
                  >
                    {/* Globe icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  
                  {/* Right SVG area */}
                  <div 
                    className="flex items-center justify-center rounded-r-lg"
                    style={{ 
                      width: '30px', 
                      height: '100%'
                    }}
                  >
                    {/* Code icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>
                </div>

                {/* Center: URL bar */}
                <div 
                  className="flex items-center gap-2 px-3 border border-black rounded-md"
                  style={{ 
                    height: '30px',
                    minWidth: '186px',
                    marginLeft: '160px'
                  }}
                >
                  {/* Device icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  
                  {/* URL text */}
                  <span className="text-sm font-medium">Loading...</span>
                  
                  {/* Right icons */}
                  <div className="flex items-center gap-1 ml-auto">
                    {/* External link icon */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    
                    {/* Refresh icon */}
                    <RefreshCwIcon className="h-3 w-3" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Right: Make it Moov, GitHub, and Publish buttons */}
                <div className="flex items-center gap-2">
                  
          <Button
            variant={"ghost"}
            size={"default"}
            className={`h-10 px-2 transition-all duration-300 ${
              isDesignMode 
                ? 'bg-white text-black border-2 border-black' 
                : 'bg-white text-black border-2 border-transparent'
            }`}
            style={{ 
              fontFamily: 'var(--font-gt-walsheim), system-ui, sans-serif', 
              fontWeight: 500,
              fontSize: '16px',
              backgroundColor: '#ffffff',
              color: '#000000'
            }}
            onClick={() => setIsDesignMode(!isDesignMode)}
          >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.72128 2.30043C5.15443 1.84339 4.30991 2.23829 4.2972 2.96633L4.12404 12.8866C4.10956 13.7161 5.14985 14.0982 5.67569 13.4565L8.17402 10.4078C8.3606 10.1802 8.64105 10.0504 8.93529 10.0555L12.9319 10.1253C13.7649 10.1398 14.145 9.09217 13.4964 8.5693L5.72128 2.30043Z" fill="currentColor"/>
                    </svg>

                    Design
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"default"}
                    className="bg-white text-black hover:bg-gray-100 h-10 w-10"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
                      <g clipPath="url(#clip0_389_661)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9642 0C5.34833 0 0 5.27083 0 11.7916C0 17.0039 3.42686 21.4161 8.18082 22.9777C8.77518 23.0951 8.9929 22.724 8.9929 22.4118C8.9929 22.1385 8.97331 21.2014 8.97331 20.2251C5.64514 20.9281 4.95208 18.8195 4.95208 18.8195C4.41722 17.4529 3.62473 17.1017 3.62473 17.1017C2.53543 16.3794 3.70408 16.3794 3.70408 16.3794C4.91241 16.4575 5.54645 17.5897 5.54645 17.5897C6.61592 19.3856 8.33927 18.8782 9.03257 18.5658C9.13151 17.8044 9.44865 17.2773 9.78539 16.9845C7.13094 16.7112 4.33812 15.6961 4.33812 11.1667C4.33812 9.87826 4.81322 8.82409 5.56604 8.00424C5.44727 7.71147 5.03118 6.50085 5.68506 4.88055C5.68506 4.88055 6.69527 4.56814 8.97306 6.09093C9.94827 5.83282 10.954 5.70151 11.9642 5.70041C12.9744 5.70041 14.0042 5.83721 14.9552 6.09093C17.2332 4.56814 18.2434 4.88055 18.2434 4.88055C18.8973 6.50085 18.481 7.71147 18.3622 8.00424C19.1349 8.82409 19.5904 9.87826 19.5904 11.1667C19.5904 15.6961 16.7976 16.6915 14.1233 16.9845C14.5592 17.3554 14.9353 18.0581 14.9353 19.171C14.9353 20.7522 14.9158 22.0213 14.9158 22.4116C14.9158 22.724 15.1337 23.0951 15.7278 22.978C20.4818 21.4159 23.9087 17.0039 23.9087 11.7916C23.9282 5.27083 18.5603 0 11.9642 0Z" fill="currentColor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_389_661">
                          <rect width="24" height="23" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </Button>
                  <ShareButton domain={undefined} appId="loading" />
                </div>
              </div>

              {/* Loading content area */}
              <div 
                className="flex-1 relative shadow-2xl rounded-lg overflow-visible"
                style={{
                  backgroundImage: 'url(/drawingpaper.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div 
                  className="flex items-center justify-center h-full"
                  style={{ 
                    backgroundImage: 'url(/drawingpaper.png)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="relative flex justify-center w-full">
                    <div className="opacity-100 w-full max-w-lg">
                      <Terminal className="max-h-[500px] w-full bg-white text-gray-800 border-gray-300" sequence={false}>
                        <TypingAnimation className="text-gray-800" delay={0}>moov analyze --design-intent</TypingAnimation>
                        <AnimatedSpan className="text-blue-600" delay={1000}>✔ Understanding user's design vision</AnimatedSpan>
                        <AnimatedSpan className="text-blue-600" delay={2000}>✔ Analyzing brand personality</AnimatedSpan>
                        <AnimatedSpan className="text-blue-600" delay={3000}>✔ Extracting design preferences</AnimatedSpan>
                        <TypingAnimation className="text-gray-800" delay={4000}>Decoding your creative vision...</TypingAnimation>
                        <AnimatedSpan className="text-orange-500" delay={6000}>🎨 Design intent captured!</AnimatedSpan>
                      </Terminal>
                    </div>
                    
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg opacity-0 transition-opacity duration-500" style={{ animation: 'fadeIn 0.5s ease-in-out 8s forwards' }}>
                      <Terminal className="max-h-[500px] w-full bg-white text-gray-800 border-gray-300" sequence={false}>
                        <TypingAnimation className="text-gray-800" delay={8000}>moov design --color-system</TypingAnimation>
                        <AnimatedSpan className="text-blue-600" delay={9000}>✔ Setting color palette</AnimatedSpan>
                        <AnimatedSpan className="text-blue-600" delay={10000}>✔ Configuring typography</AnimatedSpan>
                        <AnimatedSpan className="text-blue-600" delay={11000}>✔ Crafting copywriting tone</AnimatedSpan>
                        <TypingAnimation className="text-gray-800" delay={12000}>Building visual foundation...</TypingAnimation>
                        <AnimatedSpan className="text-orange-500" delay={14000}>🎨 Design system ready!</AnimatedSpan>
                      </Terminal>
                    </div>
                    
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg opacity-0 transition-opacity duration-500" style={{ animation: 'fadeIn 0.5s ease-in-out 16s forwards' }}>
                      <Terminal className="max-h-[500px] w-full bg-white text-gray-800 border-gray-300" sequence={false}>
                        <TypingAnimation className="text-gray-800" delay={16000}>moov build --components</TypingAnimation>
                        <AnimatedSpan className="text-blue-600" delay={17000}>✔ Arranging component layout</AnimatedSpan>
                        <AnimatedSpan className="text-blue-600" delay={18000}>✔ Refining component details</AnimatedSpan>
                        <AnimatedSpan className="text-blue-600" delay={19000}>✔ Optimizing user experience</AnimatedSpan>
                        <TypingAnimation className="text-gray-800" delay={20000}>Perfecting every interaction...</TypingAnimation>
                        <AnimatedSpan className="text-orange-500" delay={22000}>✨ Your masterpiece is ready!</AnimatedSpan>
                      </Terminal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
