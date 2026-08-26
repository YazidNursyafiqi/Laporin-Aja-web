import styles from './main_navbar.module.css';
import {Link} from 'react-router-dom';

function Navbar_option({image, svg, title, url}){
    return(
        <Link className={styles.link} to={url}>
            <div className={styles.navbar_option}>
                {svg ? (
                    svg
                ) : (
                    <img src={image} alt={title}/>
                )}
                <p>{title}</p>
            </div>  
        </Link>
    );
}

function Navbar(){
    return(
        <div id={styles.main_navbar}>
            <nav>
                <Navbar_option 
                    svg={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    } 
                    title='Adukan' 
                    url='/Reports'
                />
                <Navbar_option image='../../icons/location-pin.png' title='Wilayah' url='/ViewProblems/Wilayah'/>
                <Navbar_option image='../../icons/danger.png' title='Laporan' url='/ViewProblems/Laporan'/>
                <Navbar_option image='../../icons/border-heart.png' title='Disukai' url='/ViewProblems/Disukai'/>
                <Navbar_option image='../../icons/Done.svg' title='Terkirim' url='/ViewProblems/Terkirim'/>
            </nav>
            <div style={{ marginTop: 'auto', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                
            </div>
        </div>
    );
}

export default Navbar;