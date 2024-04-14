## Description

Pokedex-kata, written in NextJS with a PostgreSQL DB. Hosted in a Docker container.

## Running with Docker

```bash
$ docker compose up
```

## Running without Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seeding and creating the database

```bash
$ npx mikro-orm schema:fresh --run --seed
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
