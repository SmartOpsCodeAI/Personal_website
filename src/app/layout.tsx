import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://qasimb.dev"),
  title: {
    default: "Qasim B. | AI Automation and Internal Tools",
    template: "%s | Qasim B.",
  },
  description:
    "Small AI-powered automations and internal tools that reduce admin and speed up operations for SMEs.",
  keywords: [
    "AI automation",
    "internal tools",
    "business systems",
    "operations automation",
    "SME process improvement",
  ],
  authors: [{ name: "Qasim B." }],
  creator: "Qasim B.",
  publisher: "Qasim B.",
  openGraph: {
    title: "Qasim B. | AI Automation and Internal Tools",
    description:
      "Practical AI automations, internal tools, and lightweight systems for business operations.",
    url: "https://qasimb.dev",
    siteName: "Qasim B.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qasim B. | AI Automation and Internal Tools",
    description:
      "Practical AI automations and internal tools that reduce admin and speed up operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="antialiased">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
          <header className="border-b border-[var(--border)] bg-white/95 backdrop-blur">
            <div className="site-container flex items-center justify-between py-5">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                Qasim B.
              </Link>
              <nav aria-label="Main navigation" className="flex gap-5 text-sm">
                <Link href="/services" className="site-link">
                  Services
                </Link>
                <Link href="/proof" className="site-link">
                  Proof
                </Link>
                <Link href="/background" className="site-link">
                  Background
                </Link>
                <Link href="/contact" className="site-link">
                  Contact
                </Link>
              </nav>
            </div>
          </header>
          <main id="main-content">{children}</main>
          <footer className="border-t border-[var(--border)] bg-white">
            <div className="site-container flex flex-col gap-3 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
              <p>Qasim B. - AI automation and internal tools</p>
              <p>UK and Saudi Arabia experience</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
