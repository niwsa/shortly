# SHORTLY

## How to get going ?

Install the packages and start the dev server on port 3000

```bash
yarn install
yarn dev
```

Open your browser of choice and go to http://localhost:3000

## Dev Tooling Setup

The project was bootstrapped from https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest by running

```bash
yarn create next-app --example with-typescript-eslint-jest with-typescript-eslint-jest-app
```

This provides `typescript, eslint and prettier` support out of the box.
Added `setupTests.ts` which loads the next env into jest for testing

## Directory Layout

- \_\_mocks\_\_
  - Contains jest mock files
- \_\_tests\_\_
  - Contains e2e tests
- \_\_components\_\_
  - DataCard - Renders the generated shortlink and original link with copy to clipboard button
  - FeatureCard - Renders a single feature card with its title and description along with a nice rounded icon
  - Footer - Renders the `footer` inside `_app.tsx`
  - Form - Renders the `form` which takes in user link and calls the shrtco.de API to get the short link.
  - Hero - Renders the hero landing content along with the illustration;Will be the first thing a user sees on loading the page.
  - Logo - Logo used in header and footer with both dark and light versions.
  - PageHeader - Renders the banner with the logo, navigation and signup buttons
- hooks
  - useKeyPress.ts - Listens for a specific key press and triggers handler
  - useOnClickOutside.ts - Listens for click outside a component.
  - useWindowSize.ts - Listens to window `resize` events and returns the current width/height.
- lib
  - apiClient.ts - fetch call to shrtco.de API
  - cms.ts - A small catalogue most likely a whole Content Management System interfacing in a production app.
  - localStorage.ts - Store and retrieve short links from localStorage.
- pages
  - \_document.tsx - Used for sourcing "Poppins" font and setting document language.
  - \_app.tsx - Persists layout between page changes (both `<header>` and `<footer>` + `<main>` which holds the page level contents are rendered here). Global css is imported here.
  - index.tsx - Renders the `/` path inside `<main>` with whatever comes between `<header>` and `<footer>`
  - Home.module.css - Contains layout styling for `/` path
- public
  - Contains different SVG assets used across the application
- styles
  - global.css - declares the CSS variables, font-family, responsive app font size and content padding plus call to action (`.ctoa`) button style.

## Tests

To run the tests:

```bash
yarn test
```

Where to find the test files:

```js
components/ <component> /__tests__
```

eg:

```js
components / PageHeader / __tests__
```

### Testing Frameworks and libraries:

This project uses testing-library along with its companion libs like

- `@testing-library/jest-dom` (for better assertions like `toHaveClass`),
- `@testing-library/react` (for rendering React components),
- `@testing-library/user-event` (for simulating user click and keypress).

The test running is made possible via `jest`.

For REST API mocking this project uses [msw](https://mswjs.io/). `Fetch` api is polyfilled in jest with `whatwg-fetch`.

For testing mobile viewports (nav dropdown) `mq-polyfill` is [added](https://spectrum.chat/testing-library/help-react/how-to-set-window-innerwidth-to-test-mobile~70aa9572-b7cc-4397-92f5-a09d75ed24b8?m=MTU1OTU5MTI2MTI0MQ==) innorder for `window resizeTo` to work.

**IMPORTANT NOTES**:

- The e2e test would ask for clipboard permission; (tried getting around it;but did not work)
- The e2e test require app to be running on localhost:3000
- **TODO**: We could also test a page refresh and see that the generated links show up in page
