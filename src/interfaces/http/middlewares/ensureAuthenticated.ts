import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware para garantir que o usuário esteja autenticado.
 * Verifica a presença e a validade de um token JWT no cabeçalho da requisição.
 * 
 * @param req - Objeto da requisição HTTP.
 * @param res - Objeto da resposta HTTP.
 * @param next - Função para passar o controle para o próximo middleware.
 * 
 * @throws Retorna um erro 401 caso o token não seja fornecido ou seja inválido.
 */
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização está presente
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Extrai o token do cabeçalho
  const [, token] = authHeader.split(' ');

  try {
    // Verifica a validade do token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Adiciona as informações do token ao objeto da requisição
    req.user = decoded; // Você pode tipar melhor depois, se necessário
    next();
  } catch (error) {
    // Retorna erro caso o token seja inválido
    return res.status(401).json({ message: 'Token inválido' });
  }
}