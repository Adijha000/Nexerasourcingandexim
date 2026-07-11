# Nexera Sourcing & Exim — Canton Fair 2026 Website

A fast, SEO/GEO-optimized, lead-generating static site for the 140th Canton Fair 2026 delegation.
No build step — pure HTML/CSS/JS. Deploy anywhere (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel).

## Structure
```
/index.html                 → Landing page (hero, form, why, personas, fair, package, FAQ)
/css/styles.css             → Brand design system + animations
/js/main.js                 → Hero scene, reveal, FAQ, form → email
/js/globe.js                → 3D India→China trade-arc globe (Three.js)
/blog/index.html            → Blog hub (40 topics)
/blog/*.html                → Individual SEO articles
/locations/index.html       → City hub (local SEO)
/locations/*.html           → Per-city landing pages
/sitemap.xml, /robots.txt   → Indexing
/assets/logo.svg            → Brand logo
```

## ⚙️ 3 setup steps before going live

### 1. Wire the inquiry form to email (nexerasourcing01@gmail.com)
The form uses **Web3Forms** (free, no backend, emails you directly).
1. Go to https://web3forms.com → enter `nexerasourcing01@gmail.com` → get your **Access Key**.
2. In `index.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key.
> Until you add the key, the form falls back to opening the visitor's email app to nexerasourcing01@gmail.com (so it still works, just less smoothly). For best lead capture, add the key.
Alternative: Formspree, Getform, or a Google Apps Script endpoint — swap the `fetch` URL in `js/main.js`.

### 2. Add Google Analytics 4 + Meta Pixel
Paste before `</head>` in every page (or just index + templates):
```html
<!-- GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXX');</script>
<!-- Meta Pixel -->
<script>!function(f,b,e,v,n,t,s){/* standard Meta pixel snippet, id 000000 */}(window,document,'script');fbq('init','YOUR_PIXEL_ID');fbq('track','PageView');</script>
```
`js/main.js` already fires a `generate_lead` GA event on successful form submit — add `fbq('track','Lead')` next to it.

### 3. Point the domain & submit to search engines
1. Deploy, then connect `nexerasourcingandexim.com`.
2. Verify the site in **Google Search Console** + **Bing Webmaster Tools**.
3. Submit `https://nexerasourcingandexim.com/sitemap.xml`.
4. Use "URL Inspection → Request Indexing" for the homepage + each blog post.

See `GROWTH-PLAYBOOK.md` for the full SEO/GEO, backlink and daily-blog plan.

## Local preview
```bash
cd nexerasourcingandexim
python3 -m http.server 4611
# open http://localhost:4611
```

## Adding a new blog post (daily)
Copy `blog/do-i-need-an-invitation-letter-to-attend-canton-fair.html` → rename to the keyword slug →
replace title, meta description, canonical, H1, body, and the Article + FAQ JSON-LD →
add its `<url>` to `sitemap.xml` → link it from `blog/index.html`.
(Just tell me the topic and I'll generate the full optimized article.)
