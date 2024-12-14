import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];
        next();
        // if (!token) {
        //     return res.status(401).json({ message: 'No token provided' });
        // }

        // try {
        //     const payload = this.jwtService.verify(token);
        //     req['user'] = payload; // Attach decoded token payload to the request
        //     next();
        // } catch (err) {
        //     return res.status(401).json({ message: 'Invalid token' });
        // }
    }
}