# asposetest

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## ! IMPORTANT !

This app is not going to process API calls without CORS unblock extension for Chrome (or similar) because https://products.aspose.app/ do not send the needed headers and this problem cannot be solved from the frontend side. You can either use the said extension or run the app locally with the same origin.

## Tech/libs

Vue 3, scss, axios

## Technical decisions

It's just an ordinary Vue application with a basic architecture open to any extensions. The only noticeable thing I can think of is that I decided not to use native forms and process requests using custom methods. This approach makes it easier to customize requests and keep them consistent throughout the app.

## What can be improved

- Validation: There is only basic one-time validation that disables a button when no content is entered.
- Error handling: I reused my usual service for the API, and its implementation involves a custom validation system, which is not present in this application. So, there's only a console log for errors.
- Design: Obviously.




