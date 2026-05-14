# Sebastian Garcia portfolio

Domain glossary for the personal resume / portfolio site. Terms here are used across components, styles, and tests — pick the canonical word from this list, not synonyms.

## Language

**Background image**:
The full-bleed photo that visually sits behind the contact info on the Contact section.
_Avoid_: hero image, contact photo, background. (Note: despite the name, this is rendered as a foreground `<Image>` so it participates in the image-optimization pipeline — not a CSS `background-image`.)

**Contact card**:
The translucent panel containing the contact methods (mail, LinkedIn, GitHub) that overlays the background image.
_Avoid_: contact box, contact panel, info card.

**Certifications**:
The Resume section listing professional development credentials — Coursera specializations, LinkedIn Learning courses, and similar third-party programs. Each entry has a title, date, and issuer (optionally hyperlinked to a public verification URL). Distinct from **Education**, which is reserved for formal academic credentials (university degrees, IB / high-school programs).
_Avoid_: courses, trainings, learnings, credentials.

## Relationships

- The **Contact card** overlays the **Background image** on the Contact section
