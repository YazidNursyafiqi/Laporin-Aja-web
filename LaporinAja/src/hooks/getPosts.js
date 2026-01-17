import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

const getPosts = async(param,query)=>{
    try{
        //query yang di kirimkan : {date,likes,province,type dan forward}
        const result = await axios.get(`${API_BASE_URL}/view/posts/${param}`,{params:query})
        return {...result.data,status:"succeed"}
    }catch{
        return {status:"not-connect"}
    }
}

export default getPosts