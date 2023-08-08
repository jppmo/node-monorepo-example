import express from 'express'

import authentication from './authentication';
import welcome from './welcome';

const router = express.Router()

export default (): express.Router => {
  authentication(router);
  welcome(router);
  
  return router;
};