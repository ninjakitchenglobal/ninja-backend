import mongoose from 'mongoose';
import { jwt_secret } from '../config/env_config';
import jwt from 'jsonwebtoken';

export const generateToken = (userDetails: {
  email: string;
  id: mongoose.Types.ObjectId;
}) => {
  if (!jwt_secret) {
    console.log(jwt_secret);
    throw new Error('Server Error: Absent JWT');
  }

  const token = jwt.sign(userDetails, jwt_secret, { expiresIn: '15d' });

  return token;
};

export const verifyToken = (token: string) => {
  if (!jwt_secret) {
    throw new Error('Server Error: Absent JWT');
  }

  const payload = jwt.verify(token, jwt_secret);

  return payload;
};
