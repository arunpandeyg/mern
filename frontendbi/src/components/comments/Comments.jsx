import React from 'react'
import Image from '../image/image'
import EmojiPicker from 'emoji-picker-react';

const Comments = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='w-full h-50 flex flex-col gap-2'>
      <div className=' gap-2 overflow-hidden overflow-y-scroll pl-3'>        
        <div className='pt-3 flex gap-3 text-sm'>
          <Image
            path='bims/hero.png'
            alt='Arun Pandey'
            className={'w-8 h-8 rounded-full'}
          />
          <div>
            <span>Arun Pandey</span>
            <p className='text-sm'>
              It was nice a 10 days journey of Nainital with my family .
            </p>
            <p className='text-sm'>2 days ago</p>
          </div>
        </div>
        <div className='flex gap-3 text-sm'>
          <Image
            path='bims/hero.png'
            alt='Arun Pandey'
            className={'w-8 h-8 rounded-full'}
          />
          <div>
            <span>Arun Pandey</span>
            <p className='text-sm'>
              It was nice a 10 days journey of Nainital with my family .
            </p>
            <p className='text-sm'>2 days ago</p>
          </div>
        </div>
        <div className='flex gap-3 text-sm'>
          <Image
            path='bims/hero.png'
            alt='Arun Pandey'
            className={'w-8 h-8 rounded-full'}
          />
          <div>
            <span>Arun Pandey</span>
            <p className='text-sm'>
              It was nice a 10 days journey of Nainital with my family .
            </p>
            <p className='text-sm'>2 days ago</p>
          </div>
        </div>
        <div className='flex gap-3 text-sm'>
          <Image
            path='bims/hero.png'
            alt='Arun Pandey'
            className={'w-8 h-8 rounded-full'}
          />
          <div className=''>
            <span>Arun Pandey</span>
            <p className='text-sm'>
              It was nice a 10 days journey of Nainital with my family .
            </p>
            <p className='text-sm'>2 days ago</p>
          </div>
        </div>
      </div>
      <form className='flex gap-5 w-full'>
        <input type='text' placeholder='Add a comment ' className='w-full border-none outline-none bg-transparent mb-1' />
        <div className='mr-2 cursor-pointer hover:scale-110 relative'>
          <div onClick={() => setOpen(prev => !prev)}>😃</div>
          {open && <div className='absolute  right-10 bottom-0 w-100 h-100'>  //see later
            <EmojiPicker />
          </div>}
        </div>
      </form>
    </div>
  )
}

export default Comments
