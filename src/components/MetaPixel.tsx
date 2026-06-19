/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

// 1. Declare the type directly on the window object for this file
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fbq: (...args: any[]) => void;
    }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [pixelReady, setPixelReady] = useState(false);

    const trackPageView = () => {
        if (!PIXEL_ID || typeof window.fbq === "undefined") return;
        window.fbq("track", "PageView");
    };

    // Track the initial view and later route changes once the pixel bootstrap has run.
    useEffect(() => {
        if (pixelReady) return;

        let cancelled = false;

        const waitForPixel = () => {
            if (cancelled) return;

            if (typeof window.fbq !== "undefined") {
                setPixelReady(true);
                return;
            }

            window.setTimeout(waitForPixel, 100);
        };

        waitForPixel();

        return () => {
            cancelled = true;
        };
    }, [pixelReady]);

    useEffect(() => {
        if (!pixelReady) return;
        trackPageView();
    }, [pathname, searchParams, pixelReady]);

    if (!PIXEL_ID) return null;

    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                onLoad={() => setPixelReady(true)}
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
          `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
}