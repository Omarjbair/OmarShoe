import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children,}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                <NextTopLoader color="#2563EB" height={3} showSpinner={false}/>
                {children}
            </body>
        </html>
    );
};