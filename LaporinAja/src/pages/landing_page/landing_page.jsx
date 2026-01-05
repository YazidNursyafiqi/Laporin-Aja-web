import { Link } from "react-router-dom";

//import konponen
import { Rounded_button , Link_button } from "../../component/button/buttonUI";

function Landing_page(){
    return(
        <>
            <div>
                <p>Selamat datang di</p>
                <h3>Laporin-aja</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius vestibulum orci, in dictum est malesuada ut. Vivamus ornare est non nulla aliquam eleifend. Phasellus ante libero, ultricies ac orci nec, semper pulvinar dui. </p>
                <img src="/icons/risk-analysis.png"/>
                <Rounded_button text="Lihat daftar pengaduan"/>
                <Rounded_button text="Adukan"/>
                <Link_button text="Tentang Kami"/>
                
            </div>   
        </>
    )
}

export default Landing_page;