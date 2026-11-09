# CourseTube

CourseTube is a client-side course marketplace MVP built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Run locally

```powershell
npm install
npm run dev
```

The development script uses Webpack for compatibility with environments where Next.js's native Turbopack bindings are unavailable. Open [http://localhost:3000](http://localhost:3000).

## Included

- Course landing page and searchable, filterable catalogue with eight sample courses.
- Course pages with a demo video, curriculum, reviews, purchase simulation, and lesson quizzes.
- Mock email/password and Google/Apple sign-in flows.
- Creator course form with a local video preview and simulated quiz generation.
- Client-side persistence of user, purchased courses, and created courses in browser LocalStorage.

There is no backend, real payment processing, or external identity provider. Demo data and account state are local to the current browser.

## Other commands

```powershell
npm run lint
npm run build
npm start
```
