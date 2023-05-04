const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/weatherApp";

const MongoServer = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = MongoServer;
