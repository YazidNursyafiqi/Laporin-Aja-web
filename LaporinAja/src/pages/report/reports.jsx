import { use } from "react";
import { useState , useEffect } from "react";
import styles from './reports.module.css'
import sendReport from "../../hooks/sendReport.js";
import ImageCropper from "../../component/cropper/cropper.jsx";
import checkAuth from "../../hooks/checkAuth.js";
import { useNavigate } from "react-router-dom";

//import data wilayah di indonesia
import region from './province.json'

function Reports(){
    const navigate = useNavigate()

    //data form yang value nya berupa string di simpan sementara di sini sebelum di submit
    const [ form , setForm ] = useState({
        kirim_sebagai:"",
        jenis_pengaduan:"",
        provinsi:"",
        kabupaten:"",
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

    const onCropped = (newImage) => {
        setPreview(URL.createObjectURL(newImage))
        setImagePath(newImage)
    }


    //fungsi untuk update objek yang berisi data form secara realtime saat user mmengubah/modif isi form
    const handleChange = async(e)=>{
        const name = e.target.name
        const value = e.target.value

        //kondisi tambahan ketika user memilik post menggunakan akun:
        if(name == "kirim_sebagai"){
            if(value == "User"){
                setChangeToUser(true)
                const response = await checkAuth()
                console.log(response)
                if(response.status == "succeed"){
                    setAccountName(response.user)
                }else{
                    navigate("/login")
                }
            }else{
                setChangeToUser(false)
            }
        }
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

    //fungsi untuk mengecek apakah user ingin kirim menggunakan account
    const [changeToUser , setChangeToUser] = useState(false)
    const [ accountName , setAccountName] = useState("User")

    //untuk mengumpulkan data form
    const [ hasSubmit , setHasSubmit ] = useState(false)
    const [ responseStatus , setResponseStatus ] = useState()

    const submitData = async (e)=>{
        e.preventDefault()
        setHasSubmit(true)
        setResponseStatus("loading")
        const formData = new FormData()
        console.log(formData)
        //kumpul dari objek
        for (const key in form){
            if(key == "kirim_sebagai"){
                if(form[key] != "Anonim"){
                    formData.append(key,accountName)
                }
            }else{
                formData.append(key,form[key])
            }
        }
        //kumpul gambar juga
        formData.append("image",imagePath,"IMAGE.jpg")
        //debug:
        for(const x of formData.entries()){
            console.log(x)
        }
        //kirim ke server
        const response = await sendReport(formData)
        setResponseStatus(response)
    }

    //update pilihan kabupaten ketika pprovinsi diubah
    const [ regencyNow , setRegency ] = useState([])
    useEffect(()=>{
        const func = async ()=>{
            console.log('provinsi diubah',form.provinsi)
            const obj = region.find(i=>i.province === form.provinsi)
            setRegency(obj?.regency?? [])
        }
        func()
    },[form.provinsi])

    return(
        <>
        <form onSubmit={submitData} id={styles.container}>
            <div id={styles.dropdownMenu}>
                <div id={styles.dropdownLabelSide}>
                    <div className={styles.formInput}>
                        <label>
                            Kirim sebagai:
                        </label>   
                    </div>
                    
                    <div className={styles.formInput}>
                        <label>
                            Masukkan jenis Pengaduan:
                        </label>
                    </div>
                    
                    <div className={styles.formInput}>
                        <label>
                            Kondisi masalah saat ini:
                        </label>
                    </div>
                    
                    <div className={styles.formInput}>
                        <label>
                            Siapa saja yang terdampak masalah saat ini:
                        </label>
                    </div>

                    <div className={styles.formInput}>
                        <label>
                            Masukkan Provinsi:
                        </label>
                    </div>

                    <div className={styles.formInput}>
                        <label>
                            Masukkan Kabupaten:
                        </label>
                    </div>

                    <div className={styles.formInput}>
                        <label>
                            Berikan penjelasan selengkap mungkin
                            <br/>
                        </label>
                    </div>
                </div>

                <div id={styles.dropdownSide}>
                            <select value={form.kirim_sebagai} name="kirim_sebagai" onChange={handleChange}>
                                <option value="Anonim">Anonim</option>
                                <option value="User">{accountName}</option>
                            </select>

                            <select value={form.jenis_pengaduan} name="jenis_pengaduan" onChange={handleChange}>
                                {opsi_pengaduan.map((value)=>(
                                    <option value={value} key={value}>{value}</option>
                                ))}
                            </select>

                            <select value={form.kondisi_saat_ini} name="kondisi_saat_ini" onChange={handleChange}>
                                <option value="Belum-terselesaikan">Belum Terselesaikan</option>
                                <option value="Tidak-Diselesaikan">Tidak di selesaikan sama sekali</option>
                            </select>

                            <select value={form.yang_terdampak} name="yang_terdampak" onChange={handleChange}>
                                <option value="saya-sendiri">Saya sendiri</option>
                                <option value="Semua-Masyarakat">Semua Masyarakat</option>
                            </select>
                    
                            <select value={form.provinsi} name="provinsi" onChange={handleChange}>
                                {region.map((value)=>(
                                    <option value={value.province} key={value.province}>{value.province}</option>
                                ))}
                            </select>

                            <select value={form.kabupaten} name="kabupaten" onChange={handleChange}>
                                {regencyNow.map((value)=>(
                                    <option value={value} key={value}>{value}</option>
                                ))}
                            </select>

                            <textarea type="textarea" rows="5" cols="50" value={form.penjelasan} name="penjelasan" onChange={handleChange}/>
                </div>

            </div>
            <label>
                Masukkan bukti jika ada
                <br />
                <input type="file" onChange={handleImage}/>
            </label>
            {preview == null ? (<></>) : (
                <div id={styles.imagePreview}>
                    <ImageCropper image={preview} onCrop={onCropped}/>
                </div>
            )}
                
            <br />
            <label>
                Siapa saja yang terkait dengan masalah ini
                <input type="text" />
            </label>
            <br />
            <input type="submit" value="kirim"/>
        </form>

        {hasSubmit ? (
            <div id={styles.loadingContainer}>
                <div id={styles.loadingPopup}>
                    <div id={styles.onLoadContainer}>
                            {responseStatus == "loading"?(
                                <>
                                    <div id={styles.loadContent}>
                                        {/* ini stage untuk loading */}
                                        <div className={styles.loader}></div>
                                        <p>Loading...</p>
                                    </div>
                                </>
                            ):(
                                <>
                                    <div id={styles.responseContent}>
                                        {responseStatus}
                                        <br/>
                                        <button onClick={()=>setHasSubmit(false)}>Kembali</button>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
        ): (<></>)}
        </>
    );
}

export default Reports;