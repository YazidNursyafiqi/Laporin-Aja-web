import { Link, Route , Routes } from "react-router-dom";
//import navbar dan header
import Header from "../../container/header/header";
import styles from "./about_page.module.css";


function About_page(){
    return(
        <>
         <div className={styles.container}>
            <Header/>
            <div className={styles.layout}>
                <div className={styles.content}>
                    <div className={styles.mainSection}>
                    <h1 className={styles.title}>
                        Suarakan Masalah, Temukan <span className={styles.highlight}> Solusi.</span>
                    </h1>
                    <p className={styles.subtitle}>
                        LaporinAja hadir untuk menjembatani aspirasi masyarakat dengan solusi modern. 
                        Kami percaya bahwa setiap kritik adalah langkah awal menuju perubahan yang lebih baik.
                    </p>
                    </div>

                    <div className={styles.storySection}>
                    <div className={styles.storyContent}>
                        <h2>Mengapa LaporinAja Dibuat?</h2>

                        {/* <p>
                            Tugas GDGoC
                        </p> */}
                        <p>
                        Kami menyadari bahwa banyak masalah infrastruktur dan layanan publik yang luput dari perhatian karena sulitnya akses pelaporan di negara ini.  
                        </p>

                        <p>
                        <strong>LaporinAja</strong> lahir dari keinginan untuk memotong jarak tersebut.
                        </p>

                        <p>
                        Dengan teknologi yang mudah diakses, kami ingin memberdayakan setiap individu untuk menjadi agen perubahan di lingkungannya sendiri.
                        </p>
                    </div>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}

export default About_page;