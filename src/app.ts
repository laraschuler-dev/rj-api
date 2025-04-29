// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from './swagger'; 
import authRoutes from './interfaces/http/routes/authRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Configurar Swagger
setupSwagger(app);
// Rotas
app.use('/auth', authRoutes);

export { app };
