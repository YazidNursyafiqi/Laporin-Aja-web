import db from "./src/application/firestore.js";
import region from './province.json' with {type:'json'}

const x = {"Infrastruktur dan Fasilitas":0,"Kebersihan dan Lingkungan":0,"Keamanan dan Ketertiban":0,"Pelayanan Publik dan aparatur":0,"Tindakan Korupsi":0,"Sosial dan Kemasyarakatan":0,"Kesehatan":0,"Lalu Lintas dan Transportasi":0,"Perizinan dan Usaha":0,"Lainnya":0}

region.map((val)=>{
    db.collection('regions').doc('general').update({[val.province]:{total:0,type:x}})
})