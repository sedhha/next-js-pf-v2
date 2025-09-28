// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import "./global.css";
import StaticHeader from "@/components/v4/ClientHeader";
import Footer from "@/components/v4/Footer";

// Font configurations
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jetbrains-mono',
});

const baseUrl =
    process.env.NEXT_PUBLIC_WEBSITE || "https://shivam-sahil.vercel.app";
const siteName = "Shivam Sahil | Developer";
const title = siteName;
const description =
    "Shivam Sahil is a tech enthusiast building open-source apps with AI/ML, robotics, IoT, computer vision, and API automation. 1.8+ years of web dev; loves collaborating and brainstorming bold ideas.";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: title,
        template: "%s · Shivam Sahil",
    },
    description,
    keywords: [
        "AI consultant",
        "RAG pipelines",
        "LangChain developer",
        "OpenAI",
        "Full-stack LLM engineer",
        "Next.js",
        "TypeScript",
    ],
    authors: [{ name: "Shivam Sahil" }],
    openGraph: {
        type: "website",
        url: baseUrl,
        siteName,
        title,
        description,
        images: [
            {
                url: "/meta-image.jpg", // 1200x630 image in /public
                width: 1200,
                height: 630,
                alt: "Shivam Sahil — Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/meta-image.jpg"],
    },
    alternates: {
        canonical: baseUrl,
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/chat-icon.png",
        apple: "/chat-icon.png",
    },
    applicationName: siteName,
};

// Optional viewport export (no theme color)
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} bg-black overflow-x-hidden`}
            data-scroll-behavior="smooth"
        >
            <body className="min-h-screen bg-black text-white overflow-x-hidden">
                <StaticHeader />
                <main className="pt-24 overflow-x-hidden">
                    {children}
                    <SpeedInsights />
                </main>
                <Footer />
            </body>
        </html>
    );
}
