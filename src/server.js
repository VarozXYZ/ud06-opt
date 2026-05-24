require("dotenv").config();

const createApp = require("./app");
const { connectDB } = require("./config/db");

const port = process.env.PORT || 3000;
const app = createApp();

connectDB()
  .then(() => {
    app.locals.logger.info("MongoDB connected");

    app.listen(port, () => {
      app.locals.logger.info(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    app.locals.logger.error(`Startup failed: ${error.message}`);
    process.exit(1);
  });
