// swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    failOnErrors: true,
    openapi: '3.0.0',
    info: {
      title: '你的 API 标题',
      version: '1.0.0',
      description: 'API 描述信息',
      contact: { name: '开发者', email: 'dev@example.com' },
    },
    servers: [        // 可选：API 服务器列表
        { url: 'http://localhost:3001', description: '测试服务器' },
    ],
    components: { 
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                },
            },
            UserInput: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                },
            },
        },
        securitySchemes: {   
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: '在 Authorization 头中携带 JWT，格式：Bearer <token>',
            },
            ApiKeyHeader: {
                type: 'apiKey',
                in: 'header',
                name: 'X-API-Key',
                description: '服务间调用使用的 API Key',
            },
            basicAuth: {
                type: 'http',
                scheme: 'basic',
                description: '用户名/密码，仅限 HTTPS 环境',
            },
        } 
    },
    // security: [{ bearerAuth: [] }],
        
    tags: [
      { name: 'users', description: '用户相关操作' }
    ],
  },
  apis: ['./swagger/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);