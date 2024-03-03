# nestjs-todo-app

## Prerequisite 

- Node.js version: v20.11.1
   - https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
- Yarn version: v1.22.11
   - https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable
- Docker version 19.03.12, build 0ed913b8-
   - https://docs.docker.com/get-docker/

## Prepare Database

1. Docker commands to pull mariadb images, run container and login maraidb for sql preparation
   - replace {DB_PASSWORD}, {DB_PORT} with preferred db password and port

```bash
# pull mariadb images
$ docker pull mariadb:10.5.21 

# run container
$ docker run --name mariadb-todo-test -e MYSQL_ROOT_PASSWORD={DB_PASSWORD} -p {DB_PORT}:3306 -d docker.io/library/mariadb:10.5.21

# login maraidb console for sql preparation
$ docker exec -it mariadb-todo-test mariadb --user root -p{DB_PASSWORD}
```

2. Execute SQLs in [db/init.sql](db/init.sql) one by one for create db, and 2 tables

3. Execute ```SHOW TABLES FROM todo_app;```, following result should be shown if no error

```
MariaDB [(none)]> SHOW TABLES FROM todo_app;
+--------------------+
| Tables_in_todo_app |
+--------------------+
| todo_item          |
| user               |
+--------------------+
2 rows in set (0.000 sec)
```

4. Run ```exit``` from mariadb console to exit

## Application

### Installation

```bash
# install packages for application
$ yarn install
```

### Configuration

1. Create file ```.env``` in root directory with following environment variables
    - replace {DB_PASSWORD}, {DB_PORT} with value defined in [Prepare Database](#prepare-database)
    - Please find an example in [.env-example](.env-example)

```
# port of service
PORT=3000

# database configuration
DB_HOST=localhost
DB_PORT={DB_PORT}
DB_USER=root
DB_PASSWORD={DB_PASSWORD}
```

### Running the application

```bash
# development mode
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
# note: requires valid database connection setup, otherwise result in timeout errors
$ yarn run test:e2e
```

### Clean up

- database container

```
$ docker stop mariadb-todo-test

$ docker rm mariadb-todo-test
```