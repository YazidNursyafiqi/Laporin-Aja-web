import db from "../application/firestore.js";

export const viewService = async (param,postId,province,type,forward) => {
    console.log(postId, ' ' , province," ",type , ' ', param)
    //ketika forward/backward salah satu dari postId dan filter undefined
    //cek apakah param valid
    const availableParamList = ['Newest','Oldest','Likes','Province','Type']
    if(!availableParamList.includes(param)){
        return [] //kalau param failed
    }

    let snapshot = null

    if(postId == null || postId == undefined){
        //load pertama kali
        console.log('load pertama')
        switch(param){
            case 'Newest':
                snapshot = await db.collection('reports').orderBy('date','desc').limit(5).get()
                break
            case 'Oldest':
                snapshot = await db.collection('reports').orderBy('date','asc').limit(5).get()
                break
            case 'Likes':
                snapshot = await db.collection('reports').orderBy('likes','desc').orderBy('date','desc').limit(5).get()
                break
            case 'Province':
                snapshot = await db.collection('reports').where('provinsi','==',province).orderBy('date','desc').limit(5).get()
                break
            case 'Type':
                snapshot = await db.collection('reports').where('jenis_pengaduan','==',type).orderBy('date','desc').limit(5).get()
                break
        }
    }else{
        console.log('load kedua')
        const x = await db.collection('reports').where('id','==',postId).limit(1).get()
        const cursor = x.docs[0]

        //load berdasarkan cursor
        if(forward){
            switch(param){
                case 'Newest':
                    snapshot = await db.collection('reports').orderBy('date','desc').startAfter(cursor).limit(5).get()
                    break
                case 'Oldest':
                    snapshot = await db.collection('reports').orderBy('date','asc').startAfter(cursor).limit(5).get()
                    break
                case 'Likes':   
                    snapshot = await db.collection('reports').orderBy('likes','desc').orderBy('date','desc').startAfter(cursor).limit(5).get()
                    break
                case 'Province':   
                    snapshot = await db.collection('reports').where('provinsi','==',province).orderBy('date','desc').startAfter(cursor).limit(5).get()
                    break
                case 'Type':
                    snapshot = await db.collection('reports').where('jenis_pengaduan','==',type).orderBy('date','desc').startAfter(cursor).limit(5).get()
                    break
                        
            }
        }else{
            switch(param){
                case 'Newest':
                    snapshot = await db.collection('reports').orderBy('date','asc').startAfter(cursor).limit(5).get()
                    break
                case 'Oldest':
                    snapshot = await db.collection('reports').orderBy('date','desc').startAfter(cursor).limit(5).get()
                    break
                case 'Likes':
                    snapshot = await db.collection('reports').orderBy('likes','asc').orderBy('date','asc').startAfter(cursor).limit(5).get()
                    break
                case 'Province':   
                    snapshot = await db.collection('reports').where('provinsi','==',province).orderBy('date','asc').startAfter(cursor).limit(5).get()
                    break
                case 'Type':
                    snapshot = await db.collection('reports').where('jenis_pengaduan','==',type).orderBy('date','asc').startAfter(cursor).limit(5).get()
                    break
            }
            //snapshot = await db.collection('reports').orderBy('date','asc').startAfter(date).limit(5).get()
        }
    }

    //jadikan 1 array
    const result = []
    console.log(forward)
    snapshot.forEach(doc => {
        if(forward){
            result.push(doc.data())
        }else{
            result.unshift(doc.data())
        }
    })

    //ambil jumlah total postingan
    const len = await db.collection('reports').count().get()
    const total = len.data().count
    return {content:result,totalPost:total}
}

export const getProvinceStatusService = async()=>{
    const result = await db.collection('regions').doc('general').get()
    return result.data()
}
