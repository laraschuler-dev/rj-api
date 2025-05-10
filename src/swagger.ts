import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

// Definir as opções de configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Versão da especificação OpenAPI
    info: {
      title: 'API de Autenticação',
      version: '1.0.0',
      description: 'Documentação da API de autenticação',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL do seu servidor
      },
    ],
  },
  apis: ['./src/interfaces/http/routes/*.ts'], // Caminho para os arquivos de rota onde a documentação será extraída
};

// Gerar a especificação Swagger
const swaggerSpec = swaggerJSDoc(options);

// Configurar o Swagger UI
export function setupSwagger(app: express.Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}