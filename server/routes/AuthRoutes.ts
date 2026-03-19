import express from 'express';
import { loginUser, logoutUser, registerUser, verifyUser } from '../controllers/AuthControllers.js';
import protect from '../middlewares/auth.js';
import { authLimiter } from '../middlewares/rateLimit.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', authLimiter, registerUser);
AuthRouter.post('/login', authLimiter, loginUser);
AuthRouter.get('/verify', protect, verifyUser);
AuthRouter.post('/logout', protect, logoutUser);

export default AuthRouter;
