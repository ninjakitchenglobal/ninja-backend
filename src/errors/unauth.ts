import CustomAPIError from './custom-error';
import { StatusCodes } from 'http-status-codes';

export default class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
