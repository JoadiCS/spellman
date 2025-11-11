import { query } from '../config/database.js';

const TABLE = 'site_content';

const baseSelect = `id, section, key, title, subtitle, description, image_url AS "imageUrl",
  icon, color, display_order AS "displayOrder", hook_words AS "hookWords",
  background_video_url AS "backgroundVideoUrl", video_poster_url AS "videoPosterUrl",
  button_text AS "buttonText", secondary_button_text AS "secondaryButtonText",
  stat_title AS "statTitle", stat_description AS "statDescription",
  project_title AS "projectTitle", project_description AS "projectDescription",
  project_image_url AS "projectImageUrl",
  goal_title AS "goalTitle", short_description AS "shortDescription",
  long_description AS "longDescription", org_name AS "orgName", address, email,
  phone, newsletter_button_text AS "newsletterButtonText",
  created_at AS "createdAt", updated_at AS "updatedAt"`;

export const getAllContent = async () => {
  const { rows } = await query(`SELECT ${baseSelect} FROM ${TABLE} ORDER BY section, display_order NULLS LAST`);
  return rows;
};

export const getContentBySection = async (section) => {
  const { rows } = await query(
    `SELECT ${baseSelect} FROM ${TABLE} WHERE section = $1 ORDER BY display_order NULLS LAST`,
    [section]
  );
  return rows;
};

export const createContent = async (data) => {
  const normalized = normalizePayload(data);
  const keys = Object.keys(normalized);
  if (!keys.length) return null;
  const columns = keys.join(', ');
  const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');
  const values = Object.values(normalized);

  const { rows } = await query(
    `INSERT INTO ${TABLE} (${columns}) VALUES (${placeholders}) RETURNING ${baseSelect}`,
    values
  );
  return rows[0];
};

export const getContentById = async (id) => {
  const { rows } = await query(
    `SELECT ${baseSelect} FROM ${TABLE} WHERE id = $1`,
    [id]
  );
  return rows[0];
};

export const updateContent = async (id, data) => {
  const normalized = normalizePayload(data);
  const keys = Object.keys(normalized);
  if (!keys.length) return getContentById(id);
  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
  const values = Object.values(normalized);
  values.push(id);
  const { rows } = await query(
    `UPDATE ${TABLE} SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING ${baseSelect}`,
    values
  );
  return rows[0];
};

export const deleteContent = async (id) => {
  await query(`DELETE FROM ${TABLE} WHERE id = $1`, [id]);
};

const camelToSnake = (value) => value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const normalizePayload = (data) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    if (value === undefined) return acc;
    const column = columnMap[key] || key;
    acc[column] = value;
    return acc;
  }, {});

const columnMap = {
  imageUrl: 'image_url',
  icon: 'icon',
  color: 'color',
  displayOrder: 'display_order',
  hookWords: 'hook_words',
  backgroundVideoUrl: 'background_video_url',
  videoPosterUrl: 'video_poster_url',
  buttonText: 'button_text',
  secondaryButtonText: 'secondary_button_text',
  statTitle: 'stat_title',
  statDescription: 'stat_description',
  projectTitle: 'project_title',
  projectDescription: 'project_description',
  projectImageUrl: 'project_image_url',
  goalTitle: 'goal_title',
  shortDescription: 'short_description',
  longDescription: 'long_description',
  orgName: 'org_name',
  newsletterButtonText: 'newsletter_button_text',
  createdBy: 'created_by',
  image_url: 'image_url',
  background_video_url: 'background_video_url',
  video_poster_url: 'video_poster_url',
  button_text: 'button_text',
  secondary_button_text: 'secondary_button_text',
  stat_title: 'stat_title',
  stat_description: 'stat_description',
  project_title: 'project_title',
  project_description: 'project_description',
  project_image_url: 'project_image_url',
  goal_title: 'goal_title',
  short_description: 'short_description',
  long_description: 'long_description',
  org_name: 'org_name',
  newsletter_button_text: 'newsletter_button_text',
  display_order: 'display_order',
  hook_words: 'hook_words'
};
