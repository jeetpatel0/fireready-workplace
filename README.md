# Wildfire Safety & Prevention Canada
A responsive, accessible React + TypeScript training experience for wildfire preparedness.

## Setup

```bash
npm install
npm run dev
```

Build for production with `npm run build` and preview it with `npm run preview`.

## Editing content

Centralized course, lesson, quiz, resource, audience, training-method, evaluation,
challenge, and legal placeholder content lives in `src/data/content.ts`. Components
are intentionally presentational and can be extended without changing the content
model. The Admin page includes local-only prototype sections for courses, lessons,
resources, theme tokens, legal copy, and review data; it is not a production CMS.

The main information architecture is available at `/introduction`, `/learn`,
`/needs-analysis`, `/audiences`, `/methods`, `/learning-design`, `/evaluation`,
`/challenges`, `/resources`, `/contact`, and `/privacy`. Course detail, lesson,
certificate, VR/360, and `/admin` prototypes are also included.

## Deployment

The Vite output in `dist/` is static. Deploy it to GitHub Pages, Netlify, Vercel, or
any static host. Configure SPA fallback to `index.html` for client-side routes.

## Notes

Media blocks use clearly labelled, original CSS placeholders rather than copyrighted
photography. Replace them with owned/licensed assets by updating the `Media` component
and content module. The contact form, questionnaire results, admin edits, certificate,
and evaluation figures are prototypes/local-only. The privacy page contains required
privacy, cookie, and data-retention placeholders that must be replaced with approved
legal text before launch. No external runtime services are required.
