'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Video {
  id: number;
  title: string;
  url: string;
  description?: string;
  watched: boolean;
  progress: number;
}

interface CourseLevel {
  id: number;
  title: string;
  videos: Video[];
}

export default function ClientDashboard() {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [courseLevels, setCourseLevels] = useState<CourseLevel[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if a section is unlocked
  const isSectionUnlocked = (sectionTitle: string) => {
    if (!user?.unlockedSections) return false;
    return user.unlockedSections.includes(sectionTitle);
  };

  // Initialize course data
  useEffect(() => {
    const levels: CourseLevel[] = [
      {
        id: 1,
        title: "القانون العقاري",
        videos: [
          { id: 1, title: "افتتاحية دورة الخبير للعقارات", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769544197/1_favvci.mp4", watched: false, progress: 0 },
          { id: 2, title: "الدرس الأول الوثائق و العقود  ", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769544955/2.mp4_pkdm0q.mp4", watched: false, progress: 0 },
          { id: 3, title: "لوثائق و العقود الدرس الثاني المحافظة العقارية", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769546549/3.mp4_xsyuhw.mp4", watched: false, progress: 0 },
          { id: 4, title: "الوثائق و العقود الدرس الثالث مسح الأراضي", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769547287/4.mp4_fzgqak.mp4", watched: false, progress: 0 },
          { id: 5, title: "الوثائق و العقود الدرس الرابع الفريضة", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769548215/5.mp4_ahgnsc.mp4", watched: false, progress: 0 },
          { id: 6, title: "الاراضي الدرس الأول", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769549386/6.Mp4_cr3mwu.mp4", watched: false, progress: 0 },
          { id: 7, title: "الاراضي الدرس الثاني", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769550200/7.Mp4_rkbzkc.mp4", watched: false, progress: 0 },
          { id: 8, title: "الشيوع فالعقار", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769550996/8.Mp4_qqmgyz.mp4", watched: false, progress: 0 },
          { id: 9, title: "الأراضي الغير مسموح البناء فيها", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769552115/9.mp4_j9hmjp.mp4", watched: false, progress: 0 },
          { id: 10, title: "الشقق المبنية من طرف الدولة الدرس الأول", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769556249/10.mp4_ncz7ln.mp4", watched: false, progress: 0 },
          { id: 11, title: "الشقق المبنية من طرف الدولة الدرس الثاني", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769556841/11.mp4_vrd6ng.mp4", watched: false, progress: 0 },
          { id: 12, title: "الشقق المبنية من طرف الدولة الدرس الثالث", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769557577/12.mp4_ler0vf.mp4", watched: false, progress: 0 },
          { id: 13, title: "الشقق المبنية من طرف الدولة الدرس الرابع", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769558063/13.mp4_xaizrx.mp4", watched: false, progress: 0 },
          { id: 14, title: "الشقق المبنية من طرف الدولة الدرس الخامس", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769558437/14.mp4_qpjaix.mp4", watched: false, progress: 0 },
          { id: 15, title: "الشقق المبنية من طرف المرقي العقاري الدرس الأول", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769558995/15.mp4_h9im9t.mp4", watched: false, progress: 0 },
          { id: 16, title: "الشقق المبنية من طرف المرقي العقاري الدرس الثاني", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769559618/16.mp4_qnkjdp.mp4", watched: false, progress: 0 },
          { id: 17, title: "الشقق المبنية من طرف المرقي العقاري الدرس الثالث", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769559995/17.mp4_s7dofs.mp4", watched: false, progress: 0 },
          { id: 18, title: "الشقق المبنية من طرف المرقي العقاري الدرس الرابع", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769560399/18.mp4_jq83um.mp4", watched: false, progress: 0 },
          { id: 19, title: "الشقق المبنية من طرف المرقي العقاري الدرس الخامس", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769560657/19.mp4_kwu9mv.mp4", watched: false, progress: 0 },
          { id: 20, title: "الشقق المبنية من طرف المرقي العقاري الدرس السادس", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1769561080/20.mp4_kytmu5.mp4", watched: false, progress: 0 }
        ]
      },
      {
        id: 2,
        title: "قسم التسويق العقاري",
        videos: [
          { 
            id: 6, 
            title: "الدرس الأول - حالة العقار", 
            description: "حالة العقار تعني الوضع الحالي للعقار من حيث الصيانة، التشطيب، العمر، والاستخدام",
            url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1770421112/lecture20_g1anpm.mp4", 
            watched: false, 
            progress: 0 
          },
          { 
            id: 7, 
            title: "الدرس الثاني", 
            url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1770422240/Lecture21_xnr772.mp4", 
            watched: false, 
            progress: 0 
          },
          { 
            id: 8, 
            title: "الدرس الثالث - السعر", 
            description: "السعر هو القيمة المالية المطلوبة مقابل شراء أو تأجير العقار",
            url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1770422908/lecture22_e2a7eb.mp4", 
            watched: false, 
            progress: 0 
          },
          { 
            id: 9, 
            title: "الدرس الرابع - عقلية السمسار", 
            description: "عقلية السمسار تقوم على الذكاء في التفاوض وفهم احتياجات الطرفين لتحقيق صفقة ناجحة",
            url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1770423899/lecture23_xgu2np.mp4", 
            watched: false, 
            progress: 0 
          },
          { 
            id: 10, 
            title: "الدرس الخامس - التفاوض", 
            description: "التفاوض هو عملية نقاش بين طرفين أو أكثر للوصول إلى اتفاق يرضي الجميع",
            url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1770425400/Lecture24_neqjjo.mp4", 
            watched: false, 
            progress: 0 
          },
          { 
            id: 11, 
            title: "الدرس السادس - كيف تجد زبائن و عقارات", 
            description: "يمكنك إيجاد الزبائن والعقارات عبر التسويق الإلكتروني وبناء شبكة علاقات عقارية فعالة",
            url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1770426540/Lecture25_lagmk6.mp4", 
            watched: false, 
            progress: 0 
          },
          { 
            id: 12, 
            title: "الدرس السابع - البيع في مواقع التواصل الإجتماعي", 
            description: "البيع في مواقع التواصل الاجتماعي يتم عبر عرض منتجاتك بطريقة جذابة والتفاعل المستمر مع العملاء لبناء الثقة وتحفيز الشراء",
            url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1770427389/Lecture26_hwkh67.mp4", 
            watched: false, 
            progress: 0 
          }
        ]
      },
      {
        id: 3,
        title: "الدورة المكثفة",
        videos: [
          { id: 13, title: "ميثاق الخبير: مَن هو وائل؟ وما هو سر هذا النظام؟", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774366446/khabir1_1_l4pnr3.mp4", watched: false, progress: 0 },
          { id: 14, title: "خارطة الطريق: اكتشف تخصصك المربح في عالم العقارات", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774372039/Khabir1_2_kiw0qd.mp4", watched: false, progress: 0 },
          { id: 15, title: "عتاد الخبير: الأدوات الذكية التي تجعل منك وسيطاً ناجحاً", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774365615/Khabir1_3_vqovtn.mp4", watched: false, progress: 0 },
          { id: 16, title: "أطراف اللعبة: مَن هم اللاعبون في السوق وكيف تتعامل معهم؟", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774365823/Khabir1_4_ma7pyp.mp4", watched: false, progress: 0 },
          { id: 17, title: "وصايا ما قبل الانطلاق: نصائح ذهبية تحميك وتختصر عليك السنوات", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774360575/khabir1_5_kejltl.mp4", watched: false, progress: 0 },
          { id: 18, title: "شرح نظام الخبير: المحرك السري لإدارة الصفقات بنجاح", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774365099/Khabir1_6_mzcmcf.mp4", watched: false, progress: 0 },
          { id: 19, title: "صمام الأمان: الوثائق القانونية التي يجب فحصها قبل الشراء", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774367041/khabir1_7_pikcb0.mp4", watched: false, progress: 0 },
          { id: 20, title: "بوصلة الموقع: كيف تكتشف 'الهمزة' وتفرق بين العقارات؟", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774367056/khabir1_8_l0byni.mp4", watched: false, progress: 0 },
          { id: 21, title: "هندسة السعر: أسرار التقييم الدقيق وتقدير الأتعاب بذكاء", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774366929/khabir1_9_tscqnt.mp4", watched: false, progress: 0 },
          { id: 22, title: "فن الاستحواذ: كيف تقنع أصحاب العقارات بالعمل معك؟", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774364995/khabir1_10_cfbh3j.mp4", watched: false, progress: 0 },
          { id: 23, title: "سيكولوجية الزبائن: كيف تفرز المشترين وتغلق الصفقات؟", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774367050/khabir1_11_jpqbjw.mp4", watched: false, progress: 0 },
          { id: 24, title: "سلطان التجارة: هل العقار مربح فعلاً؟ وكيف تبني ثروتك؟", url: "https://res.cloudinary.com/dgywxqq50/video/upload/v1774367186/khabir1_12_bbpo75.mp4", watched: false, progress: 0 }
        ]
      }
    ];

    // Add the new locked section
    levels.push({
      id: 4,
      title: "البيع العقاري",
      videos: []
    });

    // Load progress from localStorage
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      
      // Merge saved progress with new course structure
      const mergedLevels = levels.map((level: CourseLevel) => {
        const savedLevel = parsed.find((savedLevel: CourseLevel) => savedLevel.id === level.id);
        if (savedLevel) {
          // Merge saved video progress with new video data
          return {
            ...level,
            videos: level.videos.map((video: Video) => {
              const savedVideo = savedLevel.videos.find((savedVideo: Video) => savedVideo.id === video.id);
              return savedVideo ? { ...video, watched: savedVideo.watched, progress: savedVideo.progress } : video;
            })
          };
        }
        return level;
      });
      
      setCourseLevels(mergedLevels);
      
      // Find last watched video
      const lastLevel = mergedLevels.find((level: CourseLevel) => 
        level.videos.some((video: Video) => !video.watched)
      );
      if (lastLevel) {
        setSelectedLevel(lastLevel.id);
        const lastUnwatchedIndex = lastLevel.videos.findIndex((video: Video) => !video.watched);
        setCurrentVideoIndex(lastUnwatchedIndex >= 0 ? lastUnwatchedIndex : 0);
      }
    } else {
      setCourseLevels(levels);
    }
  }, []);

  // Set initial selected level to first unlocked section (only runs once)
  useEffect(() => {
    const firstUnlockedLevel = courseLevels.find(level => isSectionUnlocked(level.title));
    if (firstUnlockedLevel && selectedLevel === 1) { // Only set if still on default value
      setSelectedLevel(firstUnlockedLevel.id);
      setCurrentVideoIndex(0);
    }
  }, [courseLevels.length]); // Only depend on courseLevels being loaded

  // Save progress to localStorage
  const saveProgress = (updatedLevels: CourseLevel[]) => {
    localStorage.setItem('courseProgress', JSON.stringify(updatedLevels));
    setCourseLevels(updatedLevels);
  };

  // Handle video play/pause states
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  // Handle video progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const progress = (video.currentTime / video.duration) * 100;
      
      const updatedLevels = courseLevels.map(level => {
        if (level.id === selectedLevel) {
          return {
            ...level,
            videos: level.videos.map((v, index) => 
              index === currentVideoIndex 
                ? { ...v, progress: Math.min(progress, 100) }
                : v
            )
          };
        }
        return level;
      });
      
      saveProgress(updatedLevels);
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    const updatedLevels = courseLevels.map(level => {
      if (level.id === selectedLevel) {
        return {
          ...level,
          videos: level.videos.map((v, index) => 
            index === currentVideoIndex 
              ? { ...v, watched: true, progress: 100 }
              : v
          )
        };
      }
      return level;
    });
    
    saveProgress(updatedLevels);
  };

  // Navigation functions
  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setTimeout(() => {
        const videoPlayerElement = document.getElementById('video-player-section');
        if (videoPlayerElement) {
          videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleNext = () => {
    const currentLevel = courseLevels.find(level => level.id === selectedLevel);
    if (currentLevel && currentVideoIndex < currentLevel.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setTimeout(() => {
        const videoPlayerElement = document.getElementById('video-player-section');
        if (videoPlayerElement) {
          videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const selectVideo = (videoIndex: number) => {
    setCurrentVideoIndex(videoIndex);
    setTimeout(() => {
      const videoPlayerElement = document.getElementById('video-player-section');
      if (videoPlayerElement) {
        videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (courseLevels.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-[#684F36]">جاري التحميل...</div>
    </div>;
  }

  const currentLevel = courseLevels.find(level => level.id === selectedLevel);
  const currentVideo = currentLevel?.videos[currentVideoIndex];
  const isCurrentLevelUnlocked = currentLevel ? isSectionUnlocked(currentLevel.title) : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE0BD] via-[#D4AF37]/10 to-[#B39977]/20">
      {/* Dashboard Navigation Bar */}
      <div className="mt-10 mb-8">
        <div className="container mx-auto px-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
            
            <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Paid Courses Section */}
                <div className="group cursor-pointer" onClick={() => {
                  const videoPlayerElement = document.getElementById('video-player-section');
                  if (videoPlayerElement) {
                    videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}>
                  <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 hover:from-[#B39977]/20 hover:to-[#684F36]/20 transition-all duration-300 border-2 border-[#B39977]/20 hover:border-[#B39977]/40">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 mx-2 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#342519] mb-1">الدورات المدفوعة</h3>
                      <p className="text-sm text-[#684F36]/70">5 فيديو تعليمي</p>
                      <div className="mt-2">
                        <div className="flex items-center text-xs text-[#B39977]">
                          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>متاح الآن</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Information Section */}
                <div className="group cursor-pointer">
                  <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 hover:from-[#B39977]/20 hover:to-[#684F36]/20 transition-all duration-300 border-2 border-[#B39977]/20 hover:border-[#B39977]/40">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 mx-2 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#342519] mb-1">لوحة التحكم</h3>
                      <p className="text-sm text-[#684F36]/70">العميل</p>
                      <div className="mt-2">
                        <div className="flex items-center text-xs text-green-600">
                          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>نشط</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#342519] mb-2">منصة التعلم العقاري</h1>
            <p className="text-[#684F36]/70">مرحباً بك في دوراتك المدفوعة!</p>
          </div>
        </div>

        {/* Course Level Selector */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
            
            <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
              <h3 className="text-lg font-bold text-[#342519] mb-4">اختر القسم</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courseLevels.map((level) => {
                  const isUnlocked = isSectionUnlocked(level.title);
                  return (
                    <div
                      key={level.id}
                      onClick={() => {
                        if (isUnlocked) {
                          setSelectedLevel(level.id);
                          setCurrentVideoIndex(0);
                          setTimeout(() => {
                            const videoPlayerElement = document.getElementById('video-player-section');
                            if (videoPlayerElement) {
                              videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }
                      }}
                      className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                        isUnlocked
                          ? selectedLevel === level.id
                            ? 'bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 border-[#B39977]/50 cursor-pointer'
                            : 'hover:bg-[#B39977]/10 border-transparent hover:border-[#B39977]/30 cursor-pointer'
                          : 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 mx-2 rounded-full flex items-center justify-center ${
                            isUnlocked
                              ? selectedLevel === level.id
                                ? 'bg-gradient-to-r from-[#B39977] to-[#684F36]'
                                : 'bg-[#B39977]/30'
                              : 'bg-gray-400'
                          }`}>
                            <span className={`text-sm font-bold ${
                              isUnlocked
                                ? selectedLevel === level.id ? 'text-white' : 'text-[#684F36]'
                                : 'text-gray-600'
                            }`}>
                              {level.id}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            isUnlocked
                              ? selectedLevel === level.id ? 'text-[#342519]' : 'text-[#684F36]/80'
                              : 'text-gray-500'
                          }`}>
                            {level.title}
                          </h4>
                          <p className="text-sm text-[#684F36]/60">
                            {level.videos.length} فيديو تعليمي
                          </p>
                          {!isUnlocked && (
                            <p className="text-xs text-red-500 mt-1">
                              🔒 يجب الدفع للوصول
                            </p>
                          )}
                        </div>
                        
                        {isUnlocked && selectedLevel === level.id && (
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div id="video-player-section" className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
              
              <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
                {isCurrentLevelUnlocked ? (
                  <>
                    {/* Video Title */}
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-[#342519] mb-2">
                        {currentVideo?.title}
                      </h2>
                      <div className="flex items-center justify-between text-sm text-[#684F36]/70">
                        <span>فيديو {currentVideoIndex + 1} من {currentLevel?.videos.length}</span>
                        {currentVideo?.watched && (
                          <span className="flex items-center text-green-600">
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            تم المشاهدة
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Video Player */}
                    <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                      <video
                        ref={videoRef}
                        key={currentVideo?.url}
                        className="w-full aspect-video"
                        controlsList="nodownload"
                        controls
                        disablePictureInPicture
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleVideoEnd}
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                        onDoubleClick={() => {
                          if (videoRef.current) {
                            const video = videoRef.current as any;
                            if (video.requestFullscreen) {
                              video.requestFullscreen();
                            } else if (video.webkitRequestFullscreen) {
                              video.webkitRequestFullscreen();
                            } else if (video.mozRequestFullScreen) {
                              video.mozRequestFullScreen();
                            } else if (video.msRequestFullscreen) {
                              video.msRequestFullscreen();
                            }
                          }
                        }}
                        preload="metadata"
                        playsInline
                      >
                        <source src={currentVideo?.url} type="video/mp4" />
                        متصفحك لا يدعم تشغيل الفيديو.
                      </video>
                    </div>

                    {/* Progress Bar */}
                    {currentVideo && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-[#684F36]/70 mb-1">
                          <span>التقدم</span>
                          <span>{Math.round(currentVideo.progress)}%</span>
                        </div>
                        <div className="w-full bg-[#B39977]/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#B39977] to-[#684F36] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${currentVideo.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={handlePrevious}
                        disabled={currentVideoIndex === 0}
                        className="bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        السابق
                      </button>
                      
                      <div className="text-center">
                        <span className="text-[#684F36]/70">
                          {currentVideoIndex + 1} / {currentLevel?.videos.length}
                        </span>
                      </div>
                      
                      <button
                        onClick={handleNext}
                        disabled={currentVideoIndex === (currentLevel?.videos.length || 0) - 1}
                        className="bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        التالي
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#342519] mb-2">
                      {currentLevel?.title}
                    </h3>
                    <p className="text-[#684F36]/70 mb-4">
                      هذا القسم مقفل حالياً
                    </p>
                    <p className="text-sm text-red-500 mb-6">
                      🔒 يجب الدفع للوصول إلى محتوى هذا القسم
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-[#684F36]/60">
                        يتضمن هذا القسم {currentLevel?.videos.length} فيديو تعليمي
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video List Sidebar */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="absolute  -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
              
              <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6 max-h-[600px] overflow-y-auto">
                <h3 className="text-lg font-bold text-[#342519] mb-4">
                  {currentLevel?.title}
                </h3>
                
                {isCurrentLevelUnlocked ? (
                  <div className="space-y-2">
                    {currentLevel?.videos.map((video, index) => (
                      <div
                        key={video.id}
                        onClick={() => selectVideo(index)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                          index === currentVideoIndex
                            ? 'bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 border-[#B39977]/50'
                            : 'hover:bg-[#B39977]/10 border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="flex-shrink-0">
                              {video.watched ? (
                                <div className="w-8 h-8 mx-2 bg-green-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-8 h-8 mx-2 bg-[#B39977]/30 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-[#684F36]">{index + 1}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                index === currentVideoIndex ? 'text-[#342519]' : 'text-[#684F36]/80'
                              }`}>
                                {video.title}
                              </p>
                              {video.description && (
                                <p className={`text-xs text-[#684F36]/60 mt-1 line-clamp-2 ${
                                  index === currentVideoIndex ? 'text-[#684F36]/80' : 'text-[#684F36]/50'
                                }`}>
                                  {video.description}
                                </p>
                              )}
                              {video.progress > 0 && !video.watched && (
                                <div className="mt-2">
                                  <div className="w-full bg-[#B39977]/20 rounded-full h-1">
                                    <div 
                                      className="bg-gradient-to-r from-[#B39977] to-[#684F36] h-1 rounded-full"
                                      style={{ width: `${video.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {index === currentVideoIndex && (
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-[#B39977] rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#684F36]/70 mb-2">
                      المحتوى غير متاح
                    </p>
                    <p className="text-sm text-red-500">
                      🔒 يجب الدفع لعرض الفيديوهات
                    </p>
                    <div className="mt-4 bg-gray-100 rounded-lg p-3">
                      <p className="text-xs text-[#684F36]/60">
                        {currentLevel?.videos.length} فيديو تعليمي
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
