import { ModifiedRequest } from '../types';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import userModel from '../models/userModel';
import { BadRequestError } from '../errors';

const dataDenined = {
  success: false,
  message: 'Access Denied: You are not authenticated to use the app',
  data: null,
};

const dataInvalid = {
  success: false,
  message: 'Invalid Token',
  data: null,
};

const noSecret = {
  success: false,
  message: 'No secret',
  data: null,
};

const jwt_secret = process.env.JWT_SECRET;

const auth = async (
  req: ModifiedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(StatusCodes.BAD_REQUEST).json(dataDenined);
  } else {
    try {
      const token = authHeader.split(' ')[1];

      //VERIFY TOKEN
      if (!jwt_secret) {
        return res.status(StatusCodes.BAD_REQUEST).json(noSecret);
      }
      const payload: any = jwt.verify(token, jwt_secret);

      const user = await userModel.findOne({ email: payload.email });

      req.user = {
        email: payload.email,
        userId: payload.id,
      };
      next();
    } catch (error) {
      res.status(401).send(dataInvalid);
    }
  }
};

export default auth;
