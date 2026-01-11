import axios from "axios";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

function registerAccount(data){
    return axios.post(`${API_BASE_URL}/Register`,data)
        .then(res => res.data.message)
        .catch(err=>"Terjadi Kesalahan")
}

export default registerAccount