# College Build-Off

A gamified registration system for the "Build Your First AI Project in 60 Minutes" workshop. Students compete to get their college to the top of the leaderboard while gaining value through free ATS resume checks.

## Features

- **Free ATS Resume Check**: Upload a resume and get an instant ATS-readiness score with personalized improvement suggestions
- **Branch-Matched AI Projects**: Personalized project recommendations based on student's engineering branch (CSE, IT, ECE, EEE, MECH, CIVIL)
- **College Leaderboard**: 30 Tamil Nadu colleges compete on a live board with goal meters
- **WhatsApp Verification**: Prevents fake registrations by requiring WhatsApp verification
- **Shareable Rank Cards**: Students can generate and share rank cards to help their college climb
- **Representative Dashboard**: Campus reps can track their referrals and tier progress

## Pages

- `/` - Landing page with ATS Resume Check
- `/register` - Registration form
- `/result` - Success screen with rank card and WhatsApp verification
- `/board` - Live college leaderboard
- `/c/[code]` - Representative dashboard

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Color Scheme

- Primary: Orange (#f97316)
- Secondary: Teal (#14b8a6)
- Background: Dark (#0a0a0a)

## Mock Data

The app includes 30 seeded Tamil Nadu engineering colleges with mock registration counts for demo purposes.
