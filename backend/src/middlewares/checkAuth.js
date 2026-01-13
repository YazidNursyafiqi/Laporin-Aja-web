import db from "../application/firestore.js"

const checkAuthMiddleware = async(req,res,next)=>{
    if(req.cookies?.token != undefined || req.cookies?.user != undefined){ //periksa apakah client punya cookie username dan token
        console.log(req.cookies.token)
        //ketika user punya auth token
        const search = await db.collection('sessions').where("token","==",req.cookies.token).limit(1).get()
        if(!search.empty){
            const resultUser = search.docs[0].data().user
            if(req.cookies.username == resultUser){
                //periksa apakah username valid dengan token
                return next()
            }    
        }
    }
    res.json({status:"Unauthorized"})
}

export default checkAuthMiddleware