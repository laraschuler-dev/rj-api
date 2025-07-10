import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from './swagger'; // Certifique-se de que está importando corretamente
import authRoutes from './interfaces/http/routes/authRoutes';
import postRoutes from './interfaces/http/routes/postRoutes';
import contactRoutes from './interfaces/http/routes/contactRoutes';
import userProfileRoutes from './interfaces/http/routes/userProfileRoutes';
import path from 'path';

/**
 * Arquivo principal de configuração da aplicação.
 * Configura middlewares, documentação Swagger e rotas.
 */
const app = express();

// Middlewares
const allowedOrigins = [
  'https://redefinindojornadas.infocimol.com.br',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet()); // Adiciona cabeçalhos de segurança HTTP
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// 🔧 Middleware para arquivos estáticos com headers completos
app.use('/uploads', (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin || '')) {
    res.setHeader('Access-Control-Allow-Origin', origin!); // resposta dinâmica
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Configurar Swagger
setupSwagger(app); 

// Rotas
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/contact', contactRoutes);
app.use('/profile', userProfileRoutes);

export { app };