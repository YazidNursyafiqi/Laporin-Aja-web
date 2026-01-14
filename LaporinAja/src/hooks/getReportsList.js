import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

const getReportsList = async(chunk,param)=>{
    try{
        const result = await axios.get(`${API_BASE_URL}/view/${param}`)
        return {status:"succeed",content:result.data}
    }catch{
        return {status:"not-connect"}
    }
}