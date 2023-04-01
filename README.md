# EcoSense API v2

## Introduction

A RESTful API built with [NestJS](https://github.com/nestjs/nest), Prisma and TypeScript for CRUD operation.\
This is the backend application server for EcoSense Indonesia.

#### Campaign Tags

`Trending` &#8594; A campaign has more than 10 participants.\
`New` &#8594; A campaign starts less than 2 weeks ago.

#### Campaign Time Status `timeStatus`

`Upcoming` &#8594; A campaign has not started yet.\
`Ongoing` &#8594; A campaign is still ongoing right now.\
`Past` &#8594; A campaign has finished.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

##

2023 &#169; EcoSense Indonesia.
