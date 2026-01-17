import React from 'react';
import styles from './HoverCard.module.css';

const HoverCard = ({ provinceName, totalReports, top3 }) => {
  // kalo nda ada nama provinsi, nda tampilkan apa-apa
  if (!provinceName) return null;

  const topList = Object.entries(top3).sort((a,b)=> b[1] - a[1])

  return (
    <div 
      className={styles.cardContainer}
    >
      <div className={styles.header}>
        <h3 className={styles.provinceName}>{provinceName}</h3>
        <span className={styles.badge}>{totalReports}</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.content}>
        <p className={styles.subTitle}>Top 3 Laporan:</p>
        <ul className={styles.list}>
          {top3 && topList.map((item, index) => (
            <>
            {index < 3?(
              <li key={index} className={styles.listItem}>
                <span className={styles.rank}>#{index + 1}</span>
                <span className={styles.issue}>{item[0]}</span>
                <span className={styles.count}>{item[1]}</span>
              </li>
            ):null}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HoverCard;