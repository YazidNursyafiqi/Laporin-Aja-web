import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import konponen
import { Rounded_button , Link_button } from "../../component/button/buttonUI";
import style from "./landing_page.module.css";

function Landing_page(){

    const navigate = useNavigate();

    return(
        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.topSection}>
                        
                        <div className={style.leftCol}>

                            <div className={style.textWrapper}>
                                <p>Selamat datang di</p>
                                <div className={style.logo}>
                                    <h1>Laporin</h1>
                                    <h1 id={style.logo1}>Aja</h1>
                                </div>
                                <p>
                                    Platform pelaporan masalah publik yang cepat dan transparan. 
                                    Demi membangun lingkungan yang lebih nyaman 
                                    dengan melaporkan hal-hal yang bermasalah 
                                    di sekitar Anda. Suara Anda, awal perubahan kita.
                                </p>
                            </div>

                        </div>

                        <div className={style.rightCol}>
                                <img src="/icons/risk-analysis.png" width={400}/>
                        </div>

                    </div>

                    <div className={style.bottomSection}>

                        <div className={style.leftBottom}>
                            <Rounded_button text="Adukan" onClick={() => navigate('/Reports')}/>
                            <Rounded_button text="Lihat daftar pengaduan" onClick={() => navigate('/ViewProblems/Wilayah')}/>
                        </div>

                    <div className={style.rightBottom}>
                            <Rounded_button text="Tentang Kami" onClick={() => navigate('/About')}/>
                        </div>
                    </div>
                </div>

                    
                   
                
            </div>   
        </>
    )
}

export default Landing_page;