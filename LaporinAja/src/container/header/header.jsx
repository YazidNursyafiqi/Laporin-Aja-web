import styles from './header.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header(){
    const [mobile,setMobile] = useState(false)

    const handleSetMobile = ()=>{
        if(mobile){
            setMobile(false)
        }else{
            setMobile(true)
        }
    }

    return (
        <div id={styles.header_container}>
            <div id={styles.header_left_side}>
                <p id={styles.title1}>Laporin</p>
                <p id={styles.title2}>Aja</p>
            </div>

            <div id={styles.header_right_side}>
                <div id={styles.header_button}>
                    <a href='/Reports'>Adukan</a>
                    <a href='/ViewProblems/Laporan'>Beranda</a>
                    <a href='/About'>Tentang</a>
                </div>

                <div className={styles.search_container}>
                    <input 
                        type="text" 
                        placeholder="Cari Permasalahan..." 
                        className={styles.search_input}
                    />
                    <span className={styles.search_icon}>🔍</span>
                </div>
                <Link to ="/account" className={styles.profile}>
                        <img src='/icons/user.png'/>
                </Link>

            </div>
            <div id={styles.mobileMenu}>
                <div id={styles.sideMenuToggle} onClick={handleSetMobile}>
                    <img src='/icons/menu.png'/>
                </div>
                {mobile?(
                        <div id={styles.sideMenu}>
                            <a href='/'>Akun</a>
                            <a href='/ViewProblems/Laporan'>Beranda</a>
                            <a href='/About'>Tentang</a>
                        </div>
                ):null}


            </div>
        </div>
    );
}

export default Header;