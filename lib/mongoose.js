import mongoose from "mongoose";

export default async function mongooseConnect() {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    return true;
  } catch (error) {
    console.log(error);
  }
}
