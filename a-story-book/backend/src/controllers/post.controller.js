import {
  getAllPostsService,
  getPostByIdService,
  createPostService,
  updatePostByIdService,
  deletePostService,
  getPostsByPostIdService,
  getPostsByCategoryService,
  getFeaturedPostsService
} from '../services/post.service.js'
import mongoose from 'mongoose'
import Post from '../models/post.model.js'

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService()
    res.json({ success: true, posts })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getPostById = async (req, res) => {
  try {
    const post = await getPostByIdService(req.params.id)
    res.json({ success: true, post })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const post = await createPostService(req.body)
    res.json({ success: true, post })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const updatePostById = async (req, res) => {
  const { id } = req.params
  const updatedPost = req.body
  try {
    const updated = await updatePostByIdService(id, updatedPost)
    res.status(200).json({ message: 'Post updated successfully', updated })
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({ error: error.message })
  }
}

// export const updatePost = async (req, res) => {
//   const { id } = req.params
//   const post = req.body
//   console.log('Updating post with ID:', id)
//   console.log('Post data:', post)
//   if (!post.title || !post.description || !post.content || !post.category) {
//     return res
//       .status(400)
//       .json({
//         success: false,
//         message: 'Post title, description, content and category are required'
//       })
//   }
  

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ success: false, message: 'Invalid Post Id' })
//   }

//   const image = post.image
//   if (image) {
//     const result = await cloudinary.uploader.upload(image)
//     post.image = result.secure_url
//   } else {
//     post.image = post.image
//   }

//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       {
//         image: post.image,
//         title: post.title,
//         description: post.description,
//         content: post.content,
//         category: post.category
//       },
//       { new: true }
//     )
//     res.status(200).json({ success: true, data: updatedPost })
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server Error' })
//   }
// }

export const deletePost = async (req, res) => {
  try {
    await deletePostService(req.params.id)
    res.json({ success: true, message: 'Post deleted' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getPostsByPostId = async (req, res) => {
  try {
    const posts = await getPostsByPostIdService(req.params.postId)
    res.json({ success: true, posts })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getPostsByCategory = async (req, res) => {
  try {
    const posts = await getPostsByCategoryService(req.params.category)
    res.json({ success: true, posts })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getFeaturedPosts = async (req, res) => {
  try {
    const posts = await getFeaturedPostsService()
    res.json({ success: true, posts })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}
