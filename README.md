

# 🌸 JobJourna Frontend

> **Where your career story unfolds** — Your personal AI-powered career companion

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)

## 📖 What is JobJourna?

JobJourna is your personal AI-powered career companion — a place where you can organize, track, and grow your job search journey beautifully. Instead of messy spreadsheets or scattered notes, JobJourna helps you keep everything in one elegant, easy-to-use space.

**Core Principles:**
- ✨ **Clarity** — See your entire job search at a glance
- 💬 **Compassion** — A space that understands the emotional side of job searching
- 🚀 **Growth** — Turn every job search into a learning experience

---

## 🎯 Version 1 - Phase 1 (Current)

**Goal:** Core Manual Tracking with Beautiful UI

### Features
- [ ] User Authentication (Signup/Login)
- [ ] Job Application Dashboard (Add/View/Update/Delete)
- [ ] Status Filtering (Applied, Interview, Offer, Rejected)
- [ ] Resume & Cover Letter Library
- [ ] Mobile-Optimized Responsive UI
- [ ] Dark Mode Toggle

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router) — React framework with SSR
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **ShadCN UI** — Accessible component library
- **React Query** — Server state management
- **Axios** — API communication

---

## 🚀 Getting Started

### Prerequisites
```bash
node >= 18.x
npm >= 9.x
```

### Installation

```bash
# Clone repository
git clone https://github.com/ShaguftaKhan703/jobjourna_frontend.git
cd jobjourna_frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Configure `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
jobjourna_frontend/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ui/                # ShadCN components
│   └── features/          # Feature components
├── lib/                   # Utils & API client
├── styles/                # Global styles
└── types/                 # TypeScript types
```

---

## 📝 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

---

## 🚢 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push to `main`

### Docker
```bash
docker build -t jobjourna-frontend .
docker run -p 3000:3000 jobjourna-frontend
```

---

## 🗺️ What's Next?

### Phase 2: AI-Assisted Magic
- AI Cover Letter Generator
- Chatbot-based job entry
- Smart autocomplete suggestions

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

<div align="center">

**Built with empathy, designed with elegance 💜**

</div>
