import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Boilerplate Next.js Cloudflare App",
    description:
        "Full-stack Next.js application with Cloudflare Workers, D1 db, R2 storage, and Drizzle ORM.",
    icons: {
        icon: [
            { url: "/logo.png", sizes: "16x16" },
            { url: "/logo.png", sizes: "32x32" },
            { url: "/logo.png", sizes: "192x192", type: "image/png" },
        ],
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main>{children}</main>
                </ThemeProvider>
                <Toaster position="bottom-right" />
            </body>
        </html>
    );
}
