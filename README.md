# Rwenzori Development Initiative (RweDI) website

A responsive five-page static website built with semantic HTML, shared CSS and vanilla JavaScript. It is intended to remain a **private preview** until the organisation approves the brand assets, contact details and founder photos.

## Preview locally

Open `index.html` directly in a browser, or serve this folder with any static server. For example, with Python installed:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>. All page, stylesheet, script and artwork references are relative paths.

## Replace preview assets

- The local `assets/rwedi-logo.svg` is a preview mark, not an approved logo, and the repository does not include an approved logo file. Add the approved artwork at `assets/rwedi-logo.svg`; the header falls back to the organisation name until it is present. If using a different filename or format, update the logo and favicon references in all five HTML files.
- The homepage hero uses the supplied field photo at `assets/kasese-farmers-planting.png`; its location has not been verified, so it is not identified as a Kasese or Kithoma photo. The homepage and projects page use the supplied Kithoma pilot photo at `assets/kithoma-youth-led-climate-smart-farming.jpeg`; confirm its source, project association and usage approval before presenting it as an actual RweDI activity.
- The homepage programme cards and detailed programme sections use the supplied photos in `assets/programme-agriculture.jpeg`, `assets/programme-youth.jpeg`, `assets/programme-education.jpeg` and `assets/programme-environment.jpeg`, in that order. The youth photo credits Les Stone; confirm the source and usage rights for all four photos before publication.
- The founder cards use the supplied portraits in `assets/founder-bwambale-john.png`, `assets/founder-enos-kabale.png` and `assets/founder-masereka-benet.png`. Confirm the identities and approval to publish these photos.

## Contact details

The organisation profile supplies main founder Enos Kabale’s phone number, which is linked as telephone and WhatsApp in `contact.html` and the footer. RweDI’s public email address is linked throughout all five HTML pages:

- Email: `<a href="mailto:enosmin111@gmail.com">enosmin111@gmail.com</a>`
- Phone: `<a href="tel:+COUNTRYCODE_NUMBER">DISPLAY_PHONE</a>`
- WhatsApp: `<a href="https://wa.me/COUNTRYCODE_NUMBER">Message RweDI on WhatsApp</a>` (digits only in the URL, including country code).

The phone number is displayed in local Uganda format (`0789 033 226`) and linked internationally as `+256789033226`. The feedback button opens a draft email to the sample `.example` address; replace its destination with the confirmed email before publishing. The LinkedIn footer icon currently opens a LinkedIn company search for RweDI; replace its URL in all five pages with the official organization profile when available. The WhatsApp icon opens a chat to the supplied number. Confirm all public links before publishing. The contact page does not include a form because no submission service is configured.

## Content approval

The founders and registration status follow the supplied brief. The profile PDF is marked “foundational working draft — not yet registered,” which conflicts with the supplied instruction that RweDI’s registered status is confirmed; confirm the current legal status and update the public copy if needed. The mission, vision and values are taken from the profile. The Kithoma pilot is clearly marked **Proposed project**; its six-month timeline is a proposed planning target and no participant figures or enrolment dates are claimed.

## Deploy to GitHub and Vercel

Commit the complete folder to a GitHub repository. In Vercel, import that repository and deploy it as a static site with the project root set to this folder and no build command or output directory required. Keep deployment access private until the logo, public contact details, photos and copy are approved. The site uses relative links and can also be hosted by GitHub Pages or another static host.
