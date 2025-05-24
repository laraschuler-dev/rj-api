import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware para garantir que o usuário esteja autenticado.
 * Verifica a presença e a validade de um token JWT no cabeçalho da requisição.
 * 
 * @param req - Objeto da requisição HTTP.
 * @param res - Objeto da resposta HTTP.
 * @param next - Função para passar o controle para o próximo middleware.
 */
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização está presente
  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    // Verifica a validade do token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    // Adiciona as informações do token ao objeto da requisição
    req.user = { id: decoded.id }; // pode tipar req.user com interface se quiser
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
}
