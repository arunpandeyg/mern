// FILE: src/routes/stats.routes.js
const express4 = require("express");
const router4 = express4.Router();
const {auth4} = require("../middleware/auth.middleware.js");
const {role4} = require("../middleware/role.middleware.js");
const statsController = require("../controllers/stats.controller.js");
console.log("statsController keys:", Object.keys(statsController));
console.log("auth4:", typeof auth4);
console.log("role4:", typeof role4);
console.log("\n--- ROUTER DEBUG ---");
console.log("auth4:", typeof auth4);
console.log("role4:", typeof role4);
console.log("statsController:", typeof statsController);
console.log("statsController keys:", Object.keys(statsController));
console.log("imageBreakdown type:", typeof statsController.imageBreakdown);
console.log("--------------------\n");
console.log({
  auth4,
  role4,
  statsController,
  imageBreakdownType: typeof statsController.imageBreakdown
});

// Protected routes — admin access recommended
router4.get("/overview", auth4, role4("admin"), statsController.overview);
router4.get("/geo", auth4, role4("admin"), statsController.geo);
router4.get(
  "/demographics",
  auth4,
  role4("admin"),
  statsController.demographics
);
try {
  router4.get(
    "/image/:id",
    auth4,
    role4("admin"),
    statsController.imageBreakdown
  );
  console.log("✅ Route registered: /image/:id");
} catch (err) {
  console.error("❌ Route registration failed:", err.message);
}
// router4.get(
//   "/image/:id",
//   auth4,
//   role4("admin"),
//   statsController.imageBreakdown
// );

module.exports = router4;
