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
    openapi: '3.0.0',
    info: {
      title: 'API-RJ',
      version: '1.0.0',
      description: 'Documentação da API da Rede Social Solidária de Apoio a Pessoas em Situação de Rua "Redefinindo Jornadas"',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/interfaces/http/routes/*.ts'],
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
