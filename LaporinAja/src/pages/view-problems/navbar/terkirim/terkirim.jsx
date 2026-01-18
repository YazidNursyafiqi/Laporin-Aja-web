import PostPreview from "../../../../component/posts/post_preview"
import { useState,useEffect } from "react"
import getMyPosts from "../../../../hooks/getMyPosts"

const dummy = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id dictum turpis. Fusce ultrices felis a est tincidunt, sed convallis arcu auctor. Sed varius nulla id felis dapibus, et hendrerit nisl bibendum. Quisque vestibulum felis dui, finibus rutrum dolor auctor eu. Duis maximus ac purus sed volutpat. Phasellus sodales massa vel egestas porttitor. In hac habitasse platea dictumst. Fusce scelerisque justo nec ligula cursus euismod. Curabitur in sapien mi."

export default function Terkirim(){
    const [loaded,setLoaded] = useState(false)
    const [content , setContent] = useState(null)
    console.log(content)

    const loadPost = async()=>{
        const response = await getMyPosts()
        if(response.status != "not-connect"){
            setContent(response.content)
        }else{
            setContent([])
        }
        setLoaded(true)
    }

    useEffect(()=>{
        loadPost()
    },[])

    return(
        <>
            {loaded?(
            <>
                {content.map(value=>(
                    <PostPreview content={value}/>
                ))}
            </>
            ):(
                <>loading</>
            )}
        </>
    )
}