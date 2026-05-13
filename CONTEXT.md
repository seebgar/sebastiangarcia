# Sebastian Garcia portfolio

Domain glossary for the personal resume / portfolio site. Terms here are used across components, styles, and tests — pick the canonical word from this list, not synonyms.

## Language

**Background image**:
The full-bleed photo that visually sits behind the contact info on the Contact section.
_Avoid_: hero image, contact photo, background. (Note: despite the name, this is rendered as a foreground `<Image>` so it participates in the image-optimization pipeline — not a CSS `background-image`.)

**Contact card**:
The translucent panel containing the contact methods (mail, LinkedIn, GitHub) that overlays the background image.
_Avoid_: contact box, contact panel, info card.

## Relationships

- The **Contact card** overlays the **Background image** on the Contact section
