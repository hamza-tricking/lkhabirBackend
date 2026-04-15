'use client';

import { useEffect } from 'react';

// Add Facebook Pixel type declaration
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: object) => void;
  }
}

interface FacebookPixelProps {
  pixelId: string;
}

export default function FacebookPixel({ pixelId }: FacebookPixelProps) {
  useEffect(() => {
    // Only load on client side
    if (typeof window === 'undefined') return;

    console.log('🔍 Facebook Pixel: Initializing with ID:', pixelId);

    // Try multiple methods to initialize Facebook Pixel
    try {
      // Method 1: Direct script load with inline initialization
      if (!window.fbq) {
        console.log('🔍 Facebook Pixel: Method 1 - Loading script...');
        
        const script = document.createElement('script');
        script.innerHTML = `
          (function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `;
        
        script.onload = () => {
          console.log('🔍 Facebook Pixel: Method 1 - Script loaded');
          console.log('🔍 Facebook Pixel: fbq type:', typeof window.fbq);
          console.log('🔍 Facebook Pixel: fbq exists:', !!window.fbq);
        };
        
        script.onerror = () => {
          console.error('🔍 Facebook Pixel: Method 1 - Script load failed');
        };
        
        document.head.appendChild(script);

        // Add noscript fallback
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `
          <img height="1" width="1" style="display:none" 
          src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>
        `;
        document.head.appendChild(noscript);

        // Method 2: Fallback - Try loading via src if method 1 fails
        setTimeout(() => {
          if (!window.fbq) {
            console.log('🔍 Facebook Pixel: Method 2 - Trying fallback...');
            const fallbackScript = document.createElement('script');
            fallbackScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
            fallbackScript.onload = () => {
              console.log('🔍 Facebook Pixel: Method 2 - Fallback loaded');
              if (window.fbq) {
                window.fbq('init', pixelId);
                window.fbq('track', 'PageView');
                console.log('🔍 Facebook Pixel: Method 2 - Initialized');
              }
            };
            fallbackScript.onerror = () => {
              console.error('🔍 Facebook Pixel: Both methods failed');
            };
            document.head.appendChild(fallbackScript);
          }
        }, 2000);
      } else {
        console.log('🔍 Facebook Pixel: Already initialized, tracking PageView');
        window.fbq('track', 'PageView');
      }
    } catch (error) {
      console.error('🔍 Facebook Pixel: Initialization error:', error);
    }
  }, [pixelId]);

  // Return a div to ensure component renders
  return <div id="facebook-pixel" />;
}
