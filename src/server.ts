import express, { Request, Response } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import routes from './routes'; // Importa o arquivo principal de rotas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient(); // Instância do Prisma Client

app.use(cors());
app.use(helmet());
app.use(express.json());

// Usa as rotas definidas no arquivo src/routes/index.ts
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});