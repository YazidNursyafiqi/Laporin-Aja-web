import { useState , useEffect } from "react"
import Post from "../../../../component/posts/Post"
import getPosts from "../../../../hooks/getPosts"
import { use } from "react"


export default function Teratas(){
    const [loaded,setLoaded] = useState(false)
    const [content , setContent] = useState({})
    
    const loadPost = async()=>{
        console.log("start")
        const response = await getPosts("Newest")
        setLoaded(true)
        if(response.status != "not-connect"){
            console.log(response.content)

        }else{
            console.log("diskonek")
        }
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
                    {}
                </>
            ):(
                <div>Loading</div>
            )}

            {/**<>
                <Post from="Yazid Nursyafiqi" explain={msg} image={image} perpetrator={perp} comments={comments} likes={57}/>
                <Post from="Yazid Nursyafiqi" explain={msg} image={image} perpetrator={perp} comments={comments} likes={57}/>
            </>**/}
        </>
    )
}