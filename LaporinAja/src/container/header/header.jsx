import styles from './header.module.css';
import { useState } from 'react';
function Header(){
    return (
        <div id={styles.header_container}>
            <div id={styles.header_left_side}>
                {/* akun buat login nanti disini */}
            </div>

            <div id={styles.header_right_side}>
                <a href=''>Beranda</a>
                <a href=''>Tentang</a>

                <div className={styles.search_container}>
                    <input 
                        type="text" 
                        placeholder="Cari Permasalahan..." 
                        className={styles.search_input}
                    />
                    <span className={styles.search_icon}>🔍</span>
                </div>
            </div>
        </div>
    );
}

export default Header;