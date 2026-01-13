import { useState , useEffect } from "react"
import Post from "../../../../component/posts/Post"
import getPosts from "../../../../hooks/getPosts"


export default function Teratas(){
    const [loaded,setLoaded] = useState(false)
    const [content , setContent] = useState([])
    const [page,setPage] = useState(0) //page mulai dari nol 
    
    const loadPost = async()=>{
        console.log("start")
        const response = await getPosts("Newest")
        if(response.status != "not-connect"){
            const temp = content
            temp.push(response.content)
            setContent(temp)
            console.log('x')
        }else{
            console.log("diskonek")
        }
        console.log(content)
        setLoaded(true)
    }

    useEffect(()=>{
        console.log(loaded)
        if(loaded == false){
            loadPost()
        }
    },[loaded])

    return(
        <>  
            {loaded?(
                <>
                    {content[page] ? (
                        <>
                            {content[page].map(
                                (post)=>(
                                    <>
                                        <Post postId={post["id"]} type={post["jenis_pengaduan"]} province={post["provinsi"]} regency={post["kabupaten"]} from={post["kirim_sebagai"]} explain={post["penjelasan"]} image={post["imagePath"]} perpetrator={post["yang_terkait"]} comments={post["comments"]} likes={post["likes"]}/>

                                    </>
                                )
                            )}
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