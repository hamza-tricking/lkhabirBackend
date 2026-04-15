import RealEstateCourseThankYouPage from '@/app/components/RealEstateCourseThankYouPage';
import FacebookPixel from '@/app/components/FacebookPixel';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "شكراً للتسجيل في الدورة المكثفة - الخبير للعقارات",
  description: "تم استلام طلبك في الدورة المكثفة للعقارات بنجاح! سنتواصل معك خلال 24 ساعة للتأكيد",
  openGraph: {
    title: "شكراً للتسجيل في الدورة المكثفة - الخبير للعقارات",
    description: "تم استلام طلبك بنجاح!",
    type: "website",
    locale: "ar_DZ",
    siteName: "الخبير للعقارات",
  },
};

export default function RealEstateCourseThankYou() {
  return <RealEstateCourseThankYouPage />;
}
