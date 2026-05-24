const mongoose = require("mongoose");

async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(uri);
  return mongoose.connection;
}

async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

function getDBStatus() {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return states[mongoose.connection.readyState] || "unknown";
}

async function pingDB() {
  if (!mongoose.connection.db) {
    throw new Error("Database connection is not initialized");
  }

  await mongoose.connection.db.admin().ping();
}

module.exports = {
  connectDB,
  disconnectDB,
  getDBStatus,
  pingDB,
};
