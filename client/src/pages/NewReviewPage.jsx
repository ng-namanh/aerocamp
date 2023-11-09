import { useState } from 'react'

function ReviewPage() {
  const [description, setDescription] = useState('')
  return (
    <div className='max-w-7xl my-12 mx-auto'>
      <div className='flex mt-24 px-12 justify-center items-center'>
        <div className='w-1/2'>
          <h1 className='font-bold text-3xl text-center'>Give your reviews</h1>
          <form className='flex justify-center flex-col items-center'>
            <div className='flex flex-col gap-2 mt-4 w-full'>
              <label
                id='descrition'
                className='text-xl text-[#544848]'
                htmlFor='descrition'
              >
                Description
              </label>
              <textarea
                name='description'
                id=''
                cols='30'
                rows='10'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className='w-full'>
              <button className='primary p-3 bg-black text-white mt-8 w-full '>
                Post review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ReviewPage
