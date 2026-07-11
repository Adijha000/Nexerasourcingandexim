# Go live — step by step

The site is 100% ready to publish. The inquiry form and popup already work with no account:
they email **nexerasourcing01@gmail.com** through FormSubmit.co.

## STEP 0 — Activate the form (1 minute, one time)
The very first time the form is submitted, FormSubmit sends a one time confirmation email to
**nexerasourcing01@gmail.com**. Open that email and click the activation link once.
After that, every inquiry from the website lands directly in that inbox. (I cannot click this for
you because it arrives in your Gmail.)

## STEP 1 — Publish the site (pick ONE, both are free)

### Option A — Netlify Drop (fastest, no account command needed)
1. Go to https://app.netlify.com/drop
2. Drag the file **nexerasourcingandexim-site.zip** (in this folder) onto the page,
   or drag the whole project folder.
3. Your site is live instantly on a temporary address like `random-name.netlify.app`.
4. In Site settings, add your custom domain **nexerasourcingandexim.com** and follow the DNS
   values Netlify shows you (see STEP 2).

### Option B — GitHub Pages (auto redeploys on every change)
1. Create a GitHub account and a new repository.
2. Push this folder to it (a GitHub Actions workflow is already included at
   `.github/workflows/deploy.yml`, and a `CNAME` file is set).
3. In the repo: Settings > Pages > Source = GitHub Actions.
4. It builds and goes live at `https://<your-username>.github.io/<repo>` and then on your domain
   once DNS is set.

## STEP 2 — Point your domain (nexerasourcingandexim.com)
Log in to wherever you bought the domain and add these DNS records.

If using **GitHub Pages**, add four A records for the apex domain:
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
CNAME  www   <your-username>.github.io
```

If using **Netlify**, use the exact records Netlify shows in your dashboard (usually):
```
A      @     75.2.60.5
CNAME  www   <your-site>.netlify.app
```
DNS can take a few hours to propagate. The `CNAME` file in this folder already sets the domain.

## STEP 3 — Turn on analytics and Search Console (optional but recommended)
1. Create a Google Analytics 4 property, copy your `G-XXXXXXX` ID.
2. Paste the GA4 snippet from `README.md` before `</head>` on your pages
   (the form already fires a `generate_lead` event).
3. Verify the site in Google Search Console, then submit
   `https://nexerasourcingandexim.com/sitemap.xml`.
4. Use URL Inspection to request indexing for the homepage and each blog post.

That is everything. After STEP 0 and STEP 1 the site is live and collecting inquiries.
