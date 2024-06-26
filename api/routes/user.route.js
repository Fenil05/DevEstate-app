import express from "express"
import { deleteUser, getUsers, getuser,profilePosts,savePost, updateUser } from "../controllers/user.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/",getUsers)
// router.get("/:id",verifyToken,getuser)
router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyToken,deleteUser)
router.post("/save",verifyToken,savePost)
router.get("/profilePosts",verifyToken,profilePosts)

export default router