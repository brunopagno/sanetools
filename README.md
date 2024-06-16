# Sane tools

A collection of sane tools to make web applications.

### Usage

To create a new project

```sh
npx --package=https://github.com/brunopagno/sanetools sanetools <dirname>
```

Then `cd` into the application directory and run `npm install`.

This will setup the new project with the dependencies. The next thing to do would be to check the database schema, define the initial model(s) and setup the database for the application.

```
cp .env.sample .env
npm run db:migrate initial
npm run db:deploy
npm run test
```

Then start building things

#### Commands

```
npm run build   # builds the project
npm run start   # starts the production build
npm run dev     # starts the dev hot reloading website
npm run test
npm run test:watch
```

And database things

```
npm db:migrate <name of the migration>
npm db:studio   
npm db:deploy   # to update local dev & test db to the latest migration

```

### This project uses

- expressjs
- prisma
- sqlite (should not be too difficul to change the database if you prefer something else)

~- no build step~ people like typescript so much, there does not seem to be a way to avoid it
