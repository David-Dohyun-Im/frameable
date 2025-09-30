import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { stackServerApp } from "@/auth/stack-auth";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gtWalsheim = localFont({
  src: [
    {
      path: "../../public/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Walsheim-Medium-Trial-BF651b7fc728fb3.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Walsheim-Bold-Trial-BF651b7fc737c57.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gt-walsheim",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Moov",
  description: "Open Source AI App Builder",
  manifest: "/manifest.json",
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  //   userScalable: false,
  //   viewportFit: "cover",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head> */}
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} ${gtWalsheim.variable} antialiased`
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <Toaster />

          <StackProvider app={stackServerApp}>
            <StackTheme>{children}</StackTheme>
          </StackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
