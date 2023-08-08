import express from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestWithUser extends express.Request {
  user_token: string | JwtPayload
}

export interface User {
  email: string;
  authentication?: {
      isOTP?: boolean;
      password?: string;
      sessionToken?: string;
      token?: string;
  };
}

export interface ResponseJSON {
  status?: string,
  jwtToken?: string,
  sessionToken?: string,
  challenge?: number,
}

export interface ErrorResponse {
  code: string,
  message: string,
}