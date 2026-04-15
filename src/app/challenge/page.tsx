import ChallengePage from '@/app/components/ChallengePage';
import FacebookPixel from '@/app/components/FacebookPixel';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FSD Challenge — First Successful Deal - الخبير للعقارات | 30 يوم تحدي عقاري",
  description: "انضم إلى تحدي FSD - أول صفقة عقارية ناجحة في 30 يوم فقط. برنامج تدريبي عملي 100% أونلاين مع خطوة بخطوة من الصفر حتى أول صفقة ناجحة",
  keywords: ["تحدي عقاري", "FSD challenge", "أول صفقة عقارية", "تدريب عقاري عملي", "وساطة عقارية", "تحدي 30 يوم"],
  openGraph: {
    title: "FSD Challenge — First Successful Deal - الخبير للعقارات",
    description: "أقوى تحدي عقاري في الجزائر: أول صفقة عقارية ناجحة في 30 يوم فقط",
    type: "website",
    locale: "ar_DZ",
    siteName: "الخبير للعقارات",
  },
};

export default function Challenge() {
  return <ChallengePage />;
}
