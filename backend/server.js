const mongoose = require("mongoose");
const app = require("./src/app");
require("dotenv").config({ quiet: true });

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Connected To DB");
  } catch (error) {
    console.log("There Was a Problem While Connecting to DB !!");
    console.error(error);
    process.exit(0);
  }
};

connectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
