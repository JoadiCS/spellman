import { query } from '../config/database.js';

const ensureRow = async () => {
  const { rows } = await query('SELECT * FROM security_settings LIMIT 1');
  if (!rows.length) {
    const { rows: inserted } = await query(
      `INSERT INTO security_settings (mfa_enabled, alerts_enabled, auto_logout)
       VALUES (TRUE, TRUE, FALSE)
       RETURNING *`
    );
    return inserted[0];
  }
  return rows[0];
};

export const getSecuritySettings = async () => {
  const row = await ensureRow();
  return {
    id: row.id,
    mfaEnabled: row.mfa_enabled,
    alertsEnabled: row.alerts_enabled,
    autoLogout: row.auto_logout,
    updatedAt: row.updated_at
  };
};

export const updateSecuritySettings = async ({ mfaEnabled, alertsEnabled, autoLogout }) => {
  const existing = await ensureRow();
  const { rows } = await query(
    `UPDATE security_settings
     SET mfa_enabled = COALESCE($1, mfa_enabled),
         alerts_enabled = COALESCE($2, alerts_enabled),
         auto_logout = COALESCE($3, auto_logout),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING id, mfa_enabled AS "mfaEnabled", alerts_enabled AS "alertsEnabled", auto_logout AS "autoLogout", updated_at AS "updatedAt"`,
    [mfaEnabled, alertsEnabled, autoLogout, existing.id]
  );
  return rows[0];
};
