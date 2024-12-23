/* eslint-disable @typescript-eslint/no-namespace */
import { Decrypter } from '@/core/domain/protocols/cryptography/decrypter';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Authenticated;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly decrypter: Decrypter) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        // const user = await this.decrypter.decrypt(token);

        //req.user = user;
        req.user = {
          id: '88cf55a7-0c3d-4701-b2a1-8a5e0a425032',
          roles: {
            id: '88cf55a7-0c3d-4701-b2a1-8a5e0a425032',
            label: 'Mock Label',
            value: 'Mock Label'
          }
        }
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      throw new UnauthorizedException(`Invalid or missing token!`);
    }

    next();
  }
}
