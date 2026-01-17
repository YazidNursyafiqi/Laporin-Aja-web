import { useState } from "react"
import styles from "./post.module.css"
import { useNavigate } from "react-router-dom"; 
import {sendComment , sendLike} from "../../hooks/interract";
import { useEffect } from "react";

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

export function Post({from,likes,comments,province,regency,type,perpetrator,victim,explain,image,postId}){
    const navigate = useNavigate()
    
    const [likeState,setLikes] = useState(likes)
    const [commentInput,setCommentInput] = useState("")

    const handleChange = async(e)=>{
        setCommentInput(e.target.value)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await sendComment(commentInput,postId)
        setCommentInput("")
        if(response.status == "succeed"){
            setCommentSend([...commentSend,{username:response.name,comment:commentInput}])
            console.log(commentSend)
        }
        console.log(response)
    }

    //fungsi untuk mengirimkan like
    const handleLike = async()=>{
        const response = await sendLike(postId)
        if(response.status == 'succeed'){
            if(response.mode == 'like'){
                setLikeSend(likeSend+1)
            }else{
                setLikeSend(likeSend-1)
            }
        }
    }

    //update tampilan saat user telah mengirimkan komen
    const [commentSend , setCommentSend] = useState([])
    //update tampilan saat user telah mengirimkan like
    const [likeSend , setLikeSend] = useState(likes)

    return(
        <div id={styles.container}>
            <div id={styles.postContainer}>
                <div id={styles.postContent}>
                    <div id={styles.account}>
                        <img src="/icons/user.png"/>
                        <p>{from}</p>
                    </div>
                    <div id={styles.explain}>
                        {explain}
                    </div>
                    <div id={styles.image}>
                        <img src={`${API_BASE_URL}/images/${image}`}></img>
                    </div>
                    <div id={styles.perpetrator}>
                        <p>Siapa saja yang terkait:</p>
                        <div id={styles.itemContainer}>
                            {Object.keys(perpetrator).map(key=>(
                                <>
                                    <div id={styles.item}>
                                        <p id={styles.itemName}>{key}</p>
                                        <p id={styles.itemRole}>{perpetrator[key]}</p>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div id={styles.location}>
                        <img src="/icons/location-pin.png"/> 
                        <p>{province} , {regency}</p>
                    </div>
                    <div id={styles.problemType}>
                        <img src="/icons/danger.png"/> 
                        <p>{type}</p>
                    </div>
                    
                </div>
                <button id={styles.likeButton} onClick={handleLike}>
                    <img src="/icons/like.png"></img>
                    {likeSend}
                </button>
            </div>
            <div id={styles.commentContainer}>
                <p>Comments:</p>
                <div id={styles.commentList}>
                    {comments.map((value)=>(
                        <div className={styles.commentCard}>
                            <p className={styles.commentCard_user}>{value["username"]}</p>
                            <p className={styles.commentCard_content}>{value["comment"]}</p>
                        </div>
                    ))}
                    {commentSend.map((value)=>(
                        <div className={styles.commentCard}>
                            <p className={styles.commentCard_user}>{value["username"]}</p>
                            <p className={styles.commentCard_content}>{value["comment"]}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={commentInput} name="comment" id={styles.inputComment} onChange={handleChange}></input>
                    <button type="submit" id={styles.sendComment}>Send</button>
                </form>
            </div> 
        </div>
    )
}