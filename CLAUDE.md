# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Geist** font family (sans + mono) via `next/font/google`

## Architecture

This is a fresh Next.js App Router project. Key conventions:

- Path alias `@/*` maps to `./src/*`
- Root layout in `src/app/layout.tsx` sets up fonts and base HTML structure
- Pages are in `src/app/` — `page.tsx` is the home route
- Global styles in `src/app/globals.css`
- Static assets in `public/`
