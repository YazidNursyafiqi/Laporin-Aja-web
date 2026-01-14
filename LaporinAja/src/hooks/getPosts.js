import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

const getPosts = async(param,start_end_at,forward)=>{
    try{
        const result = await axios.get(`${API_BASE_URL}/view/${param}?start_end_at=${start_end_at}&forward=${forward}`)
        return {...result.data,status:"succeed"}
    }catch{
        return {status:"not-connect"}
    }
}

export default getPosts