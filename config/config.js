const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URL,
  console.log("database => connected successfully")
);
mongoose.connection.on("connected", () => {
  console.log("mongo-db => connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("mongo-db => disconnected");
});
