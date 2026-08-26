import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Post } from "../../../../component/posts/Post";
import getPosts from "../../../../hooks/getPosts";
import styles from "./laporan.module.css";
import region from '../../../../component/province.json';

const opsi_pengaduan = ["Infrastruktur dan Fasilitas","Kebersihan dan Lingkungan","Keamanan dan Ketertiban","Pelayanan Publik dan aparatur","Tindakan Korupsi","Sosial dan Kemasyarakatan","Kesehatan","Lalu Lintas dan Transportasi","Perizinan dan Usaha","Lainnya"];

export default function Laporan(){
    const [loaded, setLoaded] = useState(false);
    const [content, setContent] = useState(null);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [mode, setMode] = useState("Newest");

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || searchParams.get("q") || "";
    const paramProvince = searchParams.get("province") || "";
    const paramType = searchParams.get("type") || "";

    const [province, setProvince] = useState(paramProvince || 'Provinsi Aceh');
    const [problemType, setProblemType] = useState(paramType || 'Infrastruktur dan Fasilitas');

    const loadPost = async(mode, postIdQuery, provinceQuery, typeQuery, forward) => {
        const response = await getPosts(mode, { postId: postIdQuery, province: provinceQuery || province, type: typeQuery || problemType, forward: forward });
        if (response.status !== "not-connect") {
            setContent(response.content);
            setMaxPage(response.totalPost === 0 ? 1 : Math.ceil(response.totalPost / 5));
        } else {
            console.log("diskonek");
        }
        setLoaded(true);
    };

    const forward = async() => {
        setLoaded(false);
        await loadPost(mode, content[content.length - 1].id, province, problemType, true);
        setPage(page + 1);
    };

    const backwward = async() => {
        setLoaded(false);
        await loadPost(mode, content[0].id, province, problemType, false);
        setPage(page - 1);
    };

    useEffect(() => {
        setLoaded(false);

        if (paramProvince) setProvince(paramProvince);
        if (paramType) setProblemType(paramType);

        if (searchQuery.trim()) {
            loadPost("Search");
        } else if (paramProvince && paramType) {
            setMode("Province");
            loadPost("Province", null, paramProvince, paramType);
        } else if (paramProvince) {
            setMode("Province");
            loadPost("Province", null, paramProvince, problemType);
        } else if (paramType) {
            setMode("Type");
            loadPost("Type", null, province, paramType);
        } else {
            loadPost(mode, null, province, problemType);
        }
    }, [searchParams]);

    const handleChangeMode = async(type) => {
        setLoaded(false);
        setMode(type);
        await loadPost(type, null, province, problemType);
    };

    const handleProvinceChange = async(e) => {
        const selectedProv = e.target.value;
        setProvince(selectedProv);
        setLoaded(false);
        setMode("Province");
        await loadPost("Province", null, selectedProv, problemType);
    };

    const handleTypeChange = async(e) => {
        const selectedType = e.target.value;
        setProblemType(selectedType);
        setLoaded(false);
        setMode("Type");
        await loadPost("Type", null, province, selectedType);
    };

    const matchesDeepSearch = (obj, query) => {
        if (!query || !query.trim()) return true;
        if (obj == null) return false;

        const q = query.toLowerCase().trim();

        const check = (val) => {
            if (val == null) return false;
            if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                return String(val).toLowerCase().includes(q);
            }
            if (Array.isArray(val)) {
                return val.some(item => check(item));
            }
            if (typeof val === 'object') {
                return Object.values(val).some(item => check(item));
            }
            return false;
        };

        return check(obj);
    };

    const filteredContent = Array.isArray(content) ? content.filter(post => {
        if (!post || typeof post !== 'object') return false;

        if (searchQuery.trim() && !matchesDeepSearch(post, searchQuery)) {
            return false;
        }

        if (paramProvince && post["provinsi"]) {
            const p1 = String(post["provinsi"]).toLowerCase().replaceAll("_", " ");
            const p2 = paramProvince.toLowerCase().replaceAll("_", " ");
            if (!p1.includes(p2) && !p2.includes(p1)) return false;
        }

        if (paramType && post["jenis_pengaduan"]) {
            const t1 = String(post["jenis_pengaduan"]).toLowerCase().trim();
            const t2 = paramType.toLowerCase().trim();
            if (t1 !== t2) return false;
        }

        return true;
    }) : [];

    return (
        <>  
           <div id={styles.postMode}>
                <div className={styles.filterGroup}>
                    <button className={styles.button} onClick={() => handleChangeMode('Newest')}>Terbaru</button>
                    <button className={styles.button} onClick={() => handleChangeMode('Oldest')}>Terlama</button>
                    <button className={styles.button} onClick={() => handleChangeMode('Likes')}>Like</button>
                </div>
                <div className={styles.filterGroup}>
                    <button className={styles.button} onClick={() => handleChangeMode('Province')}>Wilayah</button>
                    <select 
                        className={styles.selectInput} 
                        value={province} 
                        onChange={handleProvinceChange}
                    >
                        {region.map(val => (
                            <option key={val.province} value={val.province}>{val.province}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <button className={styles.button} onClick={() => handleChangeMode('Type')}>Jenis</button>
                    <select 
                        className={styles.selectInput} 
                        value={problemType} 
                        onChange={handleTypeChange}
                    >
                        {opsi_pengaduan.map(val => (
                            <option key={val} value={val}>{val}</option>
                        ))}
                    </select>
                </div>
           </div>

            {(paramProvince || paramType) && (
                <div style={{ marginBottom: "20px", color: "var(--text-main)", fontSize: "0.95rem" }}>
                    Filter Terpasang: 
                    {paramProvince && <strong> Wilayah "{paramProvince}"</strong>}
                    {paramProvince && paramType && <span> • </span>}
                    {paramType && <strong> Jenis "{paramType}"</strong>}
                    <span style={{ color: "var(--text-muted)", marginLeft: "6px" }}>({filteredContent ? filteredContent.length : 0} ditemukan)</span>
                </div>
            )}

            {searchQuery && (
                <div style={{ marginBottom: "20px", color: "var(--text-main)", fontSize: "0.95rem" }}>
                    Hasil pencarian untuk: <strong>"{searchQuery}"</strong> ({filteredContent ? filteredContent.length : 0} ditemukan)
                </div>
            )}

            {loaded ? (
                <>
                    {filteredContent && filteredContent.length > 0 ? (
                        <>
                            {filteredContent.map((post) => (
                                <Post 
                                    key={post["id"]}
                                    postId={post["id"]} 
                                    type={post["jenis_pengaduan"]} 
                                    province={post["provinsi"]} 
                                    regency={post["kabupaten"]} 
                                    from={post["kirim_sebagai"]} 
                                    explain={post["penjelasan"]} 
                                    image={post["imagePath"]} 
                                    perpetrator={post["yang_terkait"]} 
                                    comments={post["comments"]} 
                                    likes={post["likes"]}
                                />
                            ))}
                            <div className={styles.paginationContainer}>
                                <button 
                                    className={styles.paginationButton} 
                                    onClick={backwward} 
                                    disabled={page === 1}
                                >
                                    Sebelumnya
                                </button>
                                <span className={styles.pageIndicator}>
                                    Halaman {page} dari {maxPage}
                                </span>
                                <button 
                                    className={styles.paginationButton} 
                                    onClick={forward} 
                                    disabled={page === maxPage}
                                >
                                    Selanjutnya
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ padding: "20px 0", color: "var(--text-muted)" }}>Tidak ada laporan yang sesuai pencarian.</div>
                    )}
                </>
            ) : (
                <div className="loadingContainer">
                    <div className="loadingText">Memuat Laporan...</div>
                </div>
            )}
        </>
    );
}