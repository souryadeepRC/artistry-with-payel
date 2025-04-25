import mongoose from "mongoose";

class ConnectionObject {
  isConnected: number = 0;
  constructor() {}
  setConnection(connectionId: number) {
    this.isConnected = connectionId;
  }
}
const connectionObject = new ConnectionObject();

async function dbConnect(): Promise<void> {
  if (connectionObject.isConnected) {
    console.log("Database already connected!");
    return;
  }
  try {
    const database = await mongoose.connect(process.env.MONGO_DB_URL || "");

    connectionObject.setConnection(database.connections[0].readyState);
    console.log("Database connected successfully!");
    return;
  } catch (error) {
    console.error(error);
    console.error("Failed to connect database");
    process.exit(1);
  }
}
export default dbConnect;
