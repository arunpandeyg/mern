const express = require("express");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware.js");

const authRoutes = require("./routes/auth.routes.js");
// const imageRoutes = require("./routes/image.routes.js");
// const ratingRoutes = require("./routes/rating.routes.js");
// const statsRoutes = require("./routes/stats.routes.js");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.send({ ok: true, message: "Image rating backend" })
);

app.use("/api/auth", authRoutes);
// app.use("/api/images", imageRoutes);
// app.use("/api/images", ratingRoutes); // nested: /api/images/:id/reaction etc
// app.use("/api/stats", statsRoutes);

app.use(errorHandler);

module.exports = app;
