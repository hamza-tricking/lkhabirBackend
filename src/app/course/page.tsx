import CoursePage from '@/app/components/CoursePage';
import FacebookPixel from '@/app/components/FacebookPixel';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "دورة العقارات المتكاملة - الخبير للعقارات | 6 أشهر متابعة شخصية",
  description: "انضم إلى دورة العقارات الأحترافية - 6 أشهر تدريب عملي مع متابعة من محامية وخبير تسويق. احترف الوساطة العقارية وابدأ مسيرتك المهنية",
  keywords: ["دورة عقارية", "تدريب عقاري", "وساطة عقارية", "خبير عقاري", "دورة 6 أشهر", "محامية عقارية", "تسويق عقاري"],
  openGraph: {
    title: "دورة العقارات المتكاملة - الخبير للعقارات",
    description: "دورة احترافية 6 أشهر مع متابعة شخصية من محامية وخبير تسويق",
    type: "website",
    locale: "ar_DZ",
    siteName: "الخبير للعقارات",
  },
};

export default function Course() {
  return (
    <>
      <FacebookPixel pixelId="1945744096374607" />
      <CoursePage />
    </>
  );
}
