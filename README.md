# Repro of regression in netlify-cli@17.26.1

## Steps to reproduce

First, install the faulty version of `netlify-cli`:

```sh
npm install -g netlify-cli@17.26.1
```

Then, build and deploy the site:

```sh
pnpm install
netlify deploy --build --filter page-router
```

Then, visit the path `/api/revalidate` on the deployed site. You should see a 500
error. The expected result is a 200.

Repeat with an earlier version of `netlify-cli` and you'll see the 200.
