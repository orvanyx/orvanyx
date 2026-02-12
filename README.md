# Orvanyx Website (Netlify Ready)

Modern static website for **orvanyx.com** with two pages:

- `index.html` → brand landing page with introduction **"orvans world and vision"**
- `private-links.html` → private link vault for `@orvanyx` with:
  - moving next-gen canvas background
  - background music toggle
  - random profile picture
  - local private passcode lock
  - editable links stored in browser localStorage

## Deploy to Netlify
1. Push this repository to GitHub.
2. Open Netlify → **Add new site** → **Import an existing project**.
3. Select this repo.
4. Build command: *(none required)*
5. Publish directory: `.`
6. Deploy site.

## Connect Porkbun domain
1. In Netlify: **Site settings** → **Domain management** → **Add domain** → `orvanyx.com`.
2. In Porkbun DNS, point your domain records to Netlify using values shown in Netlify's domain setup.
3. Wait for DNS propagation and enable HTTPS in Netlify.
