"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

// Declare the gtag function for TypeScript safety
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any[];
    }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Track dynamic route changes automatically
    useEffect(() => {
        if (!GA_ID || typeof window.gtag === "undefined") return;

        // Combine pathname and search parameters for the complete path string
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

        window.gtag("config", GA_ID, {
            page_path: url,
        });
    }, [pathname, searchParams]);

    if (!GA_ID) return null;

    return (
        <>
            {/* Load the core Google Analytics script tag asynchronously */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />

            {/* Initialize dataLayer and the default pageview tracking sequence */}
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}