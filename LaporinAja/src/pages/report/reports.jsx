import { use } from "react";
import { useState , useEffect } from "react";
import styles from './reports.module.css'
import sendReport from "../../hooks/sendReport.js";

function Reports(){
    //data form yang value nya berupa string di simpan sementara di sini sebelum di submit
    const [ form , setForm ] = useState({
        kirim_sebagai:"",
        jenis_pengaduan:"",
        penjelasan:"",
        kondisi_saat_ini:"",
        yang_terkait:"",
        yang_terdampak:""
    })

    //fungsi untuk handle preview gambar
    const [ preview , setPreview ] = useState(null);
    const [ imagePath , setImagePath ] = useState(null);
    const handleImage = (e) => {
        const path = e.target.files[0]
        setImagePath(path)
        const imageurl = URL.createObjectURL(path)
        setPreview(imageurl)
        //console.log(path.type,path.size)
    }

    //fungsi untuk update objek yang berisi data form secara realtime saat user mmengubah/modif isi form
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setForm({...form,[name]:value});
        //console.log('diubah')
        //console.log(form)
        
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
        //kumpul dari objek
        for (const key in form){
            formData.append(key,form[key])
        }
        //kumpul gambar juga
        formData.append("image",imagePath)
        //debug:
        for(const x of formData.entries()){
            console.log(x)
        }
        //kirim ke server
        sendReport(formData)
    }
    

    return(
        <form onSubmit={submitData} id={styles.container}>
            <div id={styles.dropdownMenu}>
                <div className={styles.dropdownSide}>
                    <div className={styles.formInput}>
                        <label>
                            Kirim sebagai:
                            <select value={form.kirim_sebagai} name="kirim_sebagai" onChange={handleChange}>
                                <option value="Anonim">Anonim</option>
                                <option value="User">User</option>
                            </select>
                        </label>    
                    </div>
                    
                    <div className={styles.formInput}>
                        <label>
                            Masukkan jenis Pengaduan:
                            <select value={form.jenis_pengaduan} name="jenis_pengaduan" onChange={handleChange}>
                                {opsi_pengaduan.map((value)=>(
                                    <option value={value} key={value}>{value}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    
                    <div className={styles.formInput}>
                        <label>
                            Berikan penjelasan selengkap mungkin
                            <br/>
                            <textarea type="textarea" rows="5" cols="50" value={form.penjelasan} name="penjelasan" onChange={handleChange}/>
                        </label>
                    </div>
                    
                </div>
                <div className={styles.dropdownSide}>
                    <div className={styles.formInput}>
                        <label>
                            Kondisi masalah saat ini:
                            <select value={form.kondisi_saat_ini} name="kondisi_saat_ini" onChange={handleChange}>
                                <option value="Belum-terselesaikan">Belum Terselesaikan</option>
                                <option value="Tidak-Diselesaikan">Tidak di selesaikan sama sekali</option>
                            </select>
                        </label>
                    </div>
                    
                    <div className={styles.formInput}>
                        <label>
                            Siapa saja yang terdampak masalah saat ini:
                            <select value={form.yang_terdampak} name="yang_terdampak" onChange={handleChange}>
                                <option value="saya-sendiri">Saya sendiri</option>
                                <option value="Semua-Masyarakat">Semua Masyarakat</option>
                            </select>
                        </label>
                    </div>
                    
                </div>
            </div>
            <label>
                Masukkan bukti jika ada
                <br />
                <input type="file" onChange={handleImage}/>
                <div id={styles.imagePreview}>
                    <img src={preview}/>
                </div>
            </label>
            <br />
            <label>
                Siapa saja yang terkait dengan masalah ini
                <input type="text" />
            </label>
            <br />
            <input type="submit" value="kirim"/>
        </form>
    );
}

export default Reports;