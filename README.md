# Circle FE (Frontend)

Frontend project untuk aplikasi **Circle** yang dibangun menggunakan **React + TypeScript** dengan bundler **Vite**, state management menggunakan **TanStack Query**, validasi menggunakan **Zod**, dan styling menggunakan **TailwindCSS**.

---

## 🚀 Tech Stack

| Category | Tech / Library |
|----------|----------------|
| Framework | React 19, TypeScript |
| Bundler | Vite |
| Styling | TailwindCSS, class-variance-authority, tailwind-merge |
| UI Components | Radix UI, lucide-react, sonner, sweetalert2 |
| Form Handling | react-hook-form, @hookform/resolvers, zod |
| Data Fetching | Axios + TanStack React Query |
| Routing | react-router-dom v7 |
| Utilities | date-fns, js-cookie, cookie |
| Dev Tools | ESLint, TypeScript, Vite preview |

---

## 📂 Project Structure

```
.
├── dist/                     # Build output
├── node_modules/
├── public/                   # Static assets
│   ├── defaultIMG/
│   ├── img/
│   └── vite.svg
├── src/
│   ├── api/                  # API services (axios requests, endpoints)
│   ├── assets/               # Images, fonts, etc
│   ├── Auth/                 # Auth-related pages, hooks, context
│   ├── components/           # Reusable components
│   │   └── ui/               # Base UI components (shadcn-like)
│   ├── hooks/                # Custom React hooks
│   ├── layout/               # Page layout components
│   ├── lib/                  # Helpers, constants, configs
│   ├── model/                # Data models (zod schemas, TS types)
│   ├── pages/                # Main pages/routes
│   ├── Routes/               # App route definitions
│   ├── schema/               # Form validation schemas
│   ├── utils/                # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env                      # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 📥 Cara Clone & Menjalankan Project

### 1️⃣ Clone Repository

```sh
git clone https://github.com/afdalRafi3107/circle-fe.git
cd circle-fe
```

### 2️⃣ Install Dependencies

```sh
npm install
```

atau jika menggunakan **pnpm**:

```sh
pnpm install
```

### 3️⃣ Setup Environment

Buat file `.env` di root folder dan isi sesuai kebutuhan (contoh):

```
VITE_API_URL=https://api.example.com
```

### 4️⃣ Jalankan Development Server

```sh
npm run dev
```

Server akan berjalan di:

```
http://localhost:5173
```

### 5️⃣ Build Production

```sh
npm run build
```

### 6️⃣ Preview Build

```sh
npm run preview
```

---

## ✅ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Menjalankan Vite dev server |
| `npm run build` | Build TypeScript + Vite production bundle |
| `npm run preview` | Menjalankan preview hasil build |
| `npm run lint` | Menjalankan ESLint |

---

## 📌 Requirements

- Node.js **v18+**
- npm / pnpm / yarn
- Git

---

## 📄 License

MIT License – bebas digunakan & dikembangkan.

---

## 🤝 Contributing

Pull Request dan Issue sangat diterima!  
Silakan **fork**, buat branch, dan kirim PR.

---

Jika ingin saya tambahkan **badge**, **preview screenshot**, atau **contoh environment variable**, tinggal bilang saja 👍

