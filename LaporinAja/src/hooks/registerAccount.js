import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

async function registerAccount(data){
    try{
        const response = await axios.post(`${API_BASE_URL}/Register`,data)
        return response.data
    }catch{
        return {status:'not-connect'}
    }
}

export default registerAccount