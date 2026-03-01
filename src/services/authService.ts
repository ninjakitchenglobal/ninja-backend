//IMPORTING TYPES AND INTERFACES
import { ILogin, IParams, IRegister } from '../interfaces';

//IMPORTING MODELS
import userModel from '../models/userModel';

//IMPORTING ERRORS
import { BadRequestError } from '../errors';

//IMPORTING DEPS
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt_util';

export const registerService = async (params: IParams<IRegister>) => {
  const { email, firstName, lastName, password } = params.data;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('This user already exists');
  }

  //HASHING THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    isAdmin: false,
  });

  //CREATING JWT TOKEN
  const token = generateToken({ email: newUser.email, id: newUser._id });

  return {
    success: true,
    message: 'Registration successful!',
    data: {
      userId: newUser._id,
      token,
    },
  };
};

export const loginService = async (params: IParams<ILogin>) => {
  const { email, password } = params.data;

  //FINDING THE USER
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new BadRequestError('The requested user does not exist');
  }

  //CHECKING PASSWORD
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError('You have provided incorrect user details!');
  }

  const token = generateToken({ email: user.email, id: user._id });

  return {
    success: true,
    message: 'Loginn successful',
    data: {
      token,
      userId: user._id,
    },
  };
};

export const getUserService = async (params: IParams) => {
  const { userId } = params.query;

  const user = await userModel.findOne({ _id: userId }).select('-password');

  if (!user) {
    throw new BadRequestError('The requested user does not exist');
  }

  return {
    success: true,
    message: 'User found',
    data: user,
  };
};
