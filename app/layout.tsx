// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./global.css";
import StaticHeader from "@/components/v4/StaticHeader";
import Footer from "@/components/v4/Footer";

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
        <html lang="en" className="bg-black" data-scroll-behavior="smooth">
            <body className="min-h-screen bg-black text-white">
                <StaticHeader />
                <main className="pt-24">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
