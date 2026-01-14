import db from "../application/firestore.js";

const viewService = async (param,date,forward) => {
    switch(param){
        case "Newest":
            let snapshot = null

            if(Number.isNaN(date)){
                //load pertama kali
                console.log('aaa')
                snapshot = await db.collection('reports').orderBy('date','desc').limit(5).get()
            }else{
                //load berdasarkan cursor
                if(forward){
                    snapshot = await db.collection('reports').orderBy('date','desc').startAfter(date).limit(5).get()
                }else{
                    snapshot = await db.collection('reports').orderBy('date','asc').startAfter(date).limit(5).get()
                }
            }

            //jadikan 1 array
            const result = []
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

    //kalau param failed
    return []
}

export default viewService