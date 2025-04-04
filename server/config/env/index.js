import "dotenv/config"

export const PORT = process.env.PORT
export const MONGO_CRED = process.env.MONGO_CRED
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
export const JWT_EXPIRY_TIME = process.env.JWT_EXPIRY_TIME