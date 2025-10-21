'use client'

import {
  LogLevel,
  StatsigProvider,
} from "@statsig/react-bindings";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = {
    userID: "user-123", // add additional parameters as needed
  };
  return (
    <html lang="en">
      <body>
        <StatsigProvider
          sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
          user={user}
          options={{
            logLevel: LogLevel.Debug,
            plugins: [
              new StatsigAutoCapturePlugin(),
              new StatsigSessionReplayPlugin(),
            ],
          }}
        >
          {children}
        </StatsigProvider>
      </body>
    </html>
  );
}
