# Sane tools

A collection of sane tools to make web applications.

### Usage

To create a new project

```sh
npx --package=https://github.com/brunopagno/sanetools sanetools <dirname>
```

Then `cd` into the application directory and run `npm install`.

#### Commands

```
npm run dev
npm run debug
npm run test
npm run test:watch
```

### This project uses

- expressjs
- no build step
- node ECMAScript modules (`import` instead of `require`)
