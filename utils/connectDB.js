import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }

  mongoose
    .connect(process.env.MONGODB_URL)
    .then((rs) => console.log("connect DB sc"))
    .catch((err) => console.log("connect DB failed"));
};

export default connectDB;
