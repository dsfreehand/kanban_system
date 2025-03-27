import { Router } from 'express';
import * as authRoutes from './auth-routes.js'; // Import the named exports
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Define the auth routes manually since we have named exports
router.post('/auth/login', authRoutes.login); // Attach the login route
// TODO: Add authentication to the API routes
router.use('/api', authenticateToken, apiRoutes);
export default router;
