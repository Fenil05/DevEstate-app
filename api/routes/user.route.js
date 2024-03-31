import express from "express"
import { deleteUser, getUsers, getuser, updateUser } from "../controllers/user.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/",getUsers)
router.get("/:id",verifyToken,getuser)
router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyToken,deleteUser)

export default router