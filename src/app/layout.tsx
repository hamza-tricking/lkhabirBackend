import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FacebookPixel from "./components/FacebookPixel";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "الخبير للعقارات - El Khabir Immobilier | دورة وفلاشة عقارية",
  description: "احترف العقارات مع الخبير - دورة متكاملة 6 أشهر مع متابعة من محامية وخبير تسويق، وفلاشة USB تحتوي على كل ما تحتاجه للنجاح في مجال العقارات بالجزائر",
  keywords: ["عقارات", "دورة عقارية", "فلاشة عقارية", "وساطة عقارية", "الخبير للعقارات", "El Khabir Immobilier", "تسويق عقاري", "قانون عقاري", "عقارات الجزائر"],
  authors: [{ name: "El Khabir Immobilier" }],
  other: {
    'facebook-domain-verification': '5eketf46xdwuf7vvr3k5vd390j9tl3',
  },
  openGraph: {
    title: "الخبير للعقارات - دورة وفلاشة عقارية احترافية",
    description: "انطلق في عالم العقارات مع دورة متكاملة وفلاشة تحتوي على كل الأدوات اللازمة للنجاح",
    type: "website",
    locale: "ar_DZ",
    siteName: "الخبير للعقارات",
  },
  twitter: {
    card: "summary_large_image",
    title: "الخبير للعقارات - دورة وفلاشة عقارية",
    description: "احترف العقارات مع دورة 6 أشهر وفلاشة USB شاملة",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        {/* Facebook Pixel Script */}
        <script
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
              fbq('init', '1945744096374607');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}} 
            src="https://www.facebook.com/tr?id=1945744096374607&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <FacebookPixel pixelId="1945744096374607" />
        <NotificationProvider>
          <AuthProvider>
            <Navbar />  
            
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
