import db from "../application/firestore.js";

export const getUsername = async(req,res)=>{
    res.json({status:'succeed',username:req.cookies?.username}) 
}

export const logOut = async(req,res)=>{
    const token = req.cookies?.token;
    const username = req.cookies?.username;

    try {
        if (token) {
            const sessionDocs = await db.collection('sessions').where("token", "==", token).get();
            sessionDocs.forEach(doc => doc.ref.delete());
        }
        if (username) {
            const sessionUserDocs = await db.collection('sessions').where("user", "==", username).get();
            sessionUserDocs.forEach(doc => doc.ref.delete());
        }
    } catch (err) {
        console.log("Error deleting session on logout:", err);
    }

    // Clear cookies for all sameSite / secure / path permutations
    const isProd = process.env.NODE_ENV === "production";
    const clearOptions = [
        { httpOnly: true, path: "/" },
        { httpOnly: true, secure: true, sameSite: "none", path: "/" },
        { httpOnly: true, secure: false, sameSite: "lax", path: "/" },
        { httpOnly: true, secure: isProd, sameSite: isProd ? "none" : "lax", path: "/" },
        { path: "/" }
    ];

    clearOptions.forEach(opt => {
        try {
            res.clearCookie("token", opt);
            res.clearCookie("username", opt);
            res.cookie("token", "", { ...opt, expires: new Date(0), maxAge: 0 });
            res.cookie("username", "", { ...opt, expires: new Date(0), maxAge: 0 });
        } catch (e) {}
    });

    return res.json({ status: 'succeed' });
}