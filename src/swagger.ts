import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

/**
 * Configuração do Swagger para documentação da API.
 * Utiliza o Swagger JSDoc para gerar a especificação OpenAPI e o Swagger UI para exibir a documentação.
 */

// Definir as opções de configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Versão da especificação OpenAPI
    info: {
      title: 'API de Autenticação', // Título da API
      version: '1.0.0', // Versão da API
      description: 'Documentação da API de autenticação', // Descrição da API
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL do servidor
      },
    ],
  },
  apis: ['./src/interfaces/http/routes/*.ts'], // Caminho para os arquivos de rota onde a documentação será extraída
};

// Gerar a especificação Swagger
const swaggerSpec = swaggerJSDoc(options);

/**
 * Configura o Swagger UI na aplicação Express.
 * 
 * @param app - Instância da aplicação Express.
 */
export function setupSwagger(app: express.Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}