import db from "../application/firestore.js";

const viewService = async (param) => {
    switch(param){
        case "Newest":
            console.log('lurrr')
            //const snapshot = await db.collection('reports').orderBy('createdAt',"desc").limit(3).get()
            const snapshot = await db.collection('reports').orderBy('date','asc').limit(5).get()
            const result = []
            snapshot.forEach(doc => {
                result.push(doc.data())
            })
            return result
    }
}

export default viewService