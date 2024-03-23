import { Request, Response, NextFunction } from 'express';

export const jobMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const role  = req.body.role; 

  if (role === 'jobseeker') {
    next();
  } else {
    res.status(403).json({ error: true, message: 'Access denied for this role' ,data:null});
  }
};
