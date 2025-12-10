1. Clone the repo (or copy files into a folder)

2. npm install or npm ci
3. open test.config.ts and provide your email and password to log in LinkedIn

Run tests:

1. Run all projects (Chrome/Edge/Mobile):

    npx playwright test

2. Run a single project (e.g., chrome):

    npx playwright test --project=chrome

3. Run headed for debugging:

    npx playwright test --headed

Artifacts & debugging:

On failure Playwright saves screenshots, traces, and video according to the config.

Use npx playwright show-report to view the HTML report.