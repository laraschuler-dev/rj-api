import { Router } from 'express';

const router = Router();

// Rota para listar usuários
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Lista de usuários' });
});

// Rota para criar um usuário
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Usuário criado com sucesso' });
});

export default router;