import { AppError } from '../utils/errorHandler.js';

export const requireAdmin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Admin access required', 403));
  }
  return next();
};
