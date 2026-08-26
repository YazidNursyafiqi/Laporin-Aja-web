import styles from './header.module.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '../../component/ThemeToggle/ThemeToggle';
import checkAuth from '../../hooks/checkAuth';

function Header(){
    const [mobile, setMobile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSetMobile = () => {
        setMobile(!mobile);
    };

    useEffect(() => {
        const verifyAuth = async () => {
            const res = await checkAuth();
            if (res && (res.status === 'succeed' || res.user)) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        verifyAuth();
    }, [location.pathname]);

    useEffect(() => {
        const q = searchParams.get('search') || searchParams.get('q') || '';
        setSearchQuery(q);
    }, [location.search]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (query) {
            navigate(`/ViewProblems/Laporan?search=${encodeURIComponent(query)}`);
        } else {
            navigate(`/ViewProblems/Laporan`);
        }
    };

    return (
        <div id={styles.header_container}>
            <div id={styles.header_left_side}>
                <p id={styles.title1}>Laporin</p>
                <p id={styles.title2}>Aja</p>
            </div>

            <div id={styles.header_right_side}>
                <div id={styles.header_button}>
                    <a href='/Reports'>Adukan</a>
                    <a href='/'>Beranda</a>
                    <a href='/About'>Tentang</a>
                </div>

                {/* Fitur Search (dikomentari sementara)
                <form onSubmit={handleSearchSubmit} className={styles.search_container}>
                    <input 
                        type="text" 
                        placeholder="Cari Permasalahan..." 
                        className={styles.search_input}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className={styles.search_button} aria-label="Cari">
                        <svg className={styles.search_icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </form>
                */}
                {isLoggedIn ? (
                    <Link to="/account" className={styles.profile} title="Profil Saya">
                        <img src='/icons/user.png' alt="Profile"/>
                    </Link>
                ) : (
                    <Link to="/login" className={styles.login_btn}>
                        Masuk
                    </Link>
                )}
                <ThemeToggle />

            </div>
            <div id={styles.mobileMenu}>
                <div id={styles.sideMenuToggle} onClick={handleSetMobile}>
                    <img src='/icons/menu.png' alt="Menu"/>
                </div>
                {mobile ? (
                    <div id={styles.sideMenu}>
                        {isLoggedIn ? (
                            <Link to='/account'>Akun</Link>
                        ) : (
                            <Link to='/login'>Masuk</Link>
                        )}
                        <Link to='/ViewProblems/Laporan'>Beranda</Link>
                        <Link to='/About'>Tentang</Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Header;