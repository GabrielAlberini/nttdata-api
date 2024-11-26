import { Router } from "express"
import { userRegister, userLogin } from "../controllers/userController.js"

const userRouter = Router()

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)

export { userRouter }