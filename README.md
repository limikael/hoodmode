# Preact Browserify
Quick, simplest boilerplate for a Preact project using Browserify.

## Purpose
This repo has the boilerplate to build a JS bundle with Browserify for projects that use Preact. It is mostly targeted at people who want to build a dynamic Preact app and are only interested in generating a single JavaScript file. If you want to generate a full app (with pre-rendered HTML, styles, routes and JavaScript), I would recommend [preact-cli]().

## Getting set up
Get yourself a copy of the repo, and do

```
npm install
npm run bundle
```

You will have a working bundled JavaScript file at `/public/js/bundle.js`. You can easily change where the file goes in `package.json`. Finally, the single point of entry of the app will be `src/index.jsx`. You can add your Preact code there, or save it as a Preact Component and link it from such. Examples of both are in the boilerplate.
