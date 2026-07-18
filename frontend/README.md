# ArthaSarthi Frontend

Production-grade AI fintech SaaS frontend for **ArthaSarthi** — built with Next.js 15, React, Tailwind CSS, TanStack Query, Framer Motion, and Recharts.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** (JavaScript)
- **Tailwind CSS** — soft sky blue + cream design system
- **Axios** — API client with JWT interceptors
- **TanStack Query** — server state & caching
- **Framer Motion** — animations & transitions
- **Recharts** — financial charts
- **Lucide React** — icons
- **React Hot Toast** — notifications
- **React Markdown** — AI chat rendering

## Quick Start

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `BACKEND_API_URL` | Server-side backend destination for the `/backend-api` proxy |
| `NEXT_PUBLIC_API_URL` | Optional direct backend URL (requires backend CORS) |

Example `.env.local`:

```
BACKEND_API_URL=https://your-backend.example.com
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Sign in |
| `/register` | Create account |
| `/dashboard` | Analytics dashboard |
| `/transactions` | Transaction management |
| `/goals` | Savings goals |
| `/advisor` | AI financial advisor chat |
| `/profile` | Financial profile |
| `/settings` | Account & preferences |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/              # Authenticated app routes
│   ├── login/
│   ├── register/
│   └── page.js             # Landing
├── components/
│   ├── ai/                 # AI advisor chat
│   ├── auth/               # Login & register forms
│   ├── charts/             # Recharts wrappers
│   ├── dashboard/          # Dashboard widgets
│   ├── goals/
│   ├── landing/
│   ├── layout/             # Navbar, sidebar, shell
│   ├── transactions/
│   └── ui/                 # Buttons, cards, modals
├── context/                # AuthContext
├── hooks/                  # React Query hooks
├── lib/                    # API, constants, icons
├── services/               # API service layer
├── styles/                 # Global CSS
└── utils/                  # Formatters & helpers
```

## Authentication

- **Register**: `POST /users` → returns user `id`, then `POST /auth/login` → JWT
- **Login**: `POST /auth/login` → JWT stored in `localStorage`
- **Protected routes**: client-side guard via `useRequireAuth`
- **User ID**: stored in `localStorage` for API paths (`/users/{userId}/...`)

If you registered via an older flow without user ID, set it once under **Settings**.

## API Integration

Browser requests use the same-origin `/backend-api` proxy. Next.js forwards them
to `BACKEND_API_URL`, avoiding browser CORS coupling.

- Auth: `/auth/login`, `/auth/register`
- Profile: `/users/{id}/profile`
- Transactions: `/users/{id}/transactions`
- Goals: `/users/{id}/goals`
- Analysis: `/users/{id}/analysis`
- Assets: `/users/{id}/assets`
- AI: `POST /api/advice`, `GET /api/advice/{id}/history`

## Deployment (Vercel)

1. Push `frontend/` to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add env: `BACKEND_API_URL`
5. Deploy

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |

## Design System

- **Primary**: Soft sky blue `#6BB8E8`, deep `#3A9AD9`
- **Background**: Cream `#FDFCFA`, `#FAF8F5`
- **Accent**: Teal `#5BBFB5`
- **Effects**: Glassmorphism, soft shadows, rounded cards

Built for a calm, premium, startup-grade fintech experience.
