import jwt, { JwtPayload } from 'jsonwebtoken'
import express from 'express';
import { RequestWithUser } from '../helpers/interfaces';

export const verifyToken = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Token is required");
  }

  try {
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user_token = decodedToken;

  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}