import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const deleteReport = async(postId)=>{
    try{
        const response = await axios.delete(`${API_BASE_URL}/delete/${postId}`,{withCredentials:true})
        return response.data
    }catch{
        return {status:'not-connect'}
    }
}

export default deleteReport