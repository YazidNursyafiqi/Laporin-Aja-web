import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

const getMyPosts = async()=>{
    try{
        const result = await axios.get(`${API_BASE_URL}/view/sent`,{withCredentials:true})
        return {...result.data}
    }catch{
        return {status:'not-connect'}
    }
}

export default getMyPosts