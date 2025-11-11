import bcrypt from 'bcrypt';
import { query } from '../config/database.js';

const TABLE = 'users';

export const createUser = async ({ email, password, fullName, role = 'user' }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const { rows } = await query(
    `INSERT INTO ${TABLE} (email, password_hash, full_name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, full_name AS "fullName", role, created_at AS "createdAt"`,
    [email, passwordHash, fullName, role]
  );
  return rows[0];
};

export const findByEmail = async (email) => {
  const { rows } = await query(
    `SELECT id, email, password_hash AS "passwordHash", full_name AS "fullName", role
     FROM ${TABLE} WHERE email = $1`,
    [email]
  );
  return rows[0];
};

export const findById = async (id) => {
  const { rows } = await query(
    `SELECT id, email, full_name AS "fullName", role, created_at AS "createdAt"
     FROM ${TABLE} WHERE id = $1`,
    [id]
  );
  return rows[0];
};

export const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

export const listUsers = async () => {
  const { rows } = await query(
    `SELECT id, email, full_name AS "fullName", role, updated_at AS "updatedAt", created_at AS "createdAt"
     FROM ${TABLE}
     ORDER BY updated_at DESC NULLS LAST`
  );
  return rows;
};
