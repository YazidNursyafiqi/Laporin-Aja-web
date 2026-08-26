import db from "../application/firestore.js";

export const viewService = async (param, postId, province, type, forward) => {
    console.log(postId, ' ', province, " ", type, ' ', param);
    const availableParamList = ['Newest', 'Oldest', 'Likes', 'Province', 'Type', 'Search'];
    if (!availableParamList.includes(param)) {
        return { content: [], totalPost: 0 };
    }

    try {
        let allDocs = [];

        if (param === 'Newest') {
            const snap = await db.collection('reports').orderBy('date', 'desc').get();
            snap.forEach(doc => allDocs.push(doc.data()));
        } else if (param === 'Oldest') {
            const snap = await db.collection('reports').orderBy('date', 'asc').get();
            snap.forEach(doc => allDocs.push(doc.data()));
        } else if (param === 'Likes') {
            try {
                const snap = await db.collection('reports').orderBy('likes', 'desc').orderBy('date', 'desc').get();
                snap.forEach(doc => allDocs.push(doc.data()));
            } catch (e) {
                const snap = await db.collection('reports').orderBy('likes', 'desc').get();
                snap.forEach(doc => allDocs.push(doc.data()));
            }
        } else if (param === 'Province') {
            const targetProv = province || 'Provinsi Aceh';
            const snap = await db.collection('reports').where('provinsi', '==', targetProv).get();
            snap.forEach(doc => allDocs.push(doc.data()));

            // Smart filter: if type is also specified and matching reports exist, use them
            if (type) {
                const filteredByType = allDocs.filter(d => d.jenis_pengaduan === type);
                if (filteredByType.length > 0) {
                    allDocs = filteredByType;
                }
            }
            allDocs.sort((a, b) => (b.date || 0) - (a.date || 0));
        } else if (param === 'Type') {
            const targetType = type || 'Infrastruktur dan Fasilitas';
            const snap = await db.collection('reports').where('jenis_pengaduan', '==', targetType).get();
            snap.forEach(doc => allDocs.push(doc.data()));

            // Smart filter: if province is also specified and matching reports exist, use them
            if (province) {
                const filteredByProv = allDocs.filter(d => d.provinsi === province);
                if (filteredByProv.length > 0) {
                    allDocs = filteredByProv;
                }
            }
            allDocs.sort((a, b) => (b.date || 0) - (a.date || 0));
        } else if (param === 'Search') {
            const snap = await db.collection('reports').get();
            snap.forEach(doc => allDocs.push(doc.data()));
            allDocs.sort((a, b) => (b.date || 0) - (a.date || 0));
        }

        const totalPost = allDocs.length;
        let startIndex = 0;

        if (postId) {
            const foundIdx = allDocs.findIndex(d => d.id === postId);
            if (foundIdx !== -1) {
                startIndex = forward !== false ? foundIdx + 1 : Math.max(0, foundIdx - 5);
            }
        }

        const content = allDocs.slice(startIndex, startIndex + 5);
        return { content, totalPost };
    } catch (err) {
        console.error("View service query error:", err.message);
        return { content: [], totalPost: 0 };
    }
};

export const getLikesService = async(username,postId,forward)=>{
    const account = await db.collection('accounts').where('username','==',username).limit(1).get()
    const likeList = account.docs[0].data().likes 
    const likeTotal = likeList.length
    const postList = []

    //atur load postingan start atau end sampai mana (berlaku untuk forward)
    let loadList = []
    if(postId == undefined){ //awal load
        loadList = likeList.slice(0,5)
    }else{ //next/back
        if(forward){  //forward
            const indexCursor = likeList.indexOf(postId)
            loadList = likeList.slice(indexCursor+1,indexCursor + 6)
        }else{
            const indexCursor = likeList.indexOf(postId)
            loadList = likeList.slice((indexCursor-5 < 0 ? 0 : indexCursor-5),indexCursor)
        }
    }

    //isi array postlist berdasarkan array likeList berisi PostId yang di ambil dari account
    for(const id of loadList){
        const postResult = await db.collection('reports').where('id','==',id).limit(1).get()
        postList.push(postResult.docs[0].data())
    }

    return {content:postList,totalPost:likeTotal}
}

export const getProvinceStatusService = async()=>{
    const result = await db.collection('regions').doc('general').get()
    return result.data()
}

export const getMyPostsService = async(username)=>{
    const snapshot = await db.collection('accounts').where('username','==',username).limit(1).get()
    const postIdList = snapshot.docs[0].data().posts
    const postContentList = []
    console.log(postIdList)

    for(const id of postIdList){
        const data = await db.collection('reports').where('id','==',id).limit(1).get() 
        postContentList.unshift(data.docs[0].data())
    }

    return({content:postContentList})
}