import { useState } from "react"
import styles from "./post.module.css"

function Post({from,likes,comments,location,type,perpetrator,victim,explain,image,postId}){
    const [likeState,setLikes] = useState(likes)
    const [commentInput,setCommentInput] = useState("")

    const handleChange = (e)=>{
        setCommentInput(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

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
                        <img src={image}></img>
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
                    
                </div>
                <button id={styles.likeButton}>
                    <img src="/icons/like.png"></img>
                    {likes}
                </button>
            </div>
            <div id={styles.commentContainer}>
                <p>Comments:</p>
                <div id={styles.commentList}>
                    {Object.keys(comments).map((key)=>(
                        <div className={styles.commentCard}>
                            <p className={styles.commentCard_user}>{key}</p>
                            <p className={styles.commentCard_content}>{comments[key]}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={commentInput} id={styles.inputComment} onChange={handleChange}></input>
                    <button type="submit" id={styles.sendComment}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Post