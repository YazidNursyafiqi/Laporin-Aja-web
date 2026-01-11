import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

const loginAccount = async(data)=>{
    return axios.post(`${API_BASE_URL}/login`,data,{withCredentials:true})
        .then(res=>res.data)
        .catch(err=>"gagal login")
}

export default loginAccount