import mongoose from 'mongoose'
import Post from '../models/post.model.js'
import cloudinary from '../config/cloudinary.js'

export const getAllPostsService = async () => {
  return await Post.find()
}

export const getPostByIdService = async id => {
  const post = await Post.findById(id)
  if (!post) throw new Error('Post not found')
  return post
}

export const createPostService = async data => {
  if (data.image) {
    const result = await cloudinary.uploader.upload(data.image)
    data.image = result.secure_url
  }
  const post = await Post.create(data)
  return post
}

export const updatePostByIdService = async (id, updatedPost) => {
  try {
    const post = await Post.findById(id)
    if (!post) {
      throw new Error('Post not found')
    }
    if (updatedPost.image) {
      const result = await cloudinary.uploader.upload(updatedPost.image)
      updatedPost.image = result.secure_url
    }
    post.title = updatedPost.title
    post.description = updatedPost.description
    post.category = updatedPost.category
    post.content = updatedPost.content
    
      
    await post.save()
    return post
  } catch (error) {
    console.error('Error updating post:', error)
    throw new Error('Error updating post')
  }
}

export const deletePostService = async id => {
  const post = await Post.findByIdAndDelete(id)

  if (!post) throw new Error('Post not found')
  return post
}

export const getFeaturedPostsService = async () => {
  return await Post.find({ isFeatured: true })
}

export const getPostsByCategoryService = async category => {
  return await Post.find({ category })
}

export const getPostsByPostIdService = async postId => {
  return await Post.find({ postId })
}

export const getPostsByUserIdService = async userId => {
  return await Post.find({ user: userId })
}
