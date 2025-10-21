import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';

/**
 * Middleware para garantir que o usuário esteja autenticado.
 * Verifica a presença e a validade de um token JWT no cabeçalho da requisição.
 *
 * @param req - Objeto da requisição HTTP.
 * @param res - Objeto da resposta HTTP.
 * @param next - Função para passar o controle para o próximo middleware.
 */
export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização está presente
  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    // Verifica a validade do token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    // VERIFICAÇÃO ADICIONADA: Checar se o usuário não está excluído
    const userRepository = new UserRepositoryPrisma();
    const user = await userRepository.findByIdUser(decoded.id);

    if (!user) {
      res.status(401).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Verifica se a conta está excluída
    const isDeleted = await userRepository.isUserDeleted(decoded.id);
    if (isDeleted) {
      res
        .status(401)
        .json({
          message:
            'Esta conta foi excluída. Entre em contato com o suporte para mais informações.',
        });
      return;
    }

    // Adiciona as informações do token ao objeto da requisição
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
}
