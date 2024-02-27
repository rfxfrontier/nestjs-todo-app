# nestjs-todo-app

## env

```
yarn v1.22.11
nodejs 19.5.0 (using nvm)
npm 9.3.1
```

## Prepare DB

Refer to [here](db/readme.md)

## Application

### Installation

```bash
$ yarn install
```

### Configuration

```
# port of service
PORT=3000

# database configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=user
DB_PASSWORD=password
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```