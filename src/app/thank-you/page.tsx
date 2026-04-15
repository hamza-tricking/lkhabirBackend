import ThankYouPage from '@/app/components/ThankYouPage';
import FacebookPixel from '@/app/components/FacebookPixel';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "شكراً لتسجيلك في دورة العقارات - الخبير للعقارات",
  description: "تم استلام طلبك بنجاح! سيتواصل معك فريق الخبير للعقارات قريباً لتأكيد التسجيل وبدء رحلتك في عالم العقارات",
  openGraph: {
    title: "شكراً لتسجيلك - الخبير للعقارات",
    description: "تم استلام طلبك بنجاح! نحن متحمسون لانطلاقك في عالم العقارات",
    type: "website",
    locale: "ar_DZ",
    siteName: "الخبير للعقارات",
  },
};

export default function ThankYou() {
  return (
    <>
      <FacebookPixel pixelId="1945744096374607" />
      <ThankYouPage />
    </>
  );
}
