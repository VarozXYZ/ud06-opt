const express = require("express");
const { getDBStatus, pingDB } = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await pingDB();

    res.json({
      status: "ok",
      api: "up",
      database: getDBStatus(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    req.app.locals.logger.error(`Health check failed: ${error.message}`);

    res.status(503).json({
      status: "error",
      api: "up",
      database: getDBStatus(),
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;
