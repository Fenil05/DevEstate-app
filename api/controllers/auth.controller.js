import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    const {username,email,password} = req.body

    try {
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword
        }
    })
    res.status(201).send("User created Successfully")
    }
    catch (err) {
        res.status(500).send("Failed to create user!")
    }
}

export const login = async(req,res)=>{
    const {username,password} = req.body

    try {
       const user = await prisma.user.findUnique({
        where:{username}
       })

       if(!user){
        return res.status(401).send("Invalid Credentials!")
       }

       const isPasswordValid = await bcrypt.compare(password,user.password)

       if(!isPasswordValid){
        return res.status(401).send("Invalid Credentials!")
       }

       const age = 1000 * 60 * 60 * 24 * 7

       const token = jwt.sign({
        id:user.id
       },process.env.JWT_SECRET_KEY,
       {expiresIn:age}
       )

       res.cookie("token",token,{
        httpOnly:true,
        maxAge:age
       }).status(200).send("Login Successfull")

    } catch (err) {
        res.status(500).send("Failed to login!")
    }

}

export const logout = (req,res)=>{
    res.clearCookie("token").status(200).send("Logout successfull!")
}