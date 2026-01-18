export const getUsername = async(req,res)=>{
    res.json({status:'succeed',username:req.cookies.username}) 
}

export const logOut = async(req,res)=>{
    res.clearCookie('token',{httpOnly:true}) //hapus token
    res.clearCookie('username',{httpOnly:true}) //hapus username
    res.json({status:'succeed'}) 
}