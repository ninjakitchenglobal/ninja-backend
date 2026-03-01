import { Schema, model } from 'mongoose';
import { IUserDetails } from '../interfaces';

const UserSchema = new Schema<IUserDetails>({
  email: {
    type: String,
    require: [true, 'Please provide a user email'],
    unique: [true, 'A user with this email already exists'],
  },

  isAdmin: {
    type: Boolean
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userModel = model('user', UserSchema);

export default userModel;
