import { useState } from 'react'
import axios from 'axios'
function NewCampgroundPage() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const token = localStorage.getItem('token')
  const newCampground = async (e) => {
    e.preventDefault()
    await axios.post(
      '/campgrounds/new',
      {
        name,
        location,
        image,
        price,
        description
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
  }

  return (
    <div className='max-w-7xl my-12 mx-auto'>
      <div className='flex mt-24 px-12 justify-center items-center'>
        <div className='w-1/2'>
          <h1 className='font-bold text-3xl text-center'>Add new campground</h1>
          <form
            className='mt-8 flex justify-center flex-col items-center'
            onSubmit={newCampground}
          >
            <div className='flex flex-col gap-2 w-full'>
              <label
                id='campgroundName'
                className='text-xl  text-[#544848]'
                htmlFor='campgroundName'
              >
                Campground Name
              </label>
              <input
                className='primary p-3 rounded-sm'
                type='text'
                name='campgroundName'
                id='campgroundName'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2 w-full mt-4'>
              <label
                id='campgroundName'
                className='text-xl  text-[#544848]'
                htmlFor='campgroundName'
              >
                Location
              </label>
              <input
                className='primary p-3 rounded-sm'
                type='text'
                name='campgroundName'
                id='campgroundName'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2 mt-4 w-full'>
              <label
                id='image'
                className='text-xl text-[#544848]'
                htmlFor='image'
              >
                Image
              </label>
              <input
                className='primary p-3 rounded-sm'
                type='text'
                name='image'
                id='image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2 mt-4 w-full'>
              <label
                id='price'
                className='text-xl text-[#544848]'
                htmlFor='price'
              >
                Price
              </label>
              <input
                className='primary p-3 rounded-sm'
                type='text'
                name='price'
                id='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
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
                Add campground
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default NewCampgroundPage
