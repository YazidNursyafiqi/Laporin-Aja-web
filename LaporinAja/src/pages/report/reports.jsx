import { use } from "react";
import { useState , useEffect } from "react";
import styles from './reports.module.css'
import sendReport from "../../hooks/sendReport.js";
import ImageCropper from "../../component/cropper/cropper.jsx";
import checkAuth from "../../hooks/checkAuth.js";
import { useNavigate } from "react-router-dom";
import { Rounded_button , Link_button } from "../../component/button/buttonUI";

//import data wilayah di indonesia
import region from '../../component/province.json'

function PerpetratorItem({name,role,onDelete}){
    return(
        <div>
            {name} = {role} 
            <button id={styles.buttonDel} type="button" onClick={()=>onDelete(name)}>Remove</button>
        </div>
    )
}

function Reports(){
    const navigate = useNavigate()
    
    //data form yang value nya berupa string di simpan sementara di sini sebelum di submit
    const [ accountName , setAccountName] = useState("User")
    const [ form , setForm ] = useState({
        kirim_sebagai:"",
        jenis_pengaduan:"Infrastruktur dan Fasilitas",
        provinsi:"Provinsi Aceh",
        kabupaten:"",
        penjelasan:"",
        kondisi_saat_ini:"Belum Terselesaikan",
        yang_terdampak:"Saya sendiri"
        //default value
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

        setForm({...form,[name]:value});
        
        //console.log('diubah')
        //console.log(form)
        
    }
    
    useEffect(()=>{
        return()=>{
            URL.revokeObjectURL(preview)
        }
    }, [preview])
    
    const opsi_pengaduan = ["Infrastruktur dan Fasilitas","Kebersihan dan Lingkungan","Keamanan dan Ketertiban","Pelayanan Publik dan aparatur","Tindakan Korupsi","Sosial dan Kemasyarakatan","Kesehatan","Lalu Lintas dan Transportasi","Perizinan dan Usaha","Lainnya"]
    
    
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
            formData.append(key,form[key])
        }
        //kumpul gambar juga
        if(imagePath != null){
            formData.append("image",imagePath,"IMAGE.jpg")
        }else{
            formData.append("image","no-image")
        }
        //kumpul daftar pelaku
        formData.append("yang_terkait",JSON.stringify(perpetratorList))
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
    
    //fungsi untuk membuat menu list terkait
    const [perpetratorList,setPerpetratorList] = useState({})
    const [perpetratorInput,setPerpetratorInput] = useState({
        nama:"",
        sebagai:""
    })
    const handlePerpetratorChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setPerpetratorInput({...perpetratorInput,[name]:value})
    }
    const addPerpetrator = ()=>{
        const newName = perpetratorInput.nama
        const newRole = perpetratorInput.sebagai
        
        setPerpetratorList({...perpetratorList,[newName]:newRole})
    }
    const deletePerpetrator = (name)=>{
        const {[name]:_,...removed} = perpetratorList
        setPerpetratorList(removed)
    }
    
    //cek autentikasi user
    useEffect(()=>{
        async function x(){
            const response = await checkAuth()
            if(response.status == "succeed"){
            setAccountName(response.user)
                setForm({...form,"kirim_sebagai":response.user})
            }else{
                navigate("/login")
            }
        }  
        x()
    },[])
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
                            <p>{accountName}</p>

                            <select id={styles.placeholder} value={form.jenis_pengaduan} name="jenis_pengaduan" onChange={handleChange}>
                                {opsi_pengaduan.map((value)=>(
                                    <option value={value} key={value}>{value}</option>
                                ))}
                            </select>

                            <select id={styles.placeholder} value={form.kondisi_saat_ini} name="kondisi_saat_ini" onChange={handleChange}>
                                <option value="Belum-terselesaikan">Belum Terselesaikan</option>
                                <option value="Tidak-Diselesaikan">Tidak di selesaikan sama sekali</option>
                            </select>

                            <select id={styles.placeholder} value={form.yang_terdampak} name="yang_terdampak" onChange={handleChange}>
                                <option value="saya-sendiri">Saya sendiri</option>
                                <option value="Semua-Masyarakat">Semua Masyarakat</option>
                            </select>
                    
                            <select id={styles.placeholder} value={form.provinsi} name="provinsi" onChange={handleChange}>
                                {region.map((value)=>(
                                    <option value={value.province} key={value.province}>{value.province}</option>
                                ))}
                            </select>

                            <select id={styles.placeholder} value={form.kabupaten} name="kabupaten" onChange={handleChange}>
                                {regencyNow.map((value)=>(
                                    <option value={value} key={value}>{value}</option>
                                ))}
                            </select>

                            <textarea id={styles.textArea} type="textarea" rows="5" cols="50" value={form.penjelasan} name="penjelasan" onChange={handleChange}/>
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
            </label>
            <div>
                <label>Identitas : </label>
                <input type="text" id={styles.placeholder} value={perpetratorInput.nama} name="nama" onChange={handlePerpetratorChange}/>
                <label>Peran : </label>
                <input type="text" id={styles.placeholder} value={perpetratorInput.sebagai} name="sebagai" onChange={handlePerpetratorChange}/>
                {/* <Rounded_button text="Tambah" onClick={addPerpetrator}></Rounded_button> */}
                <button type="button" id={styles.button} onClick={addPerpetrator}>Tambah</button>
                <div>
                    {Object.keys(perpetratorList).map(key=>(
                        <PerpetratorItem name={key} role={perpetratorList[key]} onDelete={deletePerpetrator}/>
                    ))}
                </div>
            </div>
            <br />
            <input type="submit" value="Kirim" id={styles.button}/>
            <button type="button" id={styles.button} onClick={() => navigate('/ViewProblems/Wilayah')}>Lihat daftar pengaduan</button>
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