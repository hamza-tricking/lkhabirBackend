import FacebookPixel from '@/app/components/FacebookPixel';
import ChallengeThankYouPage from '@/app/components/ChallengeThankYouPage';

export const metadata = {
  title: 'شكراً - FSD Challenge',
  description: 'شكراً لانضمامك إلى تحدي FSD! استعد لبدء رحلتك نحو أول صفقة عقارية ناجحة.',
  openGraph: {
    title: 'شكراً - FSD Challenge',
    description: 'شكراً لانضمامك إلى تحدي FSD! استعد لبدء رحلتك نحو أول صفقة عقارية ناجحة.',
    url: 'https://states-ashy.vercel.app/challenge/thank-you',
    siteName: 'FSD Challenge',
    images: [
      {
        url: 'https://res.cloudinary.com/dgywxqq50/video/upload/v1771377800/IMG_0217_j4kyxc.mp4',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ar_DZ',
    type: 'website',
  },
};

export default function ThankYou() {
  return (
    <>
      <FacebookPixel pixelId="1945744096374607" />
      <ChallengeThankYouPage />
    </>
  );
}
