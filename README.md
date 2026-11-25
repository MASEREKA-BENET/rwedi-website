# Rwenzori Development Initiative (RweDI) website

A responsive static website for RweDI, built with semantic HTML, shared CSS and vanilla JavaScript.

## Preview locally

Open `index.html` in a browser, or run a local static server from this folder:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Content and assets

- The supplied organisation logo is `assets/rwedi-logo.png` and the matching SVG is `assets/rwedi-logo.svg`.
- The homepage uses supplied community and programme imagery. Images are not described as specific RweDI achievements unless that association is documented.
- Founder names, Enos Kabale’s designation, mission, vision, values, programme areas, target groups, geographic focus, partnership approach and proposed governance are based on the supplied Organisational Profile PDF.
- The profile identifies RweDI as a foundational working draft and says it is not yet registered. The website does not claim registered status.
- The Kithoma Youth-Led Climate-Smart Farming Pilot is labelled as proposed. Its six-month duration is a planning target; the site does not claim enrolment, participant counts or achieved outcomes.
- No verified development partner directory, news items, donation mechanism or organisation-owned social media profile were supplied. The site therefore links partnership enquiries to the contact page and support enquiries to the existing contact channels.
- The contact form validates the fields and opens a pre-addressed email draft. It does not claim to submit to a server-side service.

## Contact details shown

- Email: `rwedi.info@gmail.com`
- Telephone / WhatsApp: `0789 033 226` / `+256789033226`
- Proposed headquarters: Kasese Municipality, Kasese District, Uganda

## Deploy

This is a static site and can be hosted on Vercel, GitHub Pages or another static host. No build command is required. The current workspace must be connected to its intended Git remote and Vercel project before remote deployment can be updated.
