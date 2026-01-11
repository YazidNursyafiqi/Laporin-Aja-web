import Maps from "../../../../component/indonesia-map/maps"
import style from "./wilayah.module.css";

function Wilayah(){
    // data dummy (nanti bs diganti API)
    const topRegions = [
        { name: "Sulawesi Selatan", count: 80 },
        { name: "Jawa Barat", count: 30 },
        { name: "Jawa Tengah", count: 30 },
        { name: "Jawa Timur", count: 30 },
    ];

    return(
        <>  
            <div className={style.container}>
                <h1 className={style.title}>Lihat kumpulan pengajuan</h1>

                <div className={style.mapWrapper}>
                    <Maps />
                </div>

                <div className={style.topRegionSection}>
                    <h3 className={style.sectionTitle}>Wilayah Teratas</h3>
                    
                    <div className={style.listContainer}>
                    {topRegions.map((item, index) => (
                        <div key={index} className={style.listItem}>
                        <span>{item.name}</span>
                        <span className={style.count}>{item.count}</span>
                        </div>
                    ))}
                    </div>

                    <div className={style.seeMore}>
                    <a href="#">See more</a>
                    </div>
                </div>

                </div>
        </>
    )
}

export default Wilayah