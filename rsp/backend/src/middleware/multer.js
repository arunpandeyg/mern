import multer from "multer"

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })
const storage = multer.memoryStorage()
export const upload = multer({ storage })
