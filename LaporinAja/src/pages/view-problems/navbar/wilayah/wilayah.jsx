import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Maps from "../../../../component/indonesia-map/maps";
import style from "./wilayah.module.css";
import getProvinceStatus from "../../../../hooks/getProvinceStatus";

function ListProvince({ name, data }) {
    const [expand, setExpand] = useState(false);
    const navigate = useNavigate();

    const typeSorted = Object.entries(data.type).sort((a, b) => b[1] - a[1]);

    const change = () => {
        setExpand(!expand);
    };

    const handleTypeClick = (e, typeName) => {
        e.stopPropagation();
        navigate(`/ViewProblems/Laporan?province=${encodeURIComponent(name)}&type=${encodeURIComponent(typeName)}`);
    };

    const handleProvinceClick = (e) => {
        e.stopPropagation();
        navigate(`/ViewProblems/Laporan?province=${encodeURIComponent(name)}`);
    };

    return (
        <div key={name} className={expand ? style.listItemExpand : style.listItem} onClick={change}>
            <div className={style.listHeader}>
                <span className={style.provinceTitle} onClick={handleProvinceClick} title={`Lihat semua laporan di ${name}`}>
                    {name}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className={style.count}>{data.total}</span>
                    <button 
                        className={style.viewLink} 
                        onClick={handleProvinceClick}
                        title={`Lihat laporan ${name}`}
                    >
                        Lihat
                    </button>
                </div>
            </div>

            {expand && (
                <div className={style.listDetails}>
                    {typeSorted.map(([typeName, count]) => (
                        <div 
                            key={typeName} 
                            className={style.type} 
                            onClick={(e) => handleTypeClick(e, typeName)}
                            title={`Lihat laporan ${typeName} di ${name}`}
                        >
                            <span className={style.typeName}>{typeName}</span>
                            <span className={style.typeCount}>{count}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Wilayah(){
    const [ mapLoaded , setMapLoaded ] = useState(false)
    //hasil response API
    const [mapData,setMapData] = useState({})


    useEffect(()=>{
        async function x(){
            const result = await getProvinceStatus()
            const content = Object.entries(result.content)
            //sortir result
            const resultSorted = content.sort((a,b)=>b[1].total-a[1].total)
            setMapData(Object.fromEntries(resultSorted))
            setMapLoaded(true)
        }
        x()
    },[])

    return(
        <>  
            <div className={style.container}>

                <div className={style.mapWrapper}>
                    {mapLoaded ? (
                        <>
                            <Maps mapData={mapData}/>
                        </>
                    ) : (
                        <div className="loadingContainer">
                            <div className="loadingText">Memuat Peta Wilayah...</div>
                        </div>
                    )}
                </div>

                <div className={style.topRegionSection}>
                    <h3 className={style.sectionTitle}>Wilayah Teratas</h3>
                    
                    <div className={style.listContainer}>
                    {Object.keys(mapData).map((item) => (
                        <ListProvince name={item} data={mapData[item]}/>
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