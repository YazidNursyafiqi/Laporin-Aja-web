import { useState , useEffect } from "react"
import Post from "../../../../component/posts/Post"
import getPosts from "../../../../hooks/getPosts"
import { use } from "react"


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
                                        <Post from={post["kirim_sebagai"]} explain={post["penjelasan"]} image={post["imagePath"]} perpetrator={{}} comments={{}} likes={57}/>

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