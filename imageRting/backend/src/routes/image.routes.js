const express2 = require("express");
const router2 = express2.Router();
const { auth4 } = require("../middleware/auth.middleware.js");  // or auth4 = require(...) if using Option B
const { role4 } = require("../middleware/role.middleware.js");
const imageController = require("../controllers/image.controller.js");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router2.get("/", imageController.list);
router2.get("/:id", imageController.getById);

router2.post("/", auth4, role4("admin"), upload.single("image"), imageController.create);
router2.put("/:id", auth4, role4("admin"), upload.single("image"), imageController.update);
router2.delete("/:id", auth4, role4("admin"), imageController.remove);

module.exports = router2;





// // FILE: src/routes/image.routes.js
// const express2 = require("express");
// const router2 = express2.Router();
// const auth = require("../middleware/auth.middleware.js");
// const { role4 } = require("../middleware/role.middleware.js"); // ✅ CORRECT

// // const role = require("../middleware/role.middleware.js");
// const imageController = require("../controllers/image.controller.js");
// const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });

// router2.get("/", imageController.list);
// router2.get("/:id", imageController.getById);
// router2.post(
//   "/",
//   auth,
//   role4("admin"),
//   upload.single("image"),
//   imageController.create
// );
// router2.put(
//   "/:id",
//   auth,
//   role4("admin"),
//   upload.single("image"),
//   imageController.update
// );
// router2.delete("/:id", auth, role4("admin"), imageController.remove);

// module.exports = router2;
