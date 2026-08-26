import db from "../application/firestore.js";

export const viewService = async (param, postId, province, type, forward) => {
    console.log(postId, ' ', province, " ", type, ' ', param);
    const availableParamList = ['Newest', 'Oldest', 'Likes', 'Province', 'Type', 'Search'];
    if (!availableParamList.includes(param)) {
        return { content: [], totalPost: 0 };
    }

    let snapshot = null;

    try {
        if (postId == null || postId == undefined) {
            console.log('load pertama');
            switch (param) {
                case 'Newest':
                    snapshot = await db.collection('reports').orderBy('date', 'desc').limit(5).get();
                    break;
                case 'Oldest':
                    snapshot = await db.collection('reports').orderBy('date', 'asc').limit(5).get();
                    break;
                case 'Likes':
                    try {
                        snapshot = await db.collection('reports').orderBy('likes', 'desc').orderBy('date', 'desc').limit(5).get();
                    } catch (e) {
                        snapshot = await db.collection('reports').orderBy('likes', 'desc').limit(5).get();
                    }
                    break;
                case 'Province':
                    try {
                        snapshot = await db.collection('reports').where('provinsi', '==', province).orderBy('date', 'desc').limit(5).get();
                    } catch (e) {
                        snapshot = await db.collection('reports').where('provinsi', '==', province).get();
                    }
                    break;
                case 'Type':
                    try {
                        snapshot = await db.collection('reports').where('jenis_pengaduan', '==', type).orderBy('date', 'desc').limit(5).get();
                    } catch (e) {
                        snapshot = await db.collection('reports').where('jenis_pengaduan', '==', type).get();
                    }
                    break;
                case 'Search':
                    snapshot = await db.collection('reports').get();
                    break;
            }
        } else {
            console.log('load kedua');
            const x = await db.collection('reports').where('id', '==', postId).limit(1).get();
            const cursor = !x.empty ? x.docs[0] : null;

            if (forward) {
                switch (param) {
                    case 'Newest':
                        snapshot = cursor 
                            ? await db.collection('reports').orderBy('date', 'desc').startAfter(cursor).limit(5).get()
                            : await db.collection('reports').orderBy('date', 'desc').limit(5).get();
                        break;
                    case 'Oldest':
                        snapshot = cursor 
                            ? await db.collection('reports').orderBy('date', 'asc').startAfter(cursor).limit(5).get()
                            : await db.collection('reports').orderBy('date', 'asc').limit(5).get();
                        break;
                    case 'Likes':
                        try {
                            snapshot = cursor 
                                ? await db.collection('reports').orderBy('likes', 'desc').orderBy('date', 'desc').startAfter(cursor).limit(5).get()
                                : await db.collection('reports').orderBy('likes', 'desc').limit(5).get();
                        } catch (e) {
                            snapshot = await db.collection('reports').orderBy('likes', 'desc').limit(5).get();
                        }
                        break;
                    case 'Province':
                        try {
                            snapshot = cursor 
                                ? await db.collection('reports').where('provinsi', '==', province).orderBy('date', 'desc').startAfter(cursor).limit(5).get()
                                : await db.collection('reports').where('provinsi', '==', province).limit(5).get();
                        } catch (e) {
                            snapshot = await db.collection('reports').where('provinsi', '==', province).get();
                        }
                        break;
                    case 'Type':
                        try {
                            snapshot = cursor 
                                ? await db.collection('reports').where('jenis_pengaduan', '==', type).orderBy('date', 'desc').startAfter(cursor).limit(5).get()
                                : await db.collection('reports').where('jenis_pengaduan', '==', type).limit(5).get();
                        } catch (e) {
                            snapshot = await db.collection('reports').where('jenis_pengaduan', '==', type).get();
                        }
                        break;
                    case 'Search':
                        snapshot = await db.collection('reports').get();
                        break;
                }
            } else {
                switch (param) {
                    case 'Newest':
                        snapshot = cursor 
                            ? await db.collection('reports').orderBy('date', 'asc').startAfter(cursor).limit(5).get()
                            : await db.collection('reports').orderBy('date', 'asc').limit(5).get();
                        break;
                    case 'Oldest':
                        snapshot = cursor 
                            ? await db.collection('reports').orderBy('date', 'desc').startAfter(cursor).limit(5).get()
                            : await db.collection('reports').orderBy('date', 'desc').limit(5).get();
                        break;
                    case 'Likes':
                        try {
                            snapshot = cursor 
                                ? await db.collection('reports').orderBy('likes', 'asc').orderBy('date', 'asc').startAfter(cursor).limit(5).get()
                                : await db.collection('reports').orderBy('likes', 'asc').limit(5).get();
                        } catch (e) {
                            snapshot = await db.collection('reports').orderBy('likes', 'asc').limit(5).get();
                        }
                        break;
                    case 'Province':
                        try {
                            snapshot = cursor 
                                ? await db.collection('reports').where('provinsi', '==', province).orderBy('date', 'asc').startAfter(cursor).limit(5).get()
                                : await db.collection('reports').where('provinsi', '==', province).limit(5).get();
                        } catch (e) {
                            snapshot = await db.collection('reports').where('provinsi', '==', province).get();
                        }
                        break;
                    case 'Type':
                        try {
                            snapshot = cursor 
                                ? await db.collection('reports').where('jenis_pengaduan', '==', type).orderBy('date', 'asc').startAfter(cursor).limit(5).get()
                                : await db.collection('reports').where('jenis_pengaduan', '==', type).limit(5).get();
                        } catch (e) {
                            snapshot = await db.collection('reports').where('jenis_pengaduan', '==', type).get();
                        }
                        break;
                }
            }
        }
    } catch (err) {
        console.error("View service query error:", err.message);
        snapshot = null;
    }

    const result = [];
    if (snapshot && !snapshot.empty) {
        snapshot.forEach(doc => {
            if (forward !== false) {
                result.push(doc.data());
            } else {
                result.unshift(doc.data());
            }
        });
    }

    let total = 0;
    try {
        if (param === 'Province' && province) {
            const countSnap = await db.collection('reports').where('provinsi', '==', province).count().get();
            total = countSnap.data().count;
        } else if (param === 'Type' && type) {
            const countSnap = await db.collection('reports').where('jenis_pengaduan', '==', type).count().get();
            total = countSnap.data().count;
        } else {
            const len = await db.collection('reports').count().get();
            total = len.data().count;
        }
    } catch (e) {
        total = result.length;
    }

    return { content: result, totalPost: total };
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