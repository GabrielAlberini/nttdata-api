import { userValidator } from "../validators/userValidator.js"
import bcryptjs from "bcryptjs"
import { User } from "../models/userModel.js"
import jwt from "jsonwebtoken"

process.loadEnvFile()

const JWT_SECRET = process.env.JWT_SECRET

const userRegister = async (req, res) => {
  try {
    const userData = userValidator.parse(req.body)

    const { email, password } = userData

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newDataUser = { email, password: hashedPassword }

    const newUser = new User(newDataUser)

    await newUser.save()

    res.status(201).json(newDataUser)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors })
    }
    res.status(500).json({ message: "Error registering user", error: error.message })
  }
}

const userLogin = async (req, res) => {
  try {
    const userData = userValidator.parse(req.body)

    const { email, password } = userData

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const payload = { userId: user._id }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })

    res.json({ message: "Login successful", token, user: { email: user.email, id: user._id } })
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors })
    }
    res.status(500).json({ message: "Error registering user", error: error.message })
  }
}

export { userRegister, userLogin }