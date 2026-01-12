import db from "../application/firestore.js"

const checkAuthMiddleware = async(req,res,next)=>{
    if(req.cookies?.token != undefined){
        console.log(req.cookies.token)
        //ketika user punya auth token
        const search = await db.collection('sessions').where("token","==",req.cookies.token).limit(1).get()
        if(!search.empty){
            return next()
        }
    }
    res.json({status:"Unauthorized"})
}

export default checkAuthMiddleware