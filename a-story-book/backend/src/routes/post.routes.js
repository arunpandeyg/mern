import express from 'express'
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePost,
  getPostsByCategory
} from '../controllers/post.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'
import { upload } from '../middleware/multer.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.get('/:category', getPostsByCategory)
router.post('/', requireAuth, upload.single('image'), createPost)
router.put('/:id', upload.single('image'), updatePostById)
router.patch('/:id', upload.single('image'), updatePostById)
router.delete('/:id', requireAuth, requireRole('admin'), deletePost)

export default router
