import { Link, Route , Routes } from "react-router-dom";
//import navbar
import Navbar from "../../container/navbar/main_navbar";
import styles from "./view-problems.module.css";

//import semua content yang ada
import Wilayah from "./navbar/wilayah/wilayah";
import Teratas from "./navbar/teratas/teratas";

function ViewProblems_page(){
    return(
        <>
         <div className={styles.layout}>
            <Navbar/>
            <div className={styles.content}>
                <Routes>
                    <Route path="/Wilayah" element={<Wilayah/>}/>
                    <Route path="/Teratas" element={<Teratas/>}/>
                </Routes>
            </div>
              
         </div>
        </>
    )
}

export default ViewProblems_page;