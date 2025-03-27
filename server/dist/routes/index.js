import { Router } from 'express';
console.log('Attempting to load auth-routes...');
import authRouter from './auth-routes.js';
console.log('Auth routes loaded:', authRouter);
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js'; // Ensure correct export/import
const router = Router();
// Use the auth routes for login and register endpoints
router.use('/auth', authRouter);
// Attach the API routes with token authentication middleware
router.use('/api', authenticateToken, apiRoutes);
export default router;
//# sourceMappingURL=index.js.map