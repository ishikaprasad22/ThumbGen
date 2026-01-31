import express from 'express';
import protect from '../middlewares/auth.js';
import { deleteThumbnail, generateThumbnail } from '../controllers/ThumbnailController.js';

const ThumbnailRouter = express.Router();

ThumbnailRouter.post('/generate', protect, generateThumbnail);
ThumbnailRouter.delete('/delete/:id', protect, deleteThumbnail);

export default ThumbnailRouter;