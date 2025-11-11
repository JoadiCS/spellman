import { query } from '../config/database.js';

export const listDomains = async () => {
  const { rows } = await query('SELECT id, domain, status, ssl_status AS "sslStatus", updated_at AS "updatedAt" FROM domains ORDER BY updated_at DESC');
  return rows;
};

export const createDomain = async ({ domain, status, sslStatus }) => {
  const { rows } = await query(
    `INSERT INTO domains (domain, status, ssl_status)
     VALUES ($1, $2, $3)
     RETURNING id, domain, status, ssl_status AS "sslStatus", updated_at AS "updatedAt"`,
    [domain, status, sslStatus]
  );
  return rows[0];
};

export const updateDomain = async (id, { status, sslStatus }) => {
  const { rows } = await query(
    `UPDATE domains
     SET status = COALESCE($1, status),
         ssl_status = COALESCE($2, ssl_status),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, domain, status, ssl_status AS "sslStatus", updated_at AS "updatedAt"`,
    [status, sslStatus, id]
  );
  return rows[0];
};

export const deleteDomain = async (id) => {
  await query('DELETE FROM domains WHERE id = $1', [id]);
};
