// src/interfaces/http/middlewares/ensureAuthenticated.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Você pode tipar melhor depois
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
