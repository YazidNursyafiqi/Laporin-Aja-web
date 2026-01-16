import { useState , useEffect } from "react";
import Maps from "../../../../component/indonesia-map/maps"
import style from "./wilayah.module.css";
import getProvinceStatus from "../../../../hooks/getProvinceStatus";

function ListProvince({name,data}){
    const [expand,setExpand] = useState(false)

    //variabel berisi data jenis permasalahan yang telah di sortir dari terbesar ke terkecil
    const typeSorted = Object.entries(data.type).sort((a,b)=>b[1]-a[1])
    console.log(typeSorted)

    const change = ()=>{
        if(expand){
            setExpand(false)
        }else{
            setExpand(true)
        }
    }
    
    return(
        <>
            <div key={name} className={expand?style.listItemExpand:style.listItem} onClick={change}>
                <div className={style.listHeader}>
                    <span>{name}</span>
                    <span className={style.count}>{data.total}</span>
                </div>

                {expand?(
                    <>
                    <div className={style.listDetails}>
                        {typeSorted.map(val=>(
                            <>
                                <div className={style.type}>
                                    <span className={style.typeName}>{val[0]}</span>
                                    <span className={style.typeCount}>{val[1]}</span>
                                </div>
                            </>
                        ))}
                    </div>
                    </>
                ):(
                    <></>
                )}
            </div>
        </>
    )
}

function Wilayah(){
    const [ mapLoaded , setMapLoaded ] = useState(false)
    //hasil response API
    const [mapData,setMapData] = useState({})


    useEffect(()=>{
        async function x(){
            const result = await getProvinceStatus()
            const content = Object.entries(result.content)
            console.log(content)
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
                    {mapLoaded?(
                        <>
                            <Maps mapData={mapData}/>
                        </>
                    ):(
                        <>loading map</>
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