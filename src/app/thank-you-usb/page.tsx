import USBThankYouPage from '@/app/components/USBThankYouPage';
import FacebookPixel from '@/app/components/FacebookPixel';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "شكراً لطلب الفلاش العقاري - الخبير للعقارات",
  description: "تم استلام طلب الفلاش العقاري بنجاح! سنتواصل معك خلال 24 ساعة للتأكيد والتوصيل لكل أنحاء الجزائر",
  openGraph: {
    title: "شكراً لطلب الفلاش - الخبير للعقارات",
    description: "تم استلام طلبك بنجاح! ستحصل على الفلاش العقاري مع كتاب هدية",
    type: "website",
    locale: "ar_DZ",
    siteName: "الخبير للعقارات",
  },
};

export default function USBThankYou() {
  return (
    <>
      <FacebookPixel pixelId="1945744096374607" />
      <USBThankYouPage />
    </>
  );
}
