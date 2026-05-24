const express = require("express");
const morgan = require("morgan");
const healthRoutes = require("./routes/health");
const taskRoutes = require("./routes/tasks");

function createLogger() {
  return {
    info: (message) => console.log(`[INFO] ${new Date().toISOString()} ${message}`),
    error: (message) => console.error(`[ERROR] ${new Date().toISOString()} ${message}`),
  };
}

function createApp() {
  const app = express();
  const logger = createLogger();

  app.locals.logger = logger;

  app.use(express.json());
  app.use(
    morgan(":method :url :status :response-time ms", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({ name: "UD06 OPT API", status: "running" });
  });

  app.use("/health", healthRoutes);
  app.use("/api/tasks", taskRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((error, req, res, next) => {
    req.app.locals.logger.error(error.stack || error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  });

  return app;
}

module.exports = createApp;
