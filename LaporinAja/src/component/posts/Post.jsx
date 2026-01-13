import { useState } from "react"
import styles from "./post.module.css"
import { useNavigate } from "react-router-dom"; 
import checkAuth from "../../hooks/checkAuth";

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

function Post({from,likes,comments,province,regency,type,perpetrator,victim,explain,image,postId}){
    const navigate = useNavigate()
    
    const [likeState,setLikes] = useState(likes)
    const [commentInput,setCommentInput] = useState({
        from:"Anonim",
        comment:""
    })

    //fungsi untuk mengecek apakah user ingin kirim menggunakan account
    const [changeToUser , setChangeToUser] = useState(false)
    const [ accountName , setAccountName] = useState("User")

    const handleChange = async(e)=>{
        const name = e.target.name
        const value = e.target.value
        //cek login/tidaknya client ketika memilih ke user
        if(name == "from" && value == "User"){
            const response = await checkAuth()
            if(response.status == "succeed"){
                setAccountName(response.user)
            }else{
                navigate('/login')
            }
        }

        setCommentInput({...commentInput,[name]:value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(commentInput)
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
                    {Object.keys(comments).map((key)=>(
                        <div className={styles.commentCard}>
                            <p className={styles.commentCard_user}>{key}</p>
                            <p className={styles.commentCard_content}>{comments[key]}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={commentInput.comment} name="comment" id={styles.inputComment} onChange={handleChange}></input>
                    <select value={commentInput.from} name="from" onChange={handleChange}>
                        <option value="Anonim">Anonim</option>
                        <option value="User">{accountName}</option>
                    </select>
                    <button type="submit" id={styles.sendComment}>Send</button>
                </form>
            </div> 
        </div>
    )
}

export default Post