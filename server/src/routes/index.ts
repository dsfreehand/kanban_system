import { Router } from 'express';
import { loginHandler } from './auth-routes'; // Import the login handler from auth-routes
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Define the login route
router.post('/auth/login', loginHandler);

// Define the auth routes and attach the API routes with token authentication middleware
router.use('/api', authenticateToken, apiRoutes);

export default router;
