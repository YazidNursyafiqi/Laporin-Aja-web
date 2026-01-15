import { useState , useEffect } from "react"
import Post from "../../../../component/posts/Post"
import getPosts from "../../../../hooks/getPosts"


export default function Teratas(){
    const [loaded,setLoaded] = useState(false)
    const [content , setContent] = useState(null)
    const [page,setPage] = useState(1)
    const [maxPage,setMaxPage] = useState(1)
    

    //load pertama kali
    const loadPost = async(start_end_at,forward)=>{
        console.log("start")
        const response = await getPosts("Newest",start_end_at,forward)
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
        await loadPost(content[content.length-1].date,true)
        setPage(page+1)
    }
    const backwward = async()=>{
        setLoaded(false)
        await loadPost(content[0].date,false)
        setPage(page-1)
    }

    useEffect(()=>{
        loadPost()
    },[])

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