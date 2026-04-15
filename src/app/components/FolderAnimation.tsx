'use client';

import styles from './FolderAnimation.module.css';

export default function FolderAnimation() {
  return (
    <div className={styles['home-media_folder-wrapper']}>
      <div className={styles['home-media_folder-block']}>
        <img 
          src="https://cdn.prod.website-files.com/6864f039b26f4afedada6bc5/6864f039b26f4afedada6c12_folder-back.svg" 
          loading="lazy" 
          alt="" 
          className={styles['folder-back']}
        />
        <img 
          src="https://cdn.prod.website-files.com/6864f039b26f4afedada6bc6/6864f039b26f4afedada6d04_walrus-logo.svg" 
          loading="lazy" 
          alt="" 
          className={styles['folder-paper']}
        />
        <img 
          src="https://cdn.prod.website-files.com/6864f039b26f4afedada6bc5/6864f039b26f4afedada6c11_folder-front.svg" 
          loading="lazy" 
          alt="" 
          className={styles['folder-front']}
        />
      </div>
    </div>
  );
}
