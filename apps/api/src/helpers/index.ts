import crypto from 'crypto';

const validatePasswordRegex = /^\d{6}$/;

export const validatePassword = (password: string) => {
  return validatePasswordRegex.test(password);
}

export const random = () => crypto.randomBytes(128).toString('base64');

export const hashPass = (password: string) => {
  return crypto.createHmac('sha256', password).update(process.env.USER_PASSWORD_SECRET).digest('hex');
};