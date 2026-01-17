import React from 'react';
import styles from './HoverCard.module.css';

const HoverCard = ({ provinceName, totalReports, top3 }) => {
  // kalo nda ada nama provinsi, nda tampilkan apa-apa
  if (!provinceName) return null;

  return (
    <div 
      className={styles.cardContainer}
    >
      <div className={styles.header}>
        <h3 className={styles.provinceName}>{provinceName}</h3>
        <span className={styles.badge}>{totalReports} Laporan</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.content}>
        <p className={styles.subTitle}>Top 3 Laporan:</p>
        <ul className={styles.list}>
          {top3 && top3.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span className={styles.rank}>#{index + 1}</span>
              <span className={styles.issue}>{item.issue}</span>
              <span className={styles.count}>{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HoverCard;