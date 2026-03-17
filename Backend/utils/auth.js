import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'fty5765r67utguyyty5t';

export const signToken = (user) => {
    return jwt.sign({id: user.id, username: user.username, user_type: user.user_type}, JWT_SECRET,{
        expiresIn:'5h'
    })
}

export const verifyToken = (token) =>{
    return jwt.verify(token, JWT_SECRET)
}