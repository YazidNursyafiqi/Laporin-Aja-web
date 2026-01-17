import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

const getLikes = async(param)=>{
    try{
        const result = await axios.get(`${API_BASE_URL}/view/likes/q?`,{withCredentials:true,params:param})
        return {...result.data,status:'succeed'}
    }catch{
        return {status:'server-error'}
    }
}

export default getLikes