import { use } from "react";
import { useState , useEffect } from "react";

function Reports(){
    const [ form , setForm ] = useState({
        kirim_sebagai:"",
        jenis_pengaduan:"",
        penjelasan:"",
        kondisi_saat_ini:"",
        yang_terkait:[],
        yang_terdampak:""
    })

    const [ preview , setPreview ] = useState(null);
    const handleImage = (e) => {
        const path = e.target.files[0]
        const imageurl = URL.createObjectURL(path)
        setPreview(imageurl)
    }

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setForm({...form,[name]:value});
        console.log('diubah')
        console.log(form)
        
    }

    useEffect(()=>{
        return()=>{
            URL.revokeObjectURL(preview)
        }
    }, [preview])

    const opsi_pengaduan = ["Kebersihan","Tindakan Kriminal","Dugaan Korupsi","Fasilitas Umum"]

    //untuk mengumpulkan data form
    const submitData = (e)=>{
        e.preventDefault()
        const formData = new FormData()
        console.log(formData)
        for (const key in form){
            console.log(key," ",form[key])
        }
    }
    

    return(
        <form onSubmit={submitData}>
            <label>
                Kirim sebagai:
                <select value={form.kirim_sebagai} name="kirim_sebagai" onChange={handleChange}>
                    <option value="Anonim">Anonim</option>
                    <option value="User">User</option>
                </select>
            </label>
            <br/>
            <label>
                Masukkan jenis Pengaduan:
                <select value={form.jenis_pengaduan} name="jenis_pengaduan" onChange={handleChange}>
                    {opsi_pengaduan.map((value)=>(
                        <option value={value} key={value}>{value}</option>
                    ))}
                </select>
            </label>
            <br/>
            <label>
                Berikan penjelasan selengkap mungkin
                <br/>
                 <textarea type="textarea" rows="5" cols="50" value={form.penjelasan} name="penjelasan" onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Kondisi masalah saat ini:
                <select value={form.kondisi_saat_ini} name="kondisi_saat_ini" onChange={handleChange}>
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
                <select value={form.yang_terdampak} name="yang_terdampak" onChange={handleChange}>
                    <option value="saya-sendiri">Saya sendiri</option>
                    <option value="Semua-Masyarakat">Semua Masyarakat</option>
                </select>
            </label>
            <br />
            <input type="submit" value="kirim"/>
        </form>
    );
}

export default Reports;