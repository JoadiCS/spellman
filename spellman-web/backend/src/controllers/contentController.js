import {
  getAllContent,
  getContentBySection,
  createContent,
  updateContent,
  deleteContent,
  getContentById
} from '../models/SiteContent.js';
import { AppError } from '../utils/errorHandler.js';

export const listContent = async (req, res, next) => {
  try {
    const { section } = req.query;
    const data = section ? await getContentBySection(section) : await getAllContent();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getContent = async (req, res, next) => {
  try {
    const data = await getContentBySection(req.params.section);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createContentItem = async (req, res, next) => {
  try {
    const payload = { ...req.body, createdBy: req.user?.id };
    if (!payload.section) {
      throw new AppError('Section is required', 400);
    }
    const content = await createContent(payload);
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const updateContentItem = async (req, res, next) => {
  try {
    const existing = await getContentById(req.params.id);
    if (!existing) {
      throw new AppError('Content not found', 404);
    }
    const updated = await updateContent(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteContentItem = async (req, res, next) => {
  try {
    const existing = await getContentById(req.params.id);
    if (!existing) {
      throw new AppError('Content not found', 404);
    }
    await deleteContent(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
