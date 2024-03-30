import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = async(req,res)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).send("Not Authenticated!")
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
        if(err){
            return res.status(401).send("Token is not valid!")
        }

        res.status(200).send("You are authenticated!")
    })
}

export const shouldBeAdmin = async(req,res)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).send("Not Authenticated!")
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
        if(err){
            return res.status(401).send("Token is not valid!")
        }
        if(!payload.isAdmin){
            return res.status(403).send("Not Authorized!")
        }

        res.status(200).send("You are authenticated!")
    })

}