import { use } from "react";
import { useState , useEffect } from "react";

function Reports(){
    const [ form , setForm ] = useState({
        name:"",

    })

    const [ preview , setPreview ] = useState(null);
    const handleImage = (e) => {
        const path = e.target.files[0]
        const imageurl = URL.createObjectURL(path)
        setPreview(imageurl)
    }

    useEffect(()=>{
        return()=>{
            URL.revokeObjectURL(preview)
        }
    }, [preview])


    const opsi_pengaduan = ["Kebersihan","Tindakan Kriminal","Dugaan Korupsi","Fasilitas Umum"]

    
    return(
        <form>
            <label>
                Kirim sebagai:
                <select>
                    <option value="Anonim">Anonim</option>
                    <option value="User">User</option>
                </select>
            </label>
            <br/>
            <label>
                Masukkan jenis Pengaduan:
                <select>
                    {opsi_pengaduan.map((value)=>(
                        <option value={value} key={value}>{value}</option>
                    ))}
                </select>
            </label>
            <br/>
            <label>
                Berikan penjelasan selengkap mungkin
                <br/>
                <textarea type="textarea" rows="5" cols="50"/>
            </label>
            <br/>
            <label>
                Kondisi masalah saat ini:
                <select>
                    <option value="Belum-terselesaikan">Belum Terselesaikan</option>
                    <option value="Tidak-Diselesaikan">Tidak di selesaikan sama sekali</option>
                </select>
            </label>
            <br/>
            <label>
                Masukkan bukti jika ada
                <br />
                <input type="file" onChange={handleImage}/>
                <img src={preview}/>
            </label>
            <br />
            <label>
                Siapa saja yang terkait dengan masalah ini
                <input type="text" />
            </label>
            <br />
            <label>
                Siapa saja yang terdampak masalah saat ini:
                <select>
                    <option value="saya-sendiri">Saya sendiri</option>
                    <option value="Beberapa-Orang">beberapa orang</option>
                    <option value="Semua-Masyarakat">Semua Masyarakat</option>
                </select>
            </label>
            <br />
            <input type="submit" value="kirim"/>
        </form>
    );
}

export default Reports;