# ⚡ Fullstack Next + Cloudflare Starter

A fullstack starter template using:

* **Next.js (App Router)**
* **Cloudflare Workers (Edge)**
* **Drizzle ORM**
* **Tailwind + Component UI**
* **Auth, Role & Permission, Micro-SNA**

---

## 🧭 Core Architecture (MUST READ)

This project follows a strict pattern:

> **`app/` is only for routing & server wrappers**
> **All UI, state, and business logic live inside `modules/`**

With this approach:

* `app/` stays **clean**
* Features are **isolated per module**
* Easy to scale (dashboard, widget, auth, etc.)

---

### 📂 Folder Rules

| Folder                 | Purpose                       |
| ---------------------- | ----------------------------- |
| `src/app`              | Routing + server wrappers     |
| `src/modules`          | UI + logic + data per feature |
| `modules/*/pages`      | Main containers               |
| `modules/*/components` | Client UI                     |
| `modules/*/actions`    | Server logic                  |
| `modules/*/hooks`      | State & data fetching         |
| `modules/*/schemas`    | Validation                    |

---

### 🔁 Required Flow

```
app/(route)/page.tsx   → Server wrapper
        ↓
modules/*/pages       → Container
        ↓
modules/*/components  → UI
        ↓
modules/*/hooks       → State & fetching
        ↓
modules/*/actions     → Server logic
```

---

## 🚀 Installation & Local Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Setup environment variables (REQUIRED)

```bash
cp .dev.vars.example .dev.vars
```

> 📌 **Note:**
> Use the example from **Pages Private in Plane**, then adjust it for your **Cloudflare, Auth, and R2** accounts.

---

### 3. Generate Cloudflare types (REQUIRED)

```bash
pnpm run cf-typegen
```

⚠️ Re-run this if:

* `wrangler.json` changes
* `.dev.vars` changes
* Cloudflare bindings change

---

### 4. Run database migration

```bash
pnpm run db:migrate:local
```

---

### 5. Build Cloudflare-ready app

```bash
pnpm run dev:cf
```

---

### 6. Run the project (2 terminals)

**Terminal 1 — Next.js**

```bash
pnpm run dev
```

👉 [http://localhost:3000](http://localhost:3000)

**Terminal 2 — Cloudflare Worker + D1**

```bash
pnpm run wrangler:dev
```

---

## 📁 Project Structure

```
src/
 ├─ app/                → Routing
 ├─ components/         → Global UI
 │   ├─ ui/
 │   └─ global/
 ├─ modules/            → All features
 ├─ db/                 → Drizzle schema
 ├─ lib/                → Utilities
 ├─ services/           → Integrations
 ├─ store/              → Zustand
 └─ styles/             → CSS

public/
 └─ sna.html

drizzle/                → SQL migrations
wrangler.jsonc          → Cloudflare config
worker.js               → Worker entry
```

---

## 🧩 Module Structure (Official Pattern)

```
src/modules/_example/
 ├─ actions/
 ├─ components/
 ├─ constants/
 ├─ hooks/
 ├─ models/
 ├─ pages/
 │   └─ example-page.tsx
 ├─ schemas/
 ├─ services/
 ├─ utils/
 └─ mock/
```

---

## 🧱 How to Create a New Page / Feature

### 1. Choose a Parent Route

Your page **must live under one of these parents:**

* `/dashboard/*`
* `/widget/*`
* `/auth/*`

Example:

```bash
src/app/dashboard/users/page.tsx
```

---

### 2. Create a Module

All real logic & UI go into `modules/`.

```bash
src/modules/users/
 ├─ pages/
 │   └─ users-page.tsx
 ├─ components/
 ├─ hooks/
 ├─ actions/
 └─ schemas/
```

---

### 3. Connect it in `app/`

Your `app/` file must be **server-only wrapper**:

```tsx
// src/app/dashboard/users/page.tsx
import UsersPage from "@/modules/users/pages/users-page";

export default function Page() {
  return <UsersPage />;
}
```

---

## ❌ What NOT to Do

* ❌ Big UI inside `app/`
* ❌ Client components inside `app/`
* ❌ Business logic inside `app/`
* ❌ Page components outside `modules/`

---

**Rule of thumb:**

> If it's UI, state, fetch, or logic → it belongs in `modules/`.
