## Description

API Gateway to route to all the services and for global authentication.

## Installation

```bash
$ npm install
```
## Database

```bash
# update schema from project
npx prisma migrate dev --name <message>

# get schema update from db
npx prisma db pull

# get schema types for development
npx prisma generate

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
