import {
  ArrowUpRightIcon,
  ComputerIcon,
  GlobeIcon,
  HomeIcon,
  TerminalIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function TopBar({
  appName,
  children,
  repoId,
  consoleUrl,
  codeServerUrl,
}: {
  appName: string;
  children?: React.ReactNode;
  repoId: string;
  consoleUrl: string;
  codeServerUrl: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div 
      className="h-16 sticky top-0 flex items-center px-6 bg-background justify-between"
      style={{ 
        backgroundImage: 'url(/drawingpaper.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <div 
            className="text-black font-medium cursor-pointer" 
            style={{ 
              fontSize: '28px', 
              fontFamily: 'var(--font-gt-walsheim), system-ui, sans-serif', 
              fontWeight: 500 
            }}
          >
            Moov
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Open In</DialogTitle>
          </DialogHeader>
          <div>
            <div className="flex flex-col gap-2 pb-4">
              <div className="font-bold mt-4 flex items-center gap-2">
                <GlobeIcon className="inline h-4 w-4 ml-1" />
                Browser
              </div>
              <div>
                <a href={codeServerUrl} target="_blank" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src="/logos/vscode.svg"
                        className="h-4 w-4"
                        alt="VS Code Logo"
                      />
                      <span>VS Code</span>
                    </div>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              <div>
                <a href={consoleUrl} target="_blank" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <TerminalIcon className="h-4 w-4" />
                      <span>Console</span>
                    </div>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Button>
                </a>
              </div>

              {/* <div className="font-bold mt-4 flex items-center gap-2">
                <ComputerIcon className="inline h-4 w-4 ml-1" />
                Local
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                  onClick={() => {
                    navigator.clipboard.writeText();
                    setModalOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="/logos/vscode.svg"
                      className="h-4 w-4"
                      alt="VS Code Logo"
                    />
                    <span>VS Code Remote</span>
                  </div>
                  <span>Copy Command</span>
                </Button>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                  onClick={() => {
                    navigator.clipboard.writeText(`ssh ${}@vm-ssh`);
                    setModalOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <TerminalIcon className="h-4 w-4" />
                    <span>SSH</span>
                  </div>
                  <span>Copy Command</span>
                </Button>
              </div> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2 mt-0.5">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.90121 2.89119C6.79387 -0.995969 13.1217 -0.954636 17.0382 2.96183C20.9563 6.87997 20.996 13.2116 17.1038 17.1038C13.2115 20.996 6.87993 20.9563 2.96179 17.0382C0.639887 14.7163 -0.318934 11.5486 0.0927892 8.54482C0.150482 8.1239 0.538461 7.82951 0.959354 7.8872C1.38026 7.9449 1.67469 8.33282 1.61701 8.75375C1.26831 11.2976 2.07982 13.9805 4.04964 15.9504C7.37731 19.2781 12.7348 19.297 16.0159 16.0159C19.297 12.7348 19.278 7.37736 15.9503 4.04968C12.6243 0.723703 7.27066 0.702965 3.98908 3.97905L4.75595 3.9829C5.18078 3.98504 5.52344 4.33116 5.5213 4.75599C5.51917 5.18082 5.17305 5.52348 4.74822 5.52135L2.1374 5.50823C1.71558 5.50611 1.37416 5.16468 1.37204 4.74287L1.35892 2.13204C1.35678 1.70722 1.69945 1.3611 2.12428 1.35895C2.54911 1.35682 2.89523 1.69949 2.89736 2.12432L2.90121 2.89119ZM9.9999 5.12813C10.4247 5.12813 10.7691 5.47253 10.7691 5.89736V9.68134L13.1079 12.0201C13.4083 12.3205 13.4083 12.8076 13.1079 13.1079C12.8075 13.4083 12.3204 13.4083 12.0201 13.1079L9.23067 10.3186V5.89736C9.23067 5.47253 9.57508 5.12813 9.9999 5.12813Z" fill="black"/>
        </svg>
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
          <path fillRule="evenodd" clipRule="evenodd" d="M17.2256 19.9844C17.9617 19.9836 18.6674 19.6905 19.1876 19.1695C19.7078 18.6486 20 17.9425 20 17.2062L20 2.77824C20 2.04141 19.7073 1.33475 19.1864 0.813729C18.6655 0.292707 17.9589 8.72784e-07 17.2222 8.72784e-07L2.77778 8.72784e-07C2.04106 8.72784e-07 1.33453 0.292707 0.813591 0.813729C0.292657 1.33475 -9.53674e-07 2.04141 -9.53674e-07 2.77824L-9.53674e-07 17.2218C-1.21652e-06 17.5869 0.0719587 17.9484 0.211763 18.2857C0.351568 18.623 0.556476 18.9294 0.81477 19.1874C1.07306 19.4455 1.37968 19.6501 1.71708 19.7895C2.05448 19.9289 2.41605 20.0004 2.78111 20L17.2256 19.9844ZM17.7778 2.77824L17.7778 17.2062C17.7778 17.3536 17.7192 17.4949 17.6151 17.5991C17.5109 17.7033 17.3696 17.7618 17.2222 17.7618L7.77778 17.7774L7.77778 2.22259H17.2222C17.3696 2.22259 17.5109 2.28113 17.6151 2.38534C17.7192 2.48954 17.7778 2.63087 17.7778 2.77824Z" fill="black"/>
        </svg>
      </div>
    </div>
  );
}
