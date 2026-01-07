import { Link } from "react-router-dom";
//import navbar
import Navbar from "../../container/navbar/main_navbar";
import styles from "./view-problems.module.css";

function ViewProblems_page(){
    return(
        <>
         <div className={styles.layout}>
                <Navbar/>
            <div className={styles.content}>
                <h1>Lihat kumpulan pengajuan</h1>
                <img src="icons/Konsultasi dengan Arqiyu.Ai.png" alt="Map Indonesia" width={800}/>
            </div>   
         </div>
        </>
    )
}

export default ViewProblems_page;