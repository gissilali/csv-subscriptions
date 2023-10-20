const { MongoMemoryServer } = require("mongodb-memory-server");

const mongodb = new MongoMemoryServer({
    binary: {
        version: "5.0.9", //default is 6.0.9 it does not work for the latest version of ubuntu,
    },
});

const testDbConnection = async mongoose => {
    async function connect() {
        await mongodb.start();
        const uri = mongodb.getUri();
        console.log({ uri });
        mongoose
            .connect(uri, {
                maxPoolSize:10,
                useNewUrlParser:true,
                useUnifiedTopology: true,
            })
            .then(
                () => {},
                err => {
                    console.info("Mongodb error", err);
                }
            )
            .catch(err => {
                console.log("ERROR:", err);
            });
    }

    async function disconnect() {
        mongoose.disconnect();
    }

    async function clearDatabase() {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }

    async function closeDatabase() {
        await mongoose.connection.dropDatabase();
        await disconnect();
        await mongodb.stop();
    }

    mongoose.connection.on("connected", () => {
        console.info("Connected to mongodb memory server");
    });

    mongoose.connection.on("error", error => {
        console.error(`Error in MongoDb connection: ${error}`);
        mongoose.disconnect();
    });

    return {
        connect,
        disconnect,
        clearDatabase,
        closeDatabase,
    };
};

module.exports = {
    testDbConnection,
};
