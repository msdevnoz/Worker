import { Request, Response, NextFunction } from 'express';

export const employerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.body.role;
  if (userRole === 'employer') {
   next();
  } else {
    res.status(403).json({ error: 'Forbidden', msg: 'Access denied. You do not have the required role.' });
  }
};