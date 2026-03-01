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
```

Notes:

- Contact form POSTs to `src/app/api/contact/route.ts`.
- If contact env vars are missing, form submission returns a configuration error and users can use direct email fallback.
- Analytics is optional and loads only after explicit cookie consent when `NEXT_PUBLIC_GA_ID` is provided.
- Privacy/cookie controls are available on `/privacy` and via the floating "Cookie settings" button.
