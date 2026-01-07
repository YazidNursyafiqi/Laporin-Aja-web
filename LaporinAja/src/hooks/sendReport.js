import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

function sendReport(formData){
    axios.post(`${API_BASE_URL}/upload`,formData)
}

export default sendReport