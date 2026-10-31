# Hello <img target="blank" width="40px" src="images/wave.gif" />

I am a Data Science graduate student interested in:

- Bayesian Statistics
- Causal Inference
- Artificial Intelligence

<p align="center">
    <i>"Enjoy the little detours to the fullest.</i>
    <br>
    <i>Because that's where you'll find things more important than what you want!"</i>
    <br>
    <i>- Ging Freeces (HxH)</i>
    <br>
    <br>
    <a href="mailto:lechuga.anton@gmail.com">
        <img target="blank" alt="Anton Lechuga | Gmail" width="26px" src="images/gmail.svg" />
    </a>
    <a href="https://twitter.com/anton_lechuga">
        <img target="blank" alt="Anton Lechuga | Twitter" width="24px" src="images/twitter.svg" />
    </a>
</p>

## Local validation

Install the locked dependencies, then run the checks:

```sh
npm ci
npm run validate
```

`npm run validate` runs the format check, ESLint, the Svelte type check and the unit tests.

Browser tests are separate. `npm run test:e2e` builds the site and runs Playwright, which needs a browser installed first:

```sh
npx playwright install chromium
npm run test:e2e
```
