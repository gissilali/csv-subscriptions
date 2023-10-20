# csv-subscriptions
## how to setup in local environment

# Book Store REST API

## How to set up

As a first step, clone the project:

```shell
git clone git@github.com:gissilali/csv-subscriptions.git
```

Next, navigate into the directory and install npm packages

```shell
cd csv-subscriptions && npm install
```

Next, to generate a jwt secret, you will need this for auth with passport-jwt

```
node generate-jwt-token
```

Next, paste ``DATABASE_URL="file:./dev.db"`` to the .env file this needed by prisma to be able to connect to your database

To create the database run, this will create all tables needed to run the application

```
npx prisma migrate dev --name init
```

Finally, run ``npm run dev`` to start the application in development mode

To test run ``npm run test``

