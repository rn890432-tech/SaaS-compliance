# SaaS Compliance Platform

A production-grade, multi-tenant compliance management platform built with **Next.js**, **Prisma**, **PostgreSQL**, **NextAuth**, and **Tailwind CSS**.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router) |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth (GitHub SSO, extensible to SAML) |
| Styling | Tailwind CSS |
| Audit | Built-in cryptographic audit logging |

---

## 📁 Project Structure

```
saas-compliance/
├── app/
│   ├── dashboard/          # Compliance dashboard
│   ├── documents/          # Document library
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js
│   │   ├── acknowledge/route.js
│   │   ├── documents/route.js
│   │   └── audit/route.js
│   ├── layout.js
│   └── page.js
├── components/
│   ├── AcknowledgmentCard.jsx
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── lib/
│   ├── prisma.js           # Prisma singleton
│   ├── auth.js             # NextAuth config
│   └── audit.js            # Audit logger utility
├── prisma/
│   └── schema.prisma
├── styles/
│   └── globals.css
├── .env.example
└── package.json
```

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your database URL, NextAuth secret, and GitHub OAuth credentials
```

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔐 Authentication

Authentication is handled by [NextAuth](https://next-auth.js.org/). The starter uses GitHub OAuth. To add more providers (Google, Azure AD, SAML), update `lib/auth.js`.

Create a GitHub OAuth App at [github.com/settings/developers](https://github.com/settings/developers) and set the callback URL to:

```
http://localhost:3000/api/auth/callback/github
```

---

## 🗄️ Database Schema (Multi-Tenant)

- **Organization** — top-level tenant
- **User** — belongs to an org, has a role
- **Document** — compliance document, scoped to an org
- **Acknowledgment** — hashed record of a user signing a document
- **AuditLog** — immutable event log scoped to an org

---

## 🧾 API Routes

| Route | Method | Description |
|---|---|---|
| `/api/acknowledge` | POST | Record a signed acknowledgment with SHA-256 hash |
| `/api/documents` | GET | List documents for an org |
| `/api/documents` | POST | Create a new compliance document |
| `/api/audit` | GET | Fetch audit log events for an org |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth authentication |

---

## ✅ Features

- Multi-tenant SaaS foundation (org isolation)
- SSO-ready authentication (GitHub, extendable)
- Compliance document management
- One-click acknowledgment with SHA-256 hash integrity
- Immutable audit logging
- Extensible REST API

---

## 🚀 Deployment

**Recommended stack:**
- [Vercel](https://vercel.com) for Next.js hosting
- [Supabase](https://supabase.com) or [Neon](https://neon.tech) for managed PostgreSQL

Set all environment variables from `.env.example` in your hosting provider's dashboard before deploying.
