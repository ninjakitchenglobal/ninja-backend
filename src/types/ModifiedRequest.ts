import { Request } from 'express';
import { IUser } from '../interfaces';

interface ModifiedRequest extends Request {
  user?: IUser;
}

export default ModifiedRequest
