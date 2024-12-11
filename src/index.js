const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); // Import cors middleware
const userRouter = require('./routers/users');
const productRouter = require('./routers/products');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins. Change '*' to specific domains if needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Allowed headers
}));

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for Users and Products',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Unique identifier for the user' },
              name: { type: 'string', description: 'Name of the user' },
              email: { type: 'string', description: 'Email address of the user' },
            },
          },
          Product: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Unique identifier for the product' },
              name: { type: 'string', description: 'Name of the product' },
              price: { type: 'number', description: 'Price of the product' },
              description: { type: 'string', description: 'Product description' },
              stock: { type: 'integer', description: 'Available stock' },
            },
          },
        },
      },
      paths: {
        '/users': {
          get: {
            summary: 'Get all users',
            description: 'Retrieve a list of all users',
            responses: {
              200: {
                description: 'List of users retrieved successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: 'Create a new user',
            description: 'Add a new user to the database',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'User created successfully',
              },
            },
          },
        },
        '/products': {
          get: {
            summary: 'Get all products',
            description: 'Retrieve a list of all products',
            responses: {
              200: {
                description: 'List of products retrieved successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Product',
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: 'Create a new product',
            description: 'Add a new product to the inventory',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Product created successfully',
              },
            },
          },
        },
      },
    },
    apis: ['./routers/users.js', './routers/products.js', './index.js'],
  };
  
const openapiSpecification = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/**
 * @swagger
 * /:
 *   get:
 *     summary: This is api
 *     description: this is api
 *     responses:
 *       200:
 *         description: to test GET method
 */
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log('Server is up on port: ' + port);
});
