# Roadmap

- [x] Update all portfolio content from the uploaded résumé.
- [x] Remove unsupported claims and correct contact details.
- [x] Validate the updated desktop and mobile layouts.
- [x] Add the Microsoft 365/OVH Cloud and MikroTik Winbox work samples with detailed views.
- [x] Add administrative experience alongside IT support and group the timeline into IT and Administrative tracks.
- [x] Reflect administrative/operations in the headline, About section, and supporting page copy.
- [x] Redesign the portfolio with a blue profile sidebar and résumé-backed bento layout.
- [x] Add résumé-backed bullet points to every Experience entry.
- [x] Add the Technical Virtual Assistant / Executive Assistant profile copy, a Services section, and a Contact FAQ with a mailto-based message form.
- [x] Remove duplicated content (support tracks, repeated stats and promises) and align titles, tool groupings, and metadata.
- [x] Accessibility pass: darker brand blue for small-text contrast, screen-reader-friendly animated name and role.

- Added the Executive Calendar & Schedule Management project (`src/components/CalendarProject.tsx`) with three blurred calendar screenshots (Outlook, HoneyBook, Google Calendar), a HoneyBook tool chip, and a `calendar` assistant entry.
- Third audit: assistant keyword fixes (availability, hours, inbox, recruiting, confidentiality), 'Servers' label, testimonials subtitle, calendar dialog layout without duplicate platform captions.
- Fourth update: added Matt D. (Executive Assistant Support) and Rebecca H. (Director of Operations / MHR, Team & Operations Support), both 5.0, to Testimonials in a 2x2 grid; assistant "reviews" answer mentions them.
- Fourth audit: About card review stat is now computed from the testimonials (average and count); removed the unverified "on Upwork" rating claim from the assistant; testimonials subtitle widened; CRM screenshot paths made explicit (templated paths were not found by the artifact build); removed 36 unused shadcn/ui files and the unused use-mobile hook; fixed two lint errors (0 errors now).
- Testimonials redesign (UX pass): data moved to `src/lib/testimonials.ts`; new `src/components/Testimonials.tsx` with a rating summary, "clients often mention" themes counted from the review text, filter chips by service, a featured first review, Read full review, copy-quote buttons, initials avatars, and a Work with me call to action. New `src/components/ScrollUX.tsx` adds a reading-progress bar and a back-to-top button.
- NC Compliance CRM live link (https://nc-compliance-crm.vercel.app/) added to the Projects card, the CRM dialog, and the assistant's CRM answer.
- Services: each card has a banner cropped from the supplied artwork (`public/projects/service-*.webp`, keyed by title in `serviceImages`). Light mode shows a light card with a light-theme banner (`service-*-light.webp`) inset as a rounded tile; dark mode shows the navy glass card (`.dark .service-card`) with the same inset banner tile. Hover lift, spotlight, row nudge and logo zoom are kept.
- Fifth testimonial: added Jun V. (IT Manager / Head, Technical Support & Initiative, 5.0); removed the Copy button from testimonial cards; About card and assistant now say five reviews.
- Integrity pass: removed the unused toast/sonner/tooltip/react-query providers, 36 unused npm packages, the duplicate `bun.lockb`, stale `src/assets` pointer files, 10 unused images (about 3.5 MB), and a 180 KB favicon (now 16/32/48 px); contact details and the CRM link moved to `src/lib/contact.ts`; project data moved to `src/lib/project-data.ts` (lint is clean with 0 warnings); fixed duplicated copy (support-channel sentence, About stats), carousel dots no longer use tab roles without tab panels, assistant tool list matches the Tools section; added Twitter description and og:image alt.
