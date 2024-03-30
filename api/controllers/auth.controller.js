import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"

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

export const login = (req,res)=>{
    
}

export const logout = (req,res)=>{
    
}