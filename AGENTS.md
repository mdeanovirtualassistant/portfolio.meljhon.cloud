# Project Rules

- Keep professional claims sourced from Meljhon Deaño's current résumé so portfolio content remains accurate and defensible.
- Calendar and tracker screenshots must have third-party names, emails, client names, and personal events masked before being added to `public/projects/`.
- Project screenshots live in `public/projects/` (cropped from the Upwork project pages) and are referenced by path.
- Compose the public portfolio through the unified dashboard shell so sidebar navigation and bento sections stay visually consistent.
- The floating Q&A assistant (`src/components/ChatAssistant.tsx`) answers only from `src/lib/assistant.ts`. It has no server or AI model behind it, so update that file whenever résumé facts, contact details, or portfolio sections change, and keep every answer sourced from the résumé.
- The Contact section FAQ (`src/components/ContactSection.tsx`) and the assistant must stay consistent with each other and with the résumé. The message form has no backend: it only opens a prefilled `mailto:` link, so never describe a message as sent or stored.
- Contact details and the live CRM link are defined once in `src/lib/contact.ts`; import them instead of retyping them.
- Review counts, averages, and praise themes come from `src/lib/testimonials.ts`; the assistant text in `src/lib/assistant.ts` that says how many reviews there are must be updated by hand when a review is added.
