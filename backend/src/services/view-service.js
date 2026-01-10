import db from "../application/firestore.js";

const viewService = async (param) => {
    switch(param){
        case "Newest":
            console.log('lurrr')
            //const snapshot = await db.collection('reports').orderBy('createdAt',"desc").limit(3).get()
            const snapshot = await db.collection('reports').orderBy('kabupaten','desc').limit(3).get()

            snapshot.forEach(doc => {
                console.log(doc.data())
            })

            break;
    }
}

export default viewService