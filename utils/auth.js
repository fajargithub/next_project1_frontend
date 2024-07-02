import jwt from 'jsonwebtoken';

const SECRET_KEY = "your_secret_key";

export const verifyToken = (token) => {
    console.log(token);
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        console.log('Error verifying token:', error);
        return null;
    }
}