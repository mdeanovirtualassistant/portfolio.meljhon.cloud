# Meljhon Deaño: portfolio

Single-page portfolio for Meljhon Deaño (Technical Virtual Assistant, IT Support Specialist, and Executive Assistant).
Built with Vite, React 18, TypeScript, Tailwind CSS, and a small set of shadcn/ui primitives (button, dialog, accordion, badge, input, label, textarea).

## Run it

```sh
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run lint
```

## Where things live

- `src/components/PortfolioDashboard.tsx`: page shell, sidebar, and most sections (About, Education, Services, Tools, Experience).
- `src/components/ProjectsShowcase.tsx`: the Projects section, a 3D coverflow (glowing centre card, tilted neighbours, per-project background tint, giant outlined word, arrows, dots, swipe/drag, keyboard, autoplay with a pause button). Its styles are the `pc-*` classes at the end of `src/index.css`. The dialogs reuse `CrmDetails.tsx`, `SheetProjects.tsx`, and `CalendarProject.tsx`.
- `src/components/Testimonials.tsx` and `src/lib/testimonials.ts`: client reviews. The average, count, and "clients often mention" themes are computed from the reviews, so add a review in one place only.
- `src/lib/splash.ts` and the `app-loader` block in `index.html`: the loading screen (instant HTML/CSS, removed once the page and profile photo are ready).
- `src/lib/contact.ts`: email, phone, LinkedIn, and the live CRM link, shared by the sidebar, Contact section, and assistant.
- `src/lib/project-data.ts`: case-study data for the outreach trackers, calendar project, and the two single-screenshot support projects. `src/lib/crm-data.ts` holds the NC Compliance CRM gallery.
- `src/lib/assistant.ts` and `src/components/ChatAssistant.tsx`: the built-in Q&A assistant (answers from the site's own content; no server or AI model).
- `public/projects`, `public/logos`, `public/tools`, `public/lovable-uploads`: images. Reference them by explicit path strings.

See `AGENTS.md` for content rules (résumé-sourced claims, masked screenshots, keeping the assistant and FAQ in step).
