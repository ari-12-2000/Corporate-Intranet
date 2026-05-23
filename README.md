# OrgSphere Corporate Intranet

Next.js 16 + React 19 + TypeScript assessment project for a corporate intranet, employee mobile preview, and HR/Admin command center.

## Demo Credentials

- Employee: `employee@demo.com` / `employee123`
- HR/Admin: `admin@demo.com` / `admin123`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/login`.

## Routes

- `/login` demo role login
- `/employee` employee web console
- `/employee/mobile-preview` limited mobile APK-style experience
- `/admin` HR/Admin command center
- `/admin/moderation` moderation queue
- `/admin/content` publishing and visibility controls
- `/admin/analytics` engagement analytics

## Static Hosting

```bash
npm run build
```

The static export is generated in `dist/`, ready for Vercel, Netlify, GitHub Pages, or any static host.

## APK Packaging Plan

The project includes `capacitor.config.json` with `webDir` set to `dist`.

If you want a real APK, install Capacitor packages plus Android Studio/JDK, then run:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Build the debug or release APK from Android Studio.

## Notes for Evaluators

- Uses the target folder's existing Next.js, React 19, TypeScript, Tailwind and ESLint package setup.
- No backend is required; all visibility, role, moderation, analytics and engagement states are deterministic seeded data.
- The UI prioritizes dense operational dashboards over a marketing landing page.
- The app models multi-tenant visibility pools across all employees, verticals, corporate functions and locations.
