# Qasim B. Professional Website

Personal professional website built with Next.js (App Router) for business clients and collaborators.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

## Pages

- `/` Home
- `/services`
- `/proof`
- `/background`
- `/contact`
- `/privacy`
- `/privacy-request`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Environment variables

Create `.env.local`:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=Website Contact <noreply@yourdomain.com>
CONTACT_TO_EMAIL=hello@yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

Notes:

- Contact form POSTs to `src/app/api/contact/route.ts`.
- If contact env vars are missing, form submission returns a configuration error and users can use direct email fallback.
- Analytics is optional and loads only after explicit cookie consent. Google Analytics runs when `NEXT_PUBLIC_GA_ID` is set, and Firebase Analytics runs when the `NEXT_PUBLIC_FIREBASE_*` values are set.
- Privacy/cookie controls are available on `/privacy` and via the floating "Cookie settings" button.

- .env* files are gitignored in this project. Keep server secrets (for example RESEND_API_KEY) private and never commit them.
