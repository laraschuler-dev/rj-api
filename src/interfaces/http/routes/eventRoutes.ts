import { Router } from 'express';

const router = Router();

// Rota para listar eventos
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Lista de eventos' });
});

// Rota para criar um evento
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Evento criado com sucesso' });
});

export default router;