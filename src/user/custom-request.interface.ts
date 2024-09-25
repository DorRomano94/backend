import { Request } from 'express';
import { JwtPayload } from '../auth/jwt-payload.interface';

export interface CustomRequest extends Request {
  user: JwtPayload;
}
