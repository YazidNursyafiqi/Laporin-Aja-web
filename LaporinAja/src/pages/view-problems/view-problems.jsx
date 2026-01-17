import { Link, Route , Routes } from "react-router-dom";
//import navbar dan header
import Header from "../../container/header/header";
import Navbar from "../../container/navbar/main_navbar";
import styles from "./view-problems.module.css";

//import semua content yang ada
import Wilayah from "./navbar/wilayah/wilayah";
import Laporan from "./navbar/laporan/laporan";

function ViewProblems_page(){
    return(
        <>
         <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header/>
            <div className={styles.layout}>
                <Navbar/>
                <div className={styles.content}>
                    <Routes>
                        <Route path="/Wilayah" element={<Wilayah/>}/>
                        <Route path="/Laporan" element={<Laporan/>}/>
                    </Routes>
                </div>
            </div>
         </div>
        </>
    )
}

export default ViewProblems_page;