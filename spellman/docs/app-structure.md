# Spellman App Structure Outline

Authoritative blueprint for the Spellman / Ecovision build. Reference before implementing new features.

## Data Model – `entities/SiteContent`
- `section`: `hero | impact | projects | goals | join | footer`
- `key`: unique identifier for singleton entries
- `title`, `subtitle`, `description`
- `imageUrl`, `backgroundVideoUrl`, `videoPosterUrl`
- `hookWords`, `buttonText`, `secondaryButtonText`
- `statTitle`, `statDescription`
- `projectTitle`, `projectDescription`, `projectImageUrl`
- `goalTitle`, `shortDescription`, `longDescription`, `color`
- `icon`, `order`
- Footer: `orgName`, `address`, `email`, `phone`, `newsletterButtonText`
- Security: admins are the only writers

## Pages
1. `pages/Home.jsx` – public landing page composed of six animated sections, shows Admin link when role allows.
2. `pages/Admin.jsx` – role-gated CMS dashboard with section switcher, content list, and `SectionEditor` integration.
3. `pages/Login.jsx` – authentication entry.
4. `pages/NotFound.jsx` – fallback route.

## Components
### Home (`components/home`)
- `NavigationBar`, `HeroSection`, `ImpactSection`, `ProjectsSection`, `GoalsSection`, `JoinSection`, `FooterSection` as described in the spec.

### Admin (`components/admin`)
- `ProtectedRoute`, `ContentList`, `FileUploader`, `SectionEditor`.

## Design System
- **Colors**: Greens (300–900) with blue/purple/amber/cyan/pink highlights, warm neutrals.
- **Typography**: Hero `5xl–7xl`, headings `4xl–2xl`, body `base–xl`.
- **Patterns**: full-bleed hero, fixed transparent nav, bento goals grid, infinite carousel, responsive grids.
- **Animations**: Framer Motion for fade/slide, CSS for infinite carousel + hover lifts.
- **UI toolkit**: simplified shadcn-like primitives (Button, Input, etc.) plus Lucide icons (hookup ready).

## Authentication & Flows
- JWT-based auth (Base44-ready) with role check for `/admin` and `POST/PUT/DELETE` content.
- Visitor journey: Hero → Impact → Projects/Goals → Join (contact form) → Footer contact/donate.
- Admin journey: Login → Admin dashboard → choose section → CRUD operations → publish to Home.

## Tech Stack
- Frontend: React 18 + Vite, TailwindCSS, React Query, Framer Motion, Lucide, shadcn-inspired UI primitives.
- Backend: Express, PostgreSQL, Cloudinary uploads, JWT auth, bcrypt hashing.
- Tooling: ESLint, Nodemon, Tailwind/PostCSS.
