# csv-subscriptions
## how to setup in local environment

## How to set up

As a first step, clone the project:

```shell
git clone git@github.com:gissilali/csv-subscriptions.git
```

Navigate into the directory and install npm packages

```shell
cd csv-subscriptions && npm install
```

Create `.env` file at the root of the project and populate it with these

```dotenv
MONGO_USER=kudobuzz
MONGO_PASSWORD=6N6fp7gylEtkUiyz
MONGO_HOST=cluster0.v9fgc.mongodb.net
```
Seed the database with following command
```
node run seed
```

Finally, run ``npm run dev`` to start the application in development mode

To run unit tests with ``npm run test``

