import styles from './main_navbar.module.css';
import {Link} from 'react-router-dom';

function Navbar_option({image,title,url}){
    return(
        <Link to={url}>
            <div className={styles.navbar_option}>
                <img src={image}/>
                <p>{title}</p>
            </div>  
        </Link>
    );
}

function Navbar(){
    return(
        <div id={styles.main_navbar}>
            <nav>
                <Navbar_option image='../../icons/location-pin.png' title='Wilayah' url='/ViewProblems/Wilayah'/>
                <Navbar_option image='../../icons/danger.png' title='Laporan' url='/ViewProblems/Laporan'/>
                <Navbar_option image='../../icons/border-heart.png' title='Disukai' url='/ViewProblems/Disukai'/>
                <Navbar_option image='../../icons/Done.svg' title='Terselesaikan' url='/ViewProblems/Terselesaikan'/>
            </nav>
        </div>
    );
}

export default Navbar;