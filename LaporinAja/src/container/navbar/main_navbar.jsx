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
                <Navbar_option image='/icons/navbar/navbar_dashboard_icon.png' title='Dashboard' url='/Dashboard'/>
                <Navbar_option image='/icons/navbar/navbar_courses_icon.png' title='Courses' url='/Courses'/>
                <Navbar_option image='/icons/navbar/navbar_grades_icon.png' title='Grades' url='/Grades'/>
                <Navbar_option image='/icons/navbar/navbar_reports_icon.png' title='Reports' url='/Reports'/>
                <Navbar_option image='/icons/navbar/navbar_inventory_icon.png' title='Inventory' url='/Inventory'/>
                <Navbar_option image='/icons/navbar/navbar_notification_icon.png' title='Notification' url='/Notification'/>
            </nav>
        </div>
    );
}

export default Navbar;