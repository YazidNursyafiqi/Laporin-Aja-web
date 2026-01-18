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
        return {...result.data}
    }catch{
        return {status:'not-connect'}
    }
}
