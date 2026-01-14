import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

async function sendComment(comment,postID){
    try{
        const data = {
            comment:comment,
            postID:postID
        }
        const result = await axios.post(`${API_BASE_URL}/interract/comment`,data,{withCredentials:true})
        return result.data
    }catch{
        return {status:"not-connect"}
    }
}

export default sendComment