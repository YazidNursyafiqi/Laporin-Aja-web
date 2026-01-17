import { useState , useEffect } from "react"
import Post from "../../../../component/posts/Post"
import getPosts from "../../../../hooks/getPosts"
import styles from "./laporan.module.css"
import region from '../../../../component/province.json'

const opsi_pengaduan = ["Infrastruktur dan Fasilitas","Kebersihan dan Lingkungan","Keamanan dan Ketertiban","Pelayanan Publik dan aparatur","Tindakan Korupsi","Sosial dan Kemasyarakatan","Kesehatan","Lalu Lintas dan Transportasi","Perizinan dan Usaha","Lainnya"]


export default function Laporan(){
    const [loaded,setLoaded] = useState(false)
    const [content , setContent] = useState(null)
    const [page,setPage] = useState(1)
    const [maxPage,setMaxPage] = useState(1)
    const [mode,setMode] = useState("Newest") // lihat postingan berdasarkan mode

    //load pertama kali
    const loadPost = async(mode,postIdQuery,provinceQuery,typeQuery,forward)=>{
        const response = await getPosts(mode,{ postId:postIdQuery, province:provinceQuery, type:typeQuery, forward:forward })//semua query di masukkan dalam 1 objek
        console.log(response)
        if(response.status != "not-connect"){
            //terhubung ke server
            // const temp = content
            // temp.push(response.content)
            setContent(response.content)
            setMaxPage(response.totalPost == 0? 1 : Math.ceil(response.totalPost/5))
        }else{
            //tidak terhubung ke 
            console.log("diskonek")
        }
        setLoaded(true)
    }

    //page selanjutnya
    const forward = async()=>{
        setLoaded(false)

        await loadPost(mode,content[content.length-1].id,province,problemType,true)
        setPage(page+1)
    }
    const backwward = async()=>{
        setLoaded(false)
        
        await loadPost(mode,content[0].id,province,problemType,false)
        setPage(page-1)
    }

    useEffect(()=>{
        loadPost(mode)
    },[])

    //kumpulan fungsi lihat berdasarkan
    const [province,setProvince] = useState('Provinsi Aceh') //default province
    const [problemType,setProblemType] = useState('Infrastruktur dan Fasilitas') //default type
    const handleChangeMode = async(type)=>{
        setLoaded(false)
        setMode(type)
        console.log(mode)
        await loadPost(type,null,province,problemType)
    }

    return(
        <>  
           <div id={styles.postMode}>
                <button onClick={()=>handleChangeMode('Newest')}>Terbaru</button>
                <button onClick={()=>handleChangeMode('Oldest')}>Terlama</button>
                <button onClick={()=>handleChangeMode('Likes')}>Like</button>
                <button onClick={()=>handleChangeMode('Province')}>Wilayah</button>
                <select onChange={(e)=>setProvince(e.target.value)}>
                    {region.map(val=>(
                        <option>{val.province}</option>
                    ))}
                </select>
                <button onClick={()=>handleChangeMode('Type')}>Jenis</button>
                <select onChange={(e)=>setProblemType(e.target.value)}>
                    {opsi_pengaduan.map(val=>(
                        <option>{val}</option>
                    ))}
                </select>
           </div>

            {loaded?(
                <>
                    {content? (
                        <>
                            {content.map(
                                (post)=>(
                                    <>
                                        <Post postId={post["id"]} type={post["jenis_pengaduan"]} province={post["provinsi"]} regency={post["kabupaten"]} from={post["kirim_sebagai"]} explain={post["penjelasan"]} image={post["imagePath"]} perpetrator={post["yang_terkait"]} comments={post["comments"]} likes={post["likes"]}/>

                                    </>
                                )
                            )}
                            {/* navigasi halaman */}
                            <div>
                                <button onClick={backwward} disabled={page == 1}>Prev</button>
                                <button onClick={forward} disabled={page == maxPage}>Next</button>
                            </div>
                        </>
                    ) : (
                        <>Tidak ada konten</>
                    )}
                </>
            ):(
                <div>Loading</div>
            )}

            {/**<>
                <Post from="Yazid Nursyafiqi" explain={msg} image={image} perpetrator={perp} comments={comments} likes={57}/>
            </>**/}
        </>
    )
}