INSERT INTO users (email, password_hash, full_name, role)
VALUES ('admin@spellman.earth', '$2b$10$kfC3Sd8Zug.Pk0D/j6wLROvHfZM852RQ52HLqfOJyOJWmBG8iOHam', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;
