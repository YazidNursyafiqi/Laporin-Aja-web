import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

//http://localhost:3000/view/provinceData/

const getProvinceStatus = async()=>{
    try{
        const result = await axios.get(`${API_BASE_URL}/view/provinceData`)
        return result.data
    }catch{
        return {status:"not-connect"}
    }
}

export default getProvinceStatus