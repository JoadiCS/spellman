import { Router } from 'express';
import {
  overview,
  analytics,
  users,
  logs,
  domains,
  createDomainEntry,
  updateDomainEntry,
  deleteDomainEntry,
  security,
  updateSecurity,
  settings,
  updateSettings
} from '../controllers/adminDashboardController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

router.use(authenticate, requireAdmin);

router.get('/overview', overview);
router.get('/analytics', analytics);
router.get('/users', users);
router.get('/logs', logs);

router
  .route('/domains')
  .get(domains)
  .post(createDomainEntry);

router
  .route('/domains/:id')
  .put(updateDomainEntry)
  .delete(deleteDomainEntry);

router.get('/security', security);
router.put('/security', updateSecurity);

router.get('/settings', settings);
router.put('/settings', updateSettings);

export default router;
