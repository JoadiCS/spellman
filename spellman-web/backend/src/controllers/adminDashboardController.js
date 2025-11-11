import { getOverviewStats, getAnalyticsBreakdown, getRecentLogs } from '../models/AdminAnalytics.js';
import { listUsers } from '../models/User.js';
import { listDomains, createDomain, updateDomain, deleteDomain } from '../models/Domain.js';
import { getSecuritySettings, updateSecuritySettings } from '../models/SecuritySettings.js';
import { getAdminSettings, updateAdminSettings } from '../models/AdminSettings.js';

export const overview = async (_req, res, next) => {
  try {
    const data = await getOverviewStats();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const analytics = async (_req, res, next) => {
  try {
    const data = await getAnalyticsBreakdown();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const users = async (_req, res, next) => {
  try {
    const data = await listUsers();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const logs = async (_req, res, next) => {
  try {
    const data = await getRecentLogs();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const domains = async (_req, res, next) => {
  try {
    const data = await listDomains();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createDomainEntry = async (req, res, next) => {
  try {
    const domain = await createDomain(req.body);
    res.status(201).json({ success: true, data: domain });
  } catch (error) {
    next(error);
  }
};

export const updateDomainEntry = async (req, res, next) => {
  try {
    const domain = await updateDomain(req.params.id, req.body);
    res.json({ success: true, data: domain });
  } catch (error) {
    next(error);
  }
};

export const deleteDomainEntry = async (req, res, next) => {
  try {
    await deleteDomain(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const security = async (_req, res, next) => {
  try {
    const data = await getSecuritySettings();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateSecurity = async (req, res, next) => {
  try {
    const data = await updateSecuritySettings(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const settings = async (_req, res, next) => {
  try {
    const data = await getAdminSettings();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const data = await updateAdminSettings(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
