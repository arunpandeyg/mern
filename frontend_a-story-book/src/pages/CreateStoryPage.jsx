import React from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

// import  useUser  from '../components/hooks/use_user'

const CreateStoryPage = () => {
  // const { isLoaded, isSignedIn } = useUser()

  // if (!isLoaded) {
  //   return <div className='text-center text-2xl font-bold pt-10'>Loading...</div>
  // }
  // if (isLoaded && !isSignedIn) {
  //   return (
  //     <div className='text-center text-2xl font-bold'>
  //       You are not signed in, please sign in...
  //     </div>
  //   )
  // }
  return (
    <Card className='mx-auto w-[50%] shadow-lg mt-5 flex flex-col items-center justify-center gap-4 p-2 sm:p-4 z-0'>
      <h1 className='text-xl font-bold'>Create Story</h1>
      <form>
        <div className='flex gap-2'>
          
          <Input
            type='file'
            placeholder='file...'
            className='w-[80%] rounded-lg bg-transparent p-1 border border-gray-300 '
          />
          <Button
            type='button'
            className='text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full cursor-pointer'
          >
            AddImage
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='' className='text-sm text-gray-500 text-center mt-3'>
            Choose Category
          </label>
          <select name='cat' id='' className='text-sm text-gray-500'>
            <option value='action'>Action</option>
            <option value='adventure'>Adventure</option>
            <option value='development'>Development</option>
            <option value='comedy'>Comedy</option>
            <option value='commercial'>Commercial</option>
            <option value='dance'>Dance</option>
            <option value='database'>Database</option>
            <option value='dharmic'>Dharmic</option>
            <option value='drama'>Drama</option> a
            <option value='economic'>Economic</option>
            <option value='fantasy'>Fantasy</option>
            <option value='fitness'>Fitness</option>
            <option value='journey'>Journey</option>
            <option value='horror'>Horror</option>
            <option value='health'>Health</option>
            <option value='historical'>Historical</option>
            <option value='leadership'>LeaderShip</option>
            <option value='moral'>Moral</option>
            <option value='mystery'>Mystery</option>
            <option value='politics'>Politics</option>
            <option value='romance'>Romance</option>
            <option value='searchEngin'>SearchEngin</option>
            <option value='science'>Science</option>
            <option value='social'>Social</option>
            <option value='technology'>Technology</option>
            <option value='thriller'>Thriller</option>
            <option value='webDesign'>WebDesign</option>
            <option value='webDevelopment'>WebDevelopment</option>
            <option value='western'>Western</option>
            <option value='others'>Others</option>
          </select>
        </div>
        <Textarea
          name='description'
          placeholder='Description...'
          className='w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-700 mt-3 bg-transparent text-gray-500'
        />
        <div className='w-full'>
          <ReactQuill theme='snow' className='w-full' />
        </div>

        <div className='text-center justify-center mt-3'>
          <Button
            type='submit'
            className=' bg-orange-600 hover:bg-orange-700 text-white px-5 py-1 rounded-full cursor-pointer'
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default CreateStoryPage
