import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

import { app } from './app';

/**
 * Arquivo principal para inicializar o servidor.
 * Configura a porta e inicia o servidor Express.
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});