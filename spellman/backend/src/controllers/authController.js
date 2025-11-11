import { createUser, findByEmail, findById, verifyPassword } from '../models/User.js';
import { signToken } from '../config/jwt.js';
import { AppError } from '../utils/errorHandler.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, role } = req.body;
    if (!email || !password || !fullName) {
      throw new AppError('Email, password, and full name are required', 400);
    }
    const existing = await findByEmail(email);
    if (existing) {
      throw new AppError('User already exists', 409);
    }
    const user = await createUser({ email, password, fullName, role });
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }
    const user = await findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401);
    }
    const token = signToken({ id: user.id, role: user.role });
    res.json({ success: true, token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req, res) => {
  res.json({ success: true, message: 'Logged out' });
};
