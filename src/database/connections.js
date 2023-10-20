const dbConnection = (mongoose, config) => {
  async function connect() {
    mongoose
      .connect(config.uri, config.options)
      .then(
        () => {},
        (err) => {
          console.info("Mongodb error", err);
        }
      )
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function disconnect() {
    mongoose.disconnect();
  }

  mongoose.connection.on("connected", () => {
    console.info("Connected to mongodb");
  });

  mongoose.connection.on("reconnected", () => {
    console.info("MongoDB reconnected!");
  });

  mongoose.connection.on("error", (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });

  mongoose.connection.on("disconnected", () => {
    console.error(
      `MongoDB disconnected! Reconnecting in ${
        config.options.reconnectInterval / 1000
      }s...`
    );
    setTimeout(() => connect(), config.options.reconnectInterval);
  });

  return {
    connect,
    disconnect,
  };
};

module.exports = {
  dbConnection,
};
