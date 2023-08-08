import express from 'express';

import { login, setPassword, validateEmail } from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/auth/validateEmail', validateEmail);
  router.post('/auth/setPassword', setPassword);
  router.post('/auth/login', login);
};