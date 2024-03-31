import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send("Failed to get Users!")
    }
}

export const getuser = async(req,res)=>{
    const id = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where:{id}
        })
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send("Failed to get user!")
    }
}

export const updateUser = async(req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId
    const {password,avatar,...inputs} = req.body
    
    if(id !== tokenUserId){
        return res.status(403).send("Not Authorized!")
    }

    let updatedPassword = null

    try {
        if(password){
            updatedPassword = await bcrypt.hash(password,10)
        }
        const updatedUser = await prisma.user.update({
            where:{id},
            data:{
                ...inputs,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar})
            }
        })

        const {password:userPassword,...rest} = updatedUser

        res.status(200).send(rest)
    } catch (err) {
        res.status(500).send("Failed to update users!")
    }
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId
    
    if(id !== tokenUserId){
        return res.status(403).send("Not Authorized!")
    }

    try {
        await prisma.user.delete({
            where:{id}
        })
        res.status(200).send("User deleted!")
    } catch (err) {
        res.status(500).send("Failed to delete users!")
    }
}