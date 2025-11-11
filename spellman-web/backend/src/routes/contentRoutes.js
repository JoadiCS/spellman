import { Router } from 'express';
import {
  listContent,
  getContent,
  createContentItem,
  updateContentItem,
  deleteContentItem
} from '../controllers/contentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/', listContent);
router.get('/:section', getContent);
router.post('/', authenticate, requireAdmin, createContentItem);
router.put('/:id', authenticate, requireAdmin, updateContentItem);
router.delete('/:id', authenticate, requireAdmin, deleteContentItem);

export default router;
