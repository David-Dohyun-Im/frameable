"use client";

import { requestDevServer as requestDevServerInner } from "./webview-actions";
import "./loader.css";
import {
  FreestyleDevServer,
  FreestyleDevServerHandle,
} from "freestyle-sandboxes/react/dev-server";
import { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { RefreshCwIcon, GitBranchIcon } from "lucide-react";
import { ShareButton } from "./share-button";

export default function WebView(props: {
  repo: string;
  baseId: string;
  appId: string;
  domain?: string;
}) {
  function requestDevServer({ repoId }: { repoId: string }) {
    return requestDevServerInner({ repoId });
  }

  // Apply background to iframe when it loads
  useEffect(() => {
    const applyIframeBackground = () => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        try {
          // Try to access iframe content if same origin
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            iframeDoc.body.style.backgroundImage = 'url(/drawingpaper.png)';
            iframeDoc.body.style.backgroundSize = 'cover';
            iframeDoc.body.style.backgroundPosition = 'center';
            iframeDoc.body.style.backgroundRepeat = 'no-repeat';
          }
        } catch (e) {
          // Cross-origin iframe, can't access content
          console.log('Cannot access iframe content due to CORS policy');
        }
      });
    };

    // Apply immediately and also when new iframes are added
    applyIframeBackground();
    
    // Watch for new iframes being added
    const observer = new MutationObserver(() => {
      applyIframeBackground();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  const devServerRef = useRef<FreestyleDevServerHandle>(null);

  return (
    <div 
      className="flex flex-col overflow-hidden h-screen border-l transition-opacity duration-700 mt-[2px]"
      style={{ 
        backgroundImage: 'url(/drawingpaper.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div 
        className="h-16 border-b border-gray-200 items-center flex px-4 bg-background sticky top-0 justify-end gap-2"
        style={{ 
          backgroundImage: 'url(/drawingpaper.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Button
          variant={"ghost"}
          size={"default"}
          className="h-10 w-10"
          onClick={() => devServerRef.current?.refresh()}
        >
          <RefreshCwIcon className="h-5 w-5" />
        </Button>
        <Button
          variant={"ghost"}
          size={"default"}
          className="bg-white text-black hover:bg-gray-100 h-10 px-2"
          style={{ 
            fontFamily: 'var(--font-gt-walsheim), system-ui, sans-serif', 
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          Make it Moov
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
        <ShareButton domain={props.domain} appId={props.appId} />
      </div>
      <div 
        className="flex-1 relative"
        style={{
          backgroundImage: 'url(/drawingpaper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <FreestyleDevServer
          ref={devServerRef}
          actions={{ requestDevServer }}
          repoId={props.repo}
          loadingComponent={({ iframeLoading, devCommandRunning }) =>
            !devCommandRunning && (
              <div 
                className="flex items-center justify-center h-full"
                style={{ 
                  backgroundImage: 'url(/drawingpaper.png)', 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div>
                  <div className="text-center text-lg font-medium">
                    {iframeLoading ? "JavaScript Loading" : "Starting VM"}
                  </div>
                  <div className="mt-4">
                    <div className="loader" style={{ transform: 'scale(1.2)' }}></div>
                  </div>
                </div>
              </div>
            )
          }
        />
      </div>
    </div>
  );
}
