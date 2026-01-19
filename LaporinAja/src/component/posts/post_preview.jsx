import styles from './post_preview.module.css'
import { useState } from 'react'
import { Post } from './Post'
import deleteReport from '../../hooks/deleteReport'

export default function PostPreview({content}){
    const [viewPost,setViewPost] = useState(false)
    const [deletePopup,setDeletePopup] = useState(false)
    const [deleteAccept,setDeleteAccept] = useState(false)
    const [deleteProccess,setDeleteProccess] = useState(false)
    const [deleteResult,setDeleteResult] = useState('Hello world')

    const handleView = ()=>{
        if(viewPost){
            setViewPost(false)
        }else{
            setViewPost(true)
        }
    }

    const handleDelete = async()=>{
        setDeleteAccept(true)
        const response = await deleteReport(content.id)
        console.log(response)
        setDeleteResult(response.status)
        setDeleteProccess(true)
    }


    return(
       <>
            <div id={styles.container}>
                <div id={styles.details}>
                    <div id={styles.header}>
                        <div>
                            <img src='/icons/location-pin.png'/>
                            {content.provinsi}, {content.kabupaten}
                        </div>
                        <div>
                            <img src='/icons/danger.png'/>
                            {content.jenis_pengaduan}
                        </div>
                    </div>
                    <div id={styles.explain}>
                        <p>
                            {content.penjelasan}
                        </p>
                    </div>
                    <div id={styles.menu}>
                        <button id={styles.backButton} onClick={handleView}>Lihat</button>
                        <button id={styles.delButton} onClick={()=>setDeletePopup(true)}>Hapus</button>
                    </div>
                </div>
                <div>

                </div>
            </div>

            {viewPost?(
                <div id={styles.viewPostContainer}>
                    <div id={styles.viewPostContent}>
                        <div id={styles.viewPostScroller}>
                            <Post postId={content["id"]} type={content["jenis_pengaduan"]} province={content["provinsi"]} regency={content["kabupaten"]} from={content["kirim_sebagai"]} explain={content["penjelasan"]} image={content["imagePath"]} perpetrator={content["yang_terkait"]} comments={content["comments"]} likes={content["likes"]}/>
                        </div>
                    </div>
                    <button id={styles.backButton} onClick={handleView}>Kembali</button>
                </div>
            ):null}

            {deletePopup?(
                <div id={styles.deletePopupContainer}>
                    <div id={styles.deletePopup}>
                        {!deleteAccept?(
                            <>
                                <div id={styles.deletePopupTitle}>
                                    <p>Apakah anda yakin ingin menghapus Laporan ini?</p>
                                </div>
                                <div id={styles.deletePopupMenu}>
                                    <button id={styles.delButton} onClick={handleDelete}>Ya</button>
                                    <button id={styles.backButton} onClick={()=>setDeletePopup(false)}>Kembali</button>
                                </div>
                            </>
                        ):(
                            <>
                                {!deleteProccess?(
                                    <>loading</>
                                ):(
                                    <>
                                        <div id={styles.deletePopupTitle}>
                                            <p>{deleteResult}</p>
                                        </div>
                                        <div id={styles.deletePopupMenu}>
                                            <button id={styles.backButton} onClick={()=>window.location.reload()}>Kembali</button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ):null}
       </> 
    )
}