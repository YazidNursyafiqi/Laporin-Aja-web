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
                <Navbar_option image='/icons/navbar/navbar_dashboard_icon.png' title='Wilayah' url='/Wilayah'/>
                <Navbar_option image='/icons/navbar/navbar_courses_icon.png' title='Teratas' url='/Teratas'/>
                <Navbar_option image='/icons/navbar/navbar_grades_icon.png' title='Jenis' url='/Jenis'/>
                <Navbar_option image='/icons/navbar/navbar_reports_icon.png' title='Terselesaikan' url='/Terselesaikan'/>
            </nav>
        </div>
    );
}

export default Navbar;