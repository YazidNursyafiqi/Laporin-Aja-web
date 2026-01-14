import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

async function sendReport(formData){
    return axios.post(`${API_BASE_URL}/upload`,formData,{withCredentials:true})
        .then(res => res.data.status)
        .catch(err=>"Terjadi Kesalahan")
}

export default sendReport