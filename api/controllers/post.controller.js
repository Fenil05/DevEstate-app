import prisma from "../lib/prisma.js"

export const getPosts = async(req,res)=>{
    try {
        const posts = await prisma.post.findMany()
        res.status(200).send(posts)
    } catch (err) {
        res.status(500).send("Failed to get posts!")
    }
}

export const getPost = async(req,res)=>{
    const id = req.params.id
    try {
        const post = await prisma.post.findUnique({
            where:{id}
        })
        res.status(200).send(post)
    } catch (err) {
        res.status(500).send("Failed to get post!")
    }
}

export const addPost = async(req,res)=>{
    const body = req.body
    const tokenUserId = req.userId
    try {
        const newPost = await prisma.post.create({
            data:{
                ...body,
                userId:tokenUserId
            }
        })
        res.status(200).send(newPost)
    } catch (err) {
        res.status(500).send("Failed to add posts!")
    }
}

export const updatePost = async(req,res)=>{
    try {
        
    } catch (err) {
        res.status(500).send("Failed to update posts!")
    }
}

export const deletePost = async(req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId
    try {
        const post = await prisma.post.findUnique({
            where:{id}
        })

        if(post.userId !== tokenUserId){
            return res.status(403).send("Not Authorized!")
        }

        await prisma.post.delete({
            where:{id}
        })
        
        res.status(200).send("Post deleted!")
    } catch (err) {
        res.status(500).send("Failed to delete posts!")
    }
}