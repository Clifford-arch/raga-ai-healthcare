# Healthcare SaaS - Patient Management Platform

A B2B Healthcare SaaS UI application built with Next.js, demonstrating frontend development skills, architecture thinking, and real-world application patterns.

## Features

### Core Features

- **Authentication**: Firebase Authentication with email/password login, validation, error handling, and session management
- **Dashboard**: Overview with patient statistics, recent activity, and performance metrics
- **Patient Management**: Grid/List view toggle, search, and status filtering
- **Analytics**: Interactive charts showing patient trends, appointments, and condition distribution
- **Notifications**: Service Worker integration with push/local notification support

### Technical Highlights

- **State Management**: Zustand for lightweight, efficient global state
- **Form Handling**: react-hook-form with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation with strict mode
- **Charts**: Recharts for data visualization
- **PWA Ready**: Service Worker and Web App Manifest configured

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Authentication**: Firebase
- **Charts**: Recharts
- **Icons**: Lucide React
- **Form Validation**: react-hook-form + Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd raga-ai-healthcare
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Email/Password authentication
   - Create a web app and copy the configuration

4. Configure environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Create a test user in Firebase Console:
   - Go to Authentication > Users
   - Click "Add user"
   - Enter email and password

6. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── analytics/      # Analytics page
│   │   ├── patients/       # Patient management page
│   │   └── settings/       # Settings page
│   └── login/              # Login page
├── components/
│   ├── analytics/          # Chart components
│   ├── layout/             # Layout components (Sidebar, Header)
│   ├── patients/           # Patient view components
│   ├── providers/          # App providers
│   └── ui/                 # Reusable UI primitives
├── data/                   # Mock data
├── hooks/                  # Custom React hooks
├── lib/
│   └── firebase/           # Firebase configuration
├── stores/                 # Zustand state stores
└── types/                  # TypeScript type definitions
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Features Walkthrough

### Authentication

- Secure login with Firebase Authentication
- Form validation with real-time error feedback
- Session persistence across browser refreshes
- Protected routes with automatic redirects

### Patient Details

- Toggle between Grid and List views
- Search patients by name, condition, or email
- Filter by status (Active, Critical, Discharged)
- Responsive design for all screen sizes

### Analytics

- Patient trend line charts
- Monthly appointment bar charts
- Condition distribution pie charts
- Key performance metrics

### Notifications

- Browser notification permission handling
- Welcome notification on login
- Test notification in settings
- Service Worker for offline support

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Build

```bash
npm run build
npm run start
```

## License

MIT
