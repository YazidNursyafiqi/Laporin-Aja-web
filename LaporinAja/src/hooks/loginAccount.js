import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

const loginAccount = async(data)=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/login`,data,{withCredentials:true})
        return {...response.data,Connect:true}
    }catch{
        return {Connect:false,status:"not-connect"}  
    }
}

export default loginAccount