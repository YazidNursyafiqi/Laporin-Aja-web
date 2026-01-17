import { useState , useEffect } from "react"
import {Post} from "../../../../component/posts/Post"
import getLikes from "../../../../hooks/getLikes"
import styles from "./disukai.module.css"

export default function Disukai(){
    const [loaded,setLoaded] = useState(false)
    const [content , setContent] = useState(null)
    const [page,setPage] = useState(1)
    const [maxPage,setMaxPage] = useState(1)
    //const [mode,setMode] = useState("Newest") // lihat postingan berdasarkan mode
    console.log(maxPage)
    //load pertama kali
    const loadPost = async(postId,forward)=>{
        const response = await getLikes({postId:postId,forward:forward})//semua query di masukkan dalam 1 objek
        console.log(response)
        if(response.status != "not-connect"){
            //terhubung ke server
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

        await loadPost(content[content.length-1].id,true)
        setPage(page+1)
    }
    const backwward = async()=>{
        setLoaded(false)
        
        await loadPost(content[0].id,false)
        setPage(page-1)
    }

    useEffect(()=>{
        loadPost()
    },[])

    //kumpulan fungsi lihat berdasarkan
    // const [province,setProvince] = useState('Provinsi Aceh') //default province
    // const [problemType,setProblemType] = useState('Infrastruktur dan Fasilitas') //default type
    // const handleChangeMode = async(type)=>{
    //     setLoaded(false)
    //     setMode(type)
    //     console.log(mode)
    //     await loadPost(type,null,province,problemType)
    // }

    return(
        <>  

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