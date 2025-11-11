import { query } from '../config/database.js';

const ensureSettings = async () => {
  const { rows } = await query('SELECT * FROM admin_settings LIMIT 1');
  if (!rows.length) {
    const { rows: inserted } = await query(
      `INSERT INTO admin_settings (org_name, support_email, notes)
       VALUES ('Spellman Impact Network', 'hello@spellman.earth', 'Coordinated rollout for Q3 goals.')
       RETURNING *`
    );
    return inserted[0];
  }
  return rows[0];
};

export const getAdminSettings = async () => {
  const row = await ensureSettings();
  return {
    id: row.id,
    orgName: row.org_name,
    supportEmail: row.support_email,
    notes: row.notes,
    updatedAt: row.updated_at
  };
};

export const updateAdminSettings = async ({ orgName, supportEmail, notes }) => {
  const existing = await ensureSettings();
  const { rows } = await query(
    `UPDATE admin_settings
     SET org_name = COALESCE($1, org_name),
         support_email = COALESCE($2, support_email),
         notes = COALESCE($3, notes),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING id, org_name AS "orgName", support_email AS "supportEmail", notes, updated_at AS "updatedAt"`,
    [orgName, supportEmail, notes, existing.id]
  );
  return rows[0];
};
