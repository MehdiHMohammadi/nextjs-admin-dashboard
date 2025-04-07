"use client";
import "@/css/style.css";

import { Figtree } from "next/font/google";
import localFont from 'next/font/local'
import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
// import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

import ToastProvider  from '@/components/ToastProvider';
// 
import { usePathname  } from 'next/navigation';




const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "700", "800", "900"],
});

const yekanbakh = localFont({
  src: [
      {
          path: "../fonts/yekanbakh/YekanBakhFaNum-Thin.woff2",
          weight: "100",
          style: "normal",
      },
      {
          path: "../fonts/yekanbakh/YekanBakhFaNum-Light.woff2",
          weight: "300",
          style: "normal",
      },
      {
          path: "../fonts/yekanbakh/YekanBakhFaNum-Regular.woff2",
          weight: "400",
          style: "normal",
      },
      {
          path: "../fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2",
          weight: "600",
          style: "normal",
      },
      {
          path: "../fonts/yekanbakh/YekanBakhFaNum-Bold.woff2",
          weight: "700",
          style: "normal",
      },
      {
          path: "../fonts/yekanbakh/YekanBakhFaNum-Black.woff2",
          weight: "900",
          style: "normal",
      },
  ],
  variable: "--font-yekanbakh",
});

// export const metadata: Metadata = {
//   title: {
//     template: "%s |پنل کاربری کوشا گروپ",
//     default: "پنل کاربری کوشا گروپ",
//   },
//   description:
//     "کوشا گروپ ، سیستم هوش مصنوعی حقوقی با قابلیت مشاوره و معرفی وکیل",
// };

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  // if (router.includes('/login') || router.includes('/register')) {
  //   return children;
  // }
  if (pathname === "/sign-in") {
    return ( <html
      dir="rtl"
      lang="fa"
      className={`${yekanbakh.variable} ${figtree.variable} `}
      suppressHydrationWarning
    >
      <body>
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </body>
    </html>);
  }
  return (
    <html dir="rtl" lang="fa"  className={`${yekanbakh.variable} ${figtree.variable} `}  suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
