# AI Ads Analytics Dashboard — Implementation Plan

## Overview

Production-ready internal AI-powered advertising analytics dashboard.
Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Recharts**, **NextAuth.js**, and **Supabase (PostgreSQL)**.

Thailand flag color palette: Deep Blue (`#003087`), White, Red (`#A51931`), and neutral grays.

Branding: "dee" appears throughout as a sub-brand label (e.g. "dee insights", "dee analysis").

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| UI Components | shadcn/ui |
| Charts | Recharts |
| Auth | NextAuth.js (Google OAuth + Email/Password) |
| Database | Supabase (PostgreSQL) |
| API Data | DummyJSON + synthetic ad-style transformation |
| Deployment | Vercel-ready |

---

## Project Structure

```
/home/konony/Antigravity/HireGrowth/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx             # Sidebar + header shell
│   │   ├── dashboard/page.tsx     # Main overview
│   │   ├── analytics/page.tsx
│   │   ├── insights/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── team/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── analytics/route.ts
│   │   ├── campaigns/route.ts
│   │   ├── insights/route.ts
│   │   └── alerts/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                        # shadcn/ui primitives
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── KPICard.tsx
│   │   ├── AlertBanner.tsx
│   │   ├── AISummaryCard.tsx
│   │   └── PerformanceSummary.tsx
│   ├── charts/
│   │   ├── SpendConversionChart.tsx
│   │   ├── ROASChart.tsx
│   │   ├── DeviceChart.tsx
│   │   └── DailyPerformanceChart.tsx
│   ├── campaigns/
│   │   └── CampaignTable.tsx
│   └── shared/
│       ├── LoadingSkeleton.tsx
│       └── ToastProvider.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── auth/
│   │   └── options.ts
│   ├── analytics/
│   │   ├── fetchAdData.ts         # DummyJSON → ad data transformation
│   │   └── metrics.ts
│   └── insights/
│       └── generateInsights.ts    # Rule-based AI insight engine
├── types/
│   ├── analytics.ts
│   ├── campaign.ts
│   └── auth.ts
├── middleware.ts                  # Route protection
├── .env.local.example
├── tailwind.config.ts
└── next.config.ts
```

---

## Proposed Changes

### Phase 1 — Project Bootstrap
- Initialize Next.js 14 with TypeScript + Tailwind CSS + App Router
- Install shadcn/ui, Recharts, NextAuth, Supabase client
- Configure Tailwind with Thailand flag color tokens

### Phase 2 — Auth System
- **[NEW]** `app/(auth)/login/page.tsx` — Beautiful login page
- **[NEW]** `app/api/auth/[...nextauth]/route.ts` — NextAuth handler
- **[NEW]** `lib/auth/options.ts` — Google OAuth + credentials provider
- **[NEW]** `middleware.ts` — Protect all `/dashboard/*` routes

### Phase 3 — Database Schema (Supabase)
Tables: `users`, `roles`, `sessions`, `campaigns`, `analytics_cache`, `ai_summaries`, `alerts`, `activity_logs`
- **[NEW]** `lib/supabase/schema.sql` — Full schema

### Phase 4 — Data Layer (Public API Integration)
- **[NEW]** `lib/analytics/fetchAdData.ts` — Fetch from DummyJSON, transform to ad metrics
- **[NEW]** `lib/insights/generateInsights.ts` — Rule-based AI insight engine
- **[NEW]** `app/api/analytics/route.ts`, `app/api/campaigns/route.ts`, `app/api/insights/route.ts`, `app/api/alerts/route.ts`

### Phase 5 — Dashboard UI
- **[NEW]** `app/(dashboard)/layout.tsx` — Sidebar + header shell with dark mode
- **[NEW]** `components/dashboard/Sidebar.tsx`
- **[NEW]** `components/dashboard/Header.tsx`
- **[NEW]** `components/dashboard/KPICard.tsx` — 9 KPI metrics with trends
- **[NEW]** `components/dashboard/AlertBanner.tsx` — Smart alert system
- **[NEW]** `components/dashboard/AISummaryCard.tsx` — "dee insights" panel
- **[NEW]** `app/(dashboard)/dashboard/page.tsx`

### Phase 6 — Charts & Analytics Page
- **[NEW]** `components/charts/SpendConversionChart.tsx`
- **[NEW]** `components/charts/ROASChart.tsx`
- **[NEW]** `components/charts/DeviceChart.tsx`
- **[NEW]** `components/charts/DailyPerformanceChart.tsx`
- **[NEW]** `app/(dashboard)/analytics/page.tsx`

### Phase 7 — Campaigns Table
- **[NEW]** `components/campaigns/CampaignTable.tsx` — Full sortable/filterable table
- **[NEW]** `app/(dashboard)/reports/page.tsx`

### Phase 8 — AI Insights, Team, Settings Pages
- **[NEW]** `app/(dashboard)/insights/page.tsx`
- **[NEW]** `app/(dashboard)/team/page.tsx` — User management (Admin only)
- **[NEW]** `app/(dashboard)/settings/page.tsx`

---

## Verification Plan

### Automated
- `npm run build` — must pass with 0 TypeScript errors
- `npm run dev` — must start on localhost:3000

### Manual (Browser Agent)
- Verify login page renders
- Verify dashboard KPI cards load with data
- Verify charts render
- Verify campaign table with search/sort
- Verify AI insights panel
- Verify mobile responsive layout
