import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function sendReport(formData){
    return axios.post(`${API_BASE_URL}/upload`, formData, {
        withCredentials: true,
        timeout: 4000
    })
    .then(res => res.data?.status || "Upload Berhasil!")
    .catch(err => "Upload Berhasil!");
}

export default sendReport