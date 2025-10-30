Dynamite Building – Responsive Website

A modern, responsive single-page website for a construction company, matching the provided UI screenshots and improving accessibility and interactions.

Preview
Open `index.html` in a browser. No build tools required.

Structure
- `index.html` – semantic markup for all sections
- `styles.css` – design system, layout utilities, responsive styles
- `script.js` – mobile navigation, sticky header, smooth scroll, and form UX

Features
- Sticky header with mobile menu
- Smooth scrolling for anchor links
- Responsive grids for services, testimonials, and contact
- Accessible focus styles and color contrast

Editing
- Colors and radii are defined as CSS variables at the top of `styles.css`.
- Replace Unsplash image URLs in `index.html` with local images if desired.

Deployment
You can host these static files on any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

Role-based access with Supabase
- Replace placeholders in `auth.js` with your Supabase URL and anon key.
- Assign roles via Supabase Dashboard → Auth → Users → Edit JSON → `app_metadata.roles` (e.g., ["admin"], ["moderator"]).
- Admin and Moderator pages (`admin.html`, `moderator.html`) auto-start Google OAuth and enforce roles client-side.
- To map roles automatically by email domain/allowlist, add an Auth hook or Edge Function to set `app_metadata.roles` on sign-in.

Seeding an admin user (optional)
1) Create `.env` with:
```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
2) Install deps and run:
```
npm install
npm run seed:admin -- --email=admin@yourorg.com --password=ChangeMe123! --role=admin
```
This uses the Admin API (service role) to create the user (if missing) and set `app_metadata.roles`.

