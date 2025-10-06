# Dev Notes — AI Collaboration

## Prompt Entry 1
- Prompt I gave: "Scaffold an accessible, responsive dark-themed homepage with semantic HTML, skip link, Open Graph, and shared CSS/JS."
- What AI returned: A semantic `index.html`, `css/styles.css` with tokens/utilities, and `js/main.js` stubs for nav state and skip link.
- What I accepted or changed (why): Accepted the structure; refined copy to match my tone and added project CTAs. Ensured strong contrast and visible focus per assignment.

## Prompt Entry 2
- Prompt I gave: "Add contact page with client-side validation: required name/email/message, inline errors, redirect on success."
- What AI returned: A form with aria-live regions, simple email regex, and redirect to `thankyou.html?name=<FirstName>`.
- What I accepted or changed (why): Accepted; ensured `novalidate` to rely on custom messages and adjusted error copy to be concise.

## Prompt Entry 3
- Prompt I gave: "Create projects listing and two local project briefs aligned to finance → strategy → AI."
- What AI returned: Two project cards and brief pages with problem/approach/outcomes/role sections.
- What I accepted or changed (why): Accepted; tuned metrics phrasing to be realistic ranges and clarified limitations.

## Reflection (~150 words)
Working with AI sped up scaffolding and repetitive setup: semantic layout, consistent navigation, and accessible components came together quickly. Drafting copy benefitted from structured prompts that mapped requirements to sections and CTAs. The main risks are placeholders or hallucinated details sneaking into final content, so I reviewed all copy for accuracy and ensured images/links either point to local placeholders or are clearly marked as private/"available upon request." I also added client-side validation and tested keyboard navigation (skip link, focus rings) to avoid usability gaps. Print styles for the resume reduce friction when exporting. For deployment, I planned headshot fallbacks: in local dev I can keep my `AIDD5/Images/headshotsurya.*`, and for GitHub Pages I can swap in `/images/headshot.jpg`. Overall, AI provided speed and scaffolding, while diligence and manual review ensured professional tone, accessibility, and reliability.


