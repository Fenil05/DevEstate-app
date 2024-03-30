import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).send("Not Authenticated!")
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
        if(err){
            return res.status(401).send("Token is not valid!")
        }
        
        req.userId = payload.id

        next()
    })

}