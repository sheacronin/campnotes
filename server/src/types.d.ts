import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface ResponseError extends Error {
  status?: number;
}

export interface UserAuthInfoRequest extends Request {
  user: User;
}
