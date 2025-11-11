# Ecovision Website

Spellman / Ecovision is a modern environmental advocacy experience with a headless-style CMS. The repo hosts a Vite + React frontend and an Express + PostgreSQL backend.

## Repository Structure

```
ecovision-website/
├── frontend/   # React app (Tailwind, Framer Motion, React Query)
├── backend/    # Express API (JWT auth, PostgreSQL, Cloudinary uploads)
├── docs/       # Architecture and planning documents
└── schema.sql  # Database schema for users + site_content
```

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- pnpm/npm

## Backend Setup
```bash
cd backend
cp .env.example .env                     # fill in DB, JWT, Cloudinary secrets
npm install
psql -d your_database -f ../schema.sql   # or use `createdb` + `psql`
npm run dev                             # starts on http://localhost:5000
```

### API Routes
- `POST /api/auth/login` — issue JWT token
- `GET /api/auth/me` — current user profile
- `GET /api/content` — all sections (public)
- `POST /api/content` — admin create content
- `POST /api/upload/image` — admin media upload

## Frontend Setup
```bash
cd frontend
cp .env.example .env.local # optional (create file) with VITE_API_URL
npm install
npm run dev                # opens http://localhost:5173
```

The frontend expects `VITE_API_URL` (defaults to `http://localhost:5000/api`).

## Key Features
- Animated hero with video background + rotating hook words
- Infinite-scrolling impact stats carousel
- Projects grid with hover lift + gradients
- Goals bento grid with expandable cards
- Join/contact CTA with form validation
- Full CMS dashboard with role-gated access, CRUD, uploads, and toast notifications
- React Query for server state + axios service layer
- JWT-based authentication and admin-only write operations

## Next Steps
1. Provision PostgreSQL and run `schema.sql`.
2. Wire Base44 SDK if required for auth/storage.
3. Deploy frontend (Vercel/Netlify) + backend (Railway/Fly/DigitalOcean) with Cloudinary + managed Postgres.
4. Add production-ready logging, rate limiting, and secrets management.
