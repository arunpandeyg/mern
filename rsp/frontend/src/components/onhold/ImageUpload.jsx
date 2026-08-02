import React from 'react'
import ImageUploadForm from '../ImageUploadForm'


const ImageUpload = () => {
  return (
    <div className='container mx-auto px-4 h-15 bg-gray-400'>
        <h2 className="text-2xl font-semibold mb-4 text-center mt-5">Upload an Image</h2>
        <div>

        </div>
        <div>
            <ImageUploadForm />
        </div>
    </div>
  )
}

export default ImageUpload
