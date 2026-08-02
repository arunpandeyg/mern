import React, { useState } from 'react'
import axios from 'axios'
import Img from '../pages/Img'

const ImageUploadForm = () => {
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')
  const [uploadedImg, setUploade] = useState('')

  const previewFiles = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      console.log(reader.result)
      setImage(reader.result)
    }
    console.log(image)
  }

  const handleChange = e => {
    const file = e.target.files[0]
    setFile(file)
    previewFiles(file)
  }

  const handleSubmit = async e => {
  e.preventDefault()
  try {
    const formData = new FormData()
    formData.append('image', file)
    const result = await axios.post('http://localhost:5000', formData)
    console.log(result.data)
    const uploadedImg = result.data.public_id
    setUploade(uploadedImg)
  } catch (error) {
    console.log(error)
  }
}

  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   try {
  //     const result = await axios.post('http://localhost:5000', {
  //       image: image
  //     })
  //     console.log(result.data)
  //     const uploadedImg = result.data.public_id
  //     setUploade(uploadedImg)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className='container mx-auto px-4 h-50 bg-gray-400'>
      <div className='flex justify-center mt-10'>
        <img
          src={image}
          alt='image'
          className='w-45 h-50 rounded-lg shadow-lg hove:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
        />
        <Img uploadedImg={uploadedImg} />
      </div>
      <form
        onSubmit={e => handleSubmit(e)}
        className='flex flex-col gap-4 items-center mt-5'
      >
        <label htmlFor='fileInput' className='cursor-pointer'>
          Upload Image
        </label>
        <input
          type='file'
          id='fileInput'
          className='hidden'
          onChange={e => handleChange(e)}
          required
          accept='/*'
        />
        <button className='btn btn-primary'>Upload</button>
      </form>
    </div>
  )
}

export default ImageUploadForm
