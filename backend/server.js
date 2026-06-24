import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import teamRoutes from './routes/team.js';
import careerRoutes from './routes/careers.js';
import contactRoutes from './routes/contacts.js';
import testimonialRoutes from './routes/testimonials.js';
import statsRoutes from './routes/stats.js';

// Load environment variables
dotenv.config();

// ES module path resolver
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve uploads folder statically for resume viewing/downloading
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrialShopy API Documentation',
      version: '1.0.0',
      description: 'REST API documentation for the TrialShopy MERN stack application. Includes public pages feed and admin panel CRUD operations.',
      contact: {
        name: 'TrialShopy Technical Team',
        email: 'dev@trialshopy.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js', './routes/**/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats', statsRoutes);

// Root route redirects to Swagger documentation
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.'
  });
});

// Database connection & Server initialization
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 TrialShopy Backend running on http://localhost:${PORT}`);
    console.log(`📄 API Swagger documentation loaded at http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Database connection failed, server could not start.', err);
});
