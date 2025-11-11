# Spellman Platform

Spellman is a modern, animated environmental advocacy experience built with a custom CMS. The repo hosts the React/Tailwind frontend and the Express/PostgreSQL backend that powers dynamic content, media uploads, and an admin control center.

## Highlights
- Immersive home experience (hero video background, principles carousel, projects, goals, join/contact, responsive navigation, tailored footer).
- Full CMS admin panel with live sections (content CRUD, section summaries, per-section editor).
- Admin Ops console covering Overview, Analytics, Users, Logs, Domains, Security, and Settings, all backed by real database endpoints.
- Dockerized Postgres + schema migration: `users`, `site_content`, `domains`, `security_settings`, `admin_settings`.
- Authentication + role-based gating for admin routes (JWT).

## Repository Structure

```
spellman-web/
├── frontend/   # React 18 + Vite, Tailwind, React Query, Framer Motion
├── backend/    # Express API, PostgreSQL integration, Cloudinary uploads
├── docs/       # Architecture and planning notes
├── docker/     # Seed scripts for Postgres
├── schema.sql  # DB schema (users, site_content, domains, security, admin settings)
└── README.md
```

## Setup
1. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

2. **Environment**
   - Copy `backend/.env.example` → `backend/.env` and fill in Postgres, JWT, and Cloudinary values (PORT defaults to 5001 to avoid macOS Control Center).
   - Copy `frontend/.env.example` → `frontend/.env` and set `VITE_API_URL` (e.g., `http://localhost:5001/api`).

3. **Database**
   ```bash
   cd /Users/joadi/Desktop/Projects/spellman-web
   docker compose up -d db
   docker compose exec -T db psql -U spellman -d spellman < schema.sql
   ```
   This provisions `users`, `site_content`, `domains`, `security_settings`, `admin_settings`, and seeds baseline rows (admin user via `docker/init/seed_admin.sql`).

4. **Run dev servers**
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd ../frontend
   npm run dev
   ```

## Current Status
- ✅ Hero supports CMS-driven video backgrounds with `/home-bg.mp4` fallback.
- ✅ Navigation matches Spellman IA (Our Mission, Projects, Roadmap) with CTA matching Join section styling.
- ✅ Principles carousel displays CMS items without duplication when count < 5.
- ✅ Admin Dashboard includes: section summaries, todo list, live Ops panel (Overview/Analytics/Users/Logs/Domains/Security/Settings), content list with search, editor with dynamic fields.
- ✅ Admin Ops panel backed by `/api/admin/*` endpoints (no mock data).
- ✅ Domains, security controls, and admin settings persist to DB.
- ✅ Docker Compose seeds Postgres with schema + admin user.

## TODO / Next Steps
1. **Content authoring UX**
   - Autosave drafts / versioning in SectionEditor.
   - Bulk ordering tools for principles/projects/goals.
2. **Analytics/Logs**
   - Replace derived logs/analytics with true event tracking (via Base44 SDK or external analytics pipeline).
3. **Media Management**
   - Hook file uploader to actual storage backend (Cloudinary keys currently placeholders).
4. **Testing & CI**
   - Add Jest/Playwright suites for critical flows (home render, admin CRUD) and hook into CI.
5. **Deployment**
   - Prepare Vercel (frontend) + Railway/Fly (backend) configs, include env templates for production secrets.
6. **Accessibility & SEO**
   - Audit hero video (captions, pause controls), ensure semantic headings across sections, enrich metadata.

## Vision
Spellman’s platform blends narrative storytelling with actionable data. Visitors get an immersive home journey—from principles and impact stats to goals and join CTAs. Admins benefit from a holistic workspace: edit content, monitor principles/projects, track domains/security, and coordinate work with the built-in to-do list. Upcoming work focuses on tightening the CMS authoring experience, enriching analytics, and preparing for production deployment.
