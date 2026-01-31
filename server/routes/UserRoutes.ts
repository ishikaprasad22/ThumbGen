import express from 'express';
import protect from '../middlewares/auth.js';
import { getThumbnailbyId, getUsersThumbnails } from '../controllers/UserContoller.js';

const UserRouter = express.Router();

UserRouter.get('/thumbnails',protect, getUsersThumbnails);
UserRouter.get('/thumbnail/:id',protect, getThumbnailbyId);

export default UserRouter;