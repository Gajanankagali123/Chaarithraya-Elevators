# Chaarithraya Elevators — Premium Website

A single-page, dark "sleek & modern" redesign built with plain HTML/CSS/JS (no build step, no frameworks) — open `index.html` directly or serve the folder in VS Code with Live Server.

## What's inside
- `index.html` — page structure (Hero, Stats, About, Why Us, Products, Projects, Testimonials, FAQ, CTA, Contact, Footer)
- `style.css` — the design system (charcoal/glass background, brushed-steel + brass accents, Space Grotesk / Inter / JetBrains Mono type)
- `script.js` — interactivity: hero door-open animation, floor-indicator scroll rail, animated counters, scroll reveals, FAQ accordion, testimonial slider, contact form handling

## Signature element
A vertical **floor-indicator rail** on the right edge of the screen (desktop only) mirrors an actual elevator floor display — it lights up the current section as you scroll, like a car moving between floors.

## Still pending before going live
1. **Contact form backend** — `script.js` currently only simulates a submission. Wire it to a real service (Formspree, EmailJS, or your own API endpoint) so enquiries actually reach you.
2. **Map location** — `index.html` has a placeholder Google Maps embed pointing at "Bengaluru" generally. Replace the `src` in the `<iframe>` inside `#contactMap` with your exact office address/coordinates.
3. **Photography** — Hero, About, Products and Projects currently use custom SVG illustrations instead of real photos. Swap these in once you have professional photography of installations, showroom, and team.
4. Placeholder phone number and email in the Contact section — update with real details.

## Notes
- Fully responsive down to mobile; the floor-indicator rail hides below 1100px width to keep the layout clean.
- Respects `prefers-reduced-motion`.
- No external JS libraries — everything is vanilla JS for easy editing.
