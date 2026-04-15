'use client';

import styles from './FolderAnimation.module.css';

export default function CustomFolderAnimation2() {
  return (
    <div>
      <div className={styles['folder']}>
        {/* Pages that fly out */}
        <div className={`${styles['page']} ${styles['page1']} `}>
          <img 
            src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769203183/aaa_tincm0.png" 
            alt="الخبير للعقارات" 
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className={`${styles['page']} ${styles['page2']}`}>
          <div className="w-full h-full rounded flex items-center justify-center">
            <span className="text-black font-bold text-lg">فلاش ديسك</span>
          </div>
        </div>
        <div className={`${styles['page']} ${styles['page3']}`}>
          <div className="w-full h-full rounded flex items-center justify-center">
            <span className="text-black font-bold text-lg">كتاب </span>
          </div>
        </div>
      </div>
    </div>
  );
}
