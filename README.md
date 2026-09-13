# 🍱 BentoBuilder

**Turn your work, identity, and favorite tools into one focused public profile.**

BentoBuilder is a SaaS platform for building personal portfolio pages in a modern **bento-grid** layout. Sign in, drop widgets onto a drag-and-drop canvas, customize every card, hit save — and share a polished public URL.

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## ✨ Features

- **🧩 Drag-and-drop bento grid** — rearrange widgets with `@dnd-kit`, resize presets (`S` / `M` / `L` / `Wide`), up to 6 cards on the free canvas.
- **🎛️ Custom widgets**
  - **Profile Info** — avatar, name, title, bio, LinkedIn & GitHub links
  - **Tech Stack** — your skills, stored in widget `config` (empty until you type them)
  - **GitHub Activity** — contribution chart with a solid fallback card (`Open GitHub profile`)
  - **AI Chat** — a personal assistant that answers only from your name, bio, and tech stack
  - **Portfolio** — showcase URL
  - **Yantarne FM / Radio** — live radio now-playing card
  - **Location** — city label + timezone
  - **Resume** — PDF upload via Vercel Blob
- **💾 Persistent state** — layout, sizes, and widget configs are saved to PostgreSQL through Prisma (`PATCH /api/profile`).
- **🌐 Public profile** — share `/{username}`; Server Components render the grid for SEO and fast first paint.
- **🔐 Auth** — Google and GitHub sign-in with NextAuth.js.

---

## 🛠️ Tech Stack

| Layer | Tools |
| --- | --- |
| **Frontend** | Next.js (App Router), React, Tailwind CSS, TypeScript |
| **Backend** | Next.js API Routes, Prisma ORM, Neon.tech (serverless PostgreSQL) |
| **AI** | OpenRouter or Gemini API for the on-grid assistant |
| **Auth & files** | NextAuth.js, Vercel Blob |

The repo is an npm workspaces monorepo:

```text
bento-builder/
├── apps/frontend   # Next.js app (dashboard, public pages, API routes)
└── apps/backend    # Prisma schema + Nest stub
```

---

## 🚀 Getting Started

### 1. Install dependencies

From the repository root:

```bash
npm install
```

### 2. Environment variables

Create `apps/frontend/.env.local` (Next.js loads this automatically):

```env
# Database (Neon.tech serverless Postgres)
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-long-random-string"

# OAuth (required to sign in)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# AI assistant — set at least one
OPENROUTER_API_KEY=""
GEMINI_API_KEY=""
# optional aliases:
# GOOGLE_GENERATIVE_AI_API_KEY=""
# GOOGLE_API_KEY=""

# Resume PDF uploads
BLOB_READ_WRITE_TOKEN=""
```

> Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32`.

### 3. Push the database schema

Prisma schema lives in the backend package:

```bash
npx prisma db push --schema=apps/backend/prisma/schema.prisma
npx prisma generate --schema=apps/backend/prisma/schema.prisma
```

### 4. Run the app

```bash
npm run dev
```

This starts the Next.js frontend (and the workspace backend script). Open [http://localhost:3000](http://localhost:3000).

Frontend only:

```bash
npm run dev:frontend
```

---

## 🏗️ Architecture Highlights

- **Server Components** power the public `/{username}` page: Prisma loads the profile and widgets on the server for SEO, caching, and a fast first paint.
- **Client Components** power the dashboard (`DashboardClient`, `BentoGrid`, widgets): drag-and-drop, live settings, and optimistic canvas updates before `Save Changes`.
- **API routes** in `apps/frontend/src/app/api/` handle profile CRUD, auth, uploads, now-playing, and streaming AI chat (`streamText` / OpenRouter or Gemini).
- **Widget config** is a Prisma `Json` field — Tech Stack `technologies`, GitHub `username`, AI chat `context`, portfolio URL, and location are all stored per widget.

```text
Public page     →  Server Component  →  Prisma  →  BentoGrid (read-only)
Dashboard       →  Client Component  →  PATCH /api/profile  →  Prisma
AI Chat widget  →  POST /api/chat    →  streaming LLM response
```

---

## 📁 Useful paths

| What | Where |
| --- | --- |
| Dashboard UI | `apps/frontend/src/components/DashboardClient.tsx` |
| Grid & widgets | `apps/frontend/src/components/BentoGrid.tsx` |
| Widget library | `apps/frontend/src/components/widgets/` |
| Profile API | `apps/frontend/src/app/api/profile/route.ts` |
| AI chat API | `apps/frontend/src/app/api/chat/route.ts` |
| Prisma schema | `apps/backend/prisma/schema.prisma` |

---

## 📄 License

ISC — see `package.json`.
