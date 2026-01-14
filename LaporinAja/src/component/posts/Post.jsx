import { useState } from "react"
import styles from "./post.module.css"
import { useNavigate } from "react-router-dom"; 
import sendComment from "../../hooks/sendComment";

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

function Post({from,likes,comments,province,regency,type,perpetrator,victim,explain,image,postId}){
    const navigate = useNavigate()
    
    const [likeState,setLikes] = useState(likes)
    const [commentInput,setCommentInput] = useState("")

    //fungsi untuk mengecek apakah user ingin kirim menggunakan account
    const [changeToUser , setChangeToUser] = useState(false)
    const [ accountName , setAccountName] = useState("User")

    const handleChange = async(e)=>{
        setCommentInput(e.target.value)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await sendComment(commentInput,postId)
        console.log(response)
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
                <button id={styles.likeButton}>
                    <img src="/icons/like.png"></img>
                    {likes}
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
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={commentInput.comment} name="comment" id={styles.inputComment} onChange={handleChange}></input>
                    <button type="submit" id={styles.sendComment}>Send</button>
                </form>
            </div> 
        </div>
    )
}

export default Post