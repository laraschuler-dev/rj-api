import { Router } from 'express';
import userRoutes from './userRoutes';
import eventRoutes from './eventRoutes';
import donationRoutes from './donationRoutes';

const router = Router();

// Configuração das rotas
router.use('/users', userRoutes);       // Rotas relacionadas a usuários
router.use('/events', eventRoutes);     // Rotas relacionadas a eventos
router.use('/donations', donationRoutes); // Rotas relacionadas a doações

// Rota de health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

export default router;