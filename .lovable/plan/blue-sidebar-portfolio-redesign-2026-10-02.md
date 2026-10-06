# Blue sidebar portfolio redesign

## Changes
- Rebuild the main page around a fixed desktop profile sidebar inspired by the reference, with Meljhon’s photo, contact links, and section navigation.
- Replace the current full-screen introduction with a compact, bold opening statement and a blue-accented tools strip.
- Recompose the existing résumé-backed About, work samples, experience, skills, education, certifications, and contact content into a clean bento-style layout.
- Use a crisp off-white, navy, and bright blue visual system with thin borders, restrained shadows, and small square icon accents.
- Preserve the current project screenshots and their enlarged viewer while adapting their presentation to the new layout.
- Keep phone navigation compact and ensure all sections remain easy to scan without the desktop sidebar.

## Technical details
- Create a single portfolio shell that owns the sidebar, navigation, and bento layout while reusing the existing content and image assets.
- Consolidate styling into semantic design tokens and remove obsolete decorative hero effects from the rendered page.
- Keep all claims and dates aligned with the current résumé-backed content.

## Validation
- Check the full desktop composition and the phone layout visually.
- Test sidebar links, work-sample viewers, contact links, and the contact form.
- Confirm screenshots and profile imagery load successfully and the preview builds without errors.
