# EcoSense API v2

[![End-to-end tests](https://github.com/EcoSenseID/EcoSense-API-v2/actions/workflows/test.yml/badge.svg)](https://github.com/EcoSenseID/EcoSense-API-v2/actions/workflows/test.yml)

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

## Technologies

[![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=for-the-badge&logo=javascript)](https://github.com/EcoSenseID?tab=repositories&language=javascript)
[![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=red)](https://github.com/EcoSenseID?tab=repositories)
[![NodeJS](https://img.shields.io/badge/node.js-black?style=for-the-badge&logo=node.js&logoColor=6DA55F)](https://github.com/EcoSenseID?tab=repositories)
[![NestJS](https://img.shields.io/badge/nest.js-black?style=for-the-badge&logo=nestjs&logoColor=red)](https://github.com/EcoSenseID?tab=repositories)
[![TypeScript](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript&logoColor=%23007ACC)](https://github.com/EcoSenseID?tab=repositories&language=typescript)
[![Postgres](https://img.shields.io/badge/postgres-black.svg?style=for-the-badge&logo=postgresql&logoColor=%23316192)](https://github.com/EcoSenseID?tab=repositories)
[![Google Cloud](https://img.shields.io/badge/GoogleCloud-black.svg?style=for-the-badge&logo=google-cloud&logoColor=%234285F4)](https://github.com/EcoSenseID?tab=repositories)

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
