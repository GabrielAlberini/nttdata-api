import jwt from "jsonwebtoken"

process.loadEnvFile()

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Authorization required" })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = { id: decoded.userId }
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" })
  }
}

export { authMiddleware }