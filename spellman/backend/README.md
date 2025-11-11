# Ecovision Backend

Express API that powers the Spellman / Ecovision content management system. It exposes authentication, content CRUD, and media upload endpoints backed by PostgreSQL and Cloudinary.

## Scripts

```bash
npm install         # install dependencies
npm run dev         # start with nodemon
npm start           # production start
```

## Environment

Copy `.env.example` to `.env` and fill in the PostgreSQL, JWT, and Cloudinary credentials.

## Database

Run the SQL schema found in `../schema.sql` (see root README) to provision the `users` and `site_content` tables.

## API Overview

- `POST /api/auth/login` – authenticate and receive JWT
- `GET /api/auth/me` – fetch current user
- `GET /api/content` – list all content (public)
- `POST /api/content` – admin-only create
- `POST /api/upload/image` – admin-only Cloudinary upload

See `src/routes` for the full set of endpoints.
