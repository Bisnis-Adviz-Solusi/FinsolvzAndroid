import "dotenv/config";

import pkg from "mongoose";
const { connect, connection } = pkg;

async function database() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("⚠️ MONGO_URI not provided, skipping database connection");
      return;
    }
    await connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${connection.db.databaseName}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    // Don't exit on database failure for Cloud Run
    console.log("⚠️ Continuing without database connection");
  }
}

export default database;
