import express from 'express';

import { welcome } from '../controllers/welcome';
import { verifyToken } from '../middlewares/auth';

export default (router: express.Router) => {
  router.get('/welcome', verifyToken, welcome);
}