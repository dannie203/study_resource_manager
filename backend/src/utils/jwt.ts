import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const generateToken = (
  payload: object,
  expiresIn: string | number = '1h'
) => {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  return jwt.sign(payload, jwtSecret, options);
};
