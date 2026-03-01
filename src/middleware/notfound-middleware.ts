import { Request, Response } from 'express';
const notFound = (req: Request, res: Response) => {
  res.status(404).json({ sucess: false, msg: 'This route does not exist' });
};

export default notFound;
