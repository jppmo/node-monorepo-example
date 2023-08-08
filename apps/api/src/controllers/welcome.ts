import express from 'express';
import { RequestWithUser } from '../helpers/interfaces';

export const welcome = async (req: RequestWithUser, res: express.Response) => {
  try {
    
    // we have access to the token in the request, so we can get the authenticated user

    return res.status(200).json(req.user_token);

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}