import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

export const getAccountInfo = async()=>{
    try{
        const result = await axios.get(`${API_BASE_URL}/account/info`,{withCredentials:true})
        return {...result.data}
    }catch{
        return {status:'not-connect'}
    }
}

export const logout = async()=>{
    try{
        const result = await axios.delete(`${API_BASE_URL}/account/logout`,{withCredentials:true})
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return {...result.data}
    }catch{
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return {status:'not-connect'}
    }
}
