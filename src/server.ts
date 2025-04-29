// src/server.ts
import dotenv from 'dotenv';
//dotenv.config(); // Carregar variáveis de ambiente o mais cedo possível
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
