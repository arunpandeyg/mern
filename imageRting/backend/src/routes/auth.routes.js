const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  getMe,
} = require("../controllers/auth.controller.js");
const { auth4 } = require("../middleware/auth.middleware.js");

// Signup route
router.post(
  "/signup",
  [
    body("fullName").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  (req, res, next) => {
    // Validate the request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the signup controller function if the request body is valid
    signup(req, res, next);
  }
);

// Signin route
router.post(
  "/signin",
  [
    body("email").isEmail(),
    body("password").isString().notEmpty(),
  ],
  (req, res, next) => {
    // Validate the request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the signin controller function if the request body is valid
    signin(req, res, next);
  }
);

// Signout route
router.post("/signout", auth4, signout);

// ✅ Protected route
router.get("/me", auth4, getMe);

module.exports = router;



// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const router = express.Router();

// // Import controllers
// const {
//   signup,
//   signin,
//   signout,
//   getMe,
// } = require("../controllers/auth.controller.js");

// // ✅ Import the actual middleware function (not the whole object)
// const { auth4 } = require("../middleware/auth.middleware.js");

// // Signup route
// router.post(
//   "/signup",
//   body("fullName").isString().notEmpty(),
//   body("email").isEmail(),
//   body("password").isLength({ min: 6 }),
//   signup
// );

// // Signin route
// router.post(
//   "/signin",
//   body("email").isEmail(),
//   body("password").isString().notEmpty(),
//   signin
// );

// // Signout route
// router.post("/signout", auth4, signout);

// // ✅ Protected route
// router.get("/me", auth4, getMe);

// module.exports = router;

// // // FILE: src/routes/auth.routes.js
// // const express = require("express");
// // const { body, validationResult } = require("express-validator");
// // const router = express.Router();
// // const { signup, signin, signout, getMe } = require("../controllers/auth.controller.js");
// // // const authController = require("../controllers/auth.controller.js");

// // router.post(
// //   "/signup",
// //   body("fullName").isString().notEmpty(),
// //   body("email").isEmail(),
// //   body("password").isLength({ min: 6 }),
// //   signup
// // );

// // router.post(
// //   "/signin",
// //   body("email").isEmail(),
// //   body("password").isString().notEmpty(),
// //   signin
// // );

// // router.post("/signout", signout);

// // router.get("/me", require("../middleware/auth.middleware"), getMe);

// // module.exports = router;
