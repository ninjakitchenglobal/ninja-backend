import dotenv from 'dotenv';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export { jwt_secret };
