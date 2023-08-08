import express from 'express';
import { createUser, getUserByEmail } from '../db/models/user';
import { hashPass, random, validatePassword} from '../helpers';
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { ErrorResponse, ResponseJSON, User } from '../helpers/interfaces';
import { ACTION } from '../helpers/enums';


export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.password +authentication.token +authentication.isOTP');

    if(!user) {
      return res.sendStatus(400);
    }

    const expectedPass = hashPass(password);

    if(expectedPass !== user.authentication.password) {
      
      const resJson: ErrorResponse = {
        code: "403",
        message: "wrong password",
      }

      return res.status(403).json(resJson);
    }
    // password OK

    const token = jwt.sign(
      { user_id: user._id, email},
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    if (user.authentication.isOTP) {
      console.log(user.authentication.password); // key point
      user.authentication.password = "";
      user.authentication.isOTP = false;
      user.authentication.token = "";
    }
    else {
      user.authentication.token = token;
    }

    await user.save();
    
    const resJson: ResponseJSON = {
      status: 'OK',
      jwtToken: token,
    }

    return res.status(200).json(resJson);
  } catch (error) {
    return res.sendStatus(400);    
  }
}

export const setPassword = async (req: express.Request, res: express.Response) => {

  try {
    const { email, password, isOTP }: {
      email: string;
      password: string;
      isOTP: boolean;
    } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }
    
    const user = await getUserByEmail(email);

    if(!user) {
      return res.sendStatus(400);
    }

    if (isOTP) {
      if (!validatePassword(password)) {
        const resJson: ErrorResponse = {
          code: "400",
          message: "password must be exactly 6 digits",
        }
  
        return res.status(403).json(resJson)
      }
      console.log(user.authentication.password); // key point
    }

    const passHash = hashPass(password);

    user.authentication.password = passHash;
    user.authentication.isOTP = isOTP;


    const token = jwt.sign(
      { user_id: user._id, email},
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    user.authentication.token = token;

    await user.save();
    
    const resJson: ResponseJSON = {
      status: 'OK',
      jwtToken: token,
    }
    
    return res.status(200).json(resJson)
  } catch (error) {
    return res.sendStatus(400);    
  }

}

export const validateEmail = async (req: express.Request, res: express.Response) => {
  const sessionToken = random();
  try {
    const { email } = req.body;
    const existingUser = await getUserByEmail(email).select('+authentication.password +authentication.token');

    if (!existingUser) {
      const user: User = {
        email,
        authentication: {
          password: "",
          sessionToken
        }
      }

      await createUser(user);

      const resJson: ResponseJSON = {
        sessionToken,
        challenge: ACTION.NewPasswordPlease
      }
      
      return res.status(200).json(resJson).end();
    }

    if (existingUser.authentication.token) {
      // if verify fails we catch the expired error below
      const verify = jwt.verify(existingUser.authentication.token, process.env.JWT_SECRET_KEY);
    }

    if(!existingUser.authentication.password) {
      const resJson: ResponseJSON = {
        sessionToken,
        challenge: ACTION.NewPasswordPlease,
      }
      return res.status(200).json(resJson).end();
    }

    const resJson: ResponseJSON = {
      sessionToken,
      challenge: ACTION.YourPasswordPlease,
    }

    return res.status(200).json(resJson).end();
  } catch (error) {
    if(error instanceof JsonWebTokenError) {
      console.log("token has expired");
      const resJson: ResponseJSON = {
        sessionToken: sessionToken,
        challenge: ACTION.NewOTPPlease
      }
      return res.status(401).json(resJson).end();
    }
    return res.sendStatus(400);
  }
}