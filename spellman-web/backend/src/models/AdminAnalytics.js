import { query } from '../config/database.js';

export const getOverviewStats = async () => {
  const totalEntries = await query('SELECT COUNT(*)::int AS count FROM site_content');
  const updated = await query('SELECT MAX(updated_at) AS "lastUpdated" FROM site_content');
  const sections = await query(
    'SELECT section, COUNT(*)::int AS count FROM site_content GROUP BY section ORDER BY section'
  );

  return {
    totalEntries: totalEntries.rows[0]?.count || 0,
    lastUpdated: updated.rows[0]?.lastUpdated,
    sections: sections.rows
  };
};

export const getAnalyticsBreakdown = async () => {
  const { rows } = await query(
    `SELECT section, COUNT(*)::int AS count
     FROM site_content
     GROUP BY section
     ORDER BY count DESC`
  );
  const total = rows.reduce((sum, row) => sum + row.count, 0) || 1;
  return rows.map((row) => ({
    section: row.section,
    count: row.count,
    percentage: Math.round((row.count / total) * 100)
  }));
};

export const getRecentLogs = async () => {
  const { rows } = await query(
    `SELECT id, section, title, updated_at AS "updatedAt", created_by AS "createdBy"
     FROM site_content
     ORDER BY updated_at DESC
     LIMIT 10`
  );
  return rows;
};
