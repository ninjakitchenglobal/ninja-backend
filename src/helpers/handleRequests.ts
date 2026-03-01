import { Response } from 'express';
import { ModifiedRequest } from '../types';
import { IParams, IServiceResponse } from '../interfaces';
import { StatusCodes } from 'http-status-codes';

const handleRequest = <T = any, R = any>(
  serviceFunction: (params: IParams<T>) => Promise<IServiceResponse<R>>,
) => {
  return async (req: ModifiedRequest, res: Response) => {
    try {
      //CONSIDILATE PARAMS
      const params: IParams<T> = {
        data: req.body,
        query: { ...req.query, ...req.params },
        user: req.user,
      };

      //RUN SERVICE FUNCTION
      const result = await serviceFunction(params);

      //GET RESULT AND SEND
      res.status(StatusCodes.OK).json(result);
    } catch (error: any) {
      const statusCode = error.statusCode || 400;

      res.status(statusCode).json({
        success: false,
        message: error.message || 'An error occured',
        data: null,
      });
    }
  };
};

export default handleRequest;
