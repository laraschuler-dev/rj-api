import { Router } from 'express';

const router = Router();

// Rota para listar doações
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Lista de doações' });
});

// Rota para criar uma doação
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Doação registrada com sucesso' });
});

export default router