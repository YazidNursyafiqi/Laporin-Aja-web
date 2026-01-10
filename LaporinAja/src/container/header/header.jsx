import styles from './header.module.css';
import { useState } from 'react';
import Login_Overlay from './../component/login/loginManagement';
function Header(){
    const [onLogin , login] = useState(false);
    return (
        <div id={styles.header_container}>
            <div id={styles.header_left_side}>
                <img src='/icons/header/header_icon.png'></img>
            </div>

            <div id={styles.header_right_side}>
                <img src='/icons/header/header_day_and_night_icon.png' alt='enable/disabled dark mode' id={styles.darkmode_button}/>
                <a href=''>Home</a>
                <a href=''>Contacts</a>
                <img src='/icons/header/header_profile_icon.png' alt='account' id={styles.account_button} onClick={() => login(true)}/> 
            </div>
            {(onLogin)?(<Login_Overlay/>):(<></>)}
        </div>
    );
}

export default Header;