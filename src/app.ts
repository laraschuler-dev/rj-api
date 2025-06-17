import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from './swagger'; // Certifique-se de que está importando corretamente
import authRoutes from './interfaces/http/routes/authRoutes';
import postRoutes from './interfaces/http/routes/postRoutes';
import contactRoutes from './interfaces/http/routes/contactRoutes';

/**
 * Arquivo principal de configuração da aplicação.
 * Configura middlewares, documentação Swagger e rotas.
 */
const app = express();

// Middlewares
const allowedOrigins = [
  'https://redefinindojornadas.infocimol.com.br',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet()); // Adiciona cabeçalhos de segurança HTTP
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Configurar Swagger
setupSwagger(app); 

// Rotas
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/contact', contactRoutes);

export { app };