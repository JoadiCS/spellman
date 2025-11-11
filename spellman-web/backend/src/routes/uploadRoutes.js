import { Router } from 'express';
import { uploadMedia } from '../controllers/uploadController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.post('/image', authenticate, requireAdmin, upload.single('file'), uploadMedia);
router.post('/video', authenticate, requireAdmin, upload.single('file'), uploadMedia);

export default router;
