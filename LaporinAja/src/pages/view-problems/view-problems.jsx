import { Link, Route , Routes } from "react-router-dom";
//import navbar dan header
import Header from "../../container/header/header";
import Navbar from "../../container/navbar/main_navbar";
import styles from "./view-problems.module.css";

//import semua content yang ada
import Wilayah from "./navbar/wilayah/wilayah";

function ViewProblems_page(){
    return(
        <>
         <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header/>
            <div className={styles.layout}>
                <Navbar/>
                <div id="Content">
                    <Routes>
                        <Route path="/Wilayah" element={<Wilayah/>}/>
                    </Routes>
                </div>
            </div>
         </div>
        </>
    )
}

export default ViewProblems_page;