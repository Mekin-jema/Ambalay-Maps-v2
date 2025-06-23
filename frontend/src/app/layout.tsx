"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ThemeProvider from "@/components/layout/theme-provider";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import Providers from "@/components/layout/providers";

export default function RootLayout({
  children,
  activeThemeValue,
}: Readonly<{ children: React.ReactNode; activeThemeValue: string }>) {

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Providers activeThemeValue={activeThemeValue || "light"}>
                  {/*   {children} */}

                  {children}
                </Providers>
                <Toaster />
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
