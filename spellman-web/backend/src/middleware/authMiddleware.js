import { verifyToken } from '../config/jwt.js';
import { AppError } from '../utils/errorHandler.js';

export const authenticate = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return next(new AppError('Authentication required', 401));
  }
  const [, token] = header.split(' ');
  if (!token) {
    return next(new AppError('Authentication required', 401));
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return next(new AppError('Invalid token', 401));
  }
};
