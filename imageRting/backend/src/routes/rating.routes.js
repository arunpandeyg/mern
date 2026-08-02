// FILE: src/routes/rating.routes.js
const express3 = require("express");
const router3 = express3.Router();
const auth3 = require("../middleware/auth.middleware.js");
const ratingController = require("../controllers/rating.controller.js");

// POST /api/images/:id/reaction
router3.post("/:id/reaction", auth3, ratingController.react);
// GET ratings summary for image
router3.get("/:id/ratings", ratingController.summary);

module.exports = router3;
