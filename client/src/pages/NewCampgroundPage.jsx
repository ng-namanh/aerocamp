import { useContext, useState } from 'react'
import axios from 'axios'
import ImagesUploader from '../components/ImagesUploader'
import back from '../assets/back.svg'
import { UserContext } from '../context/UserContext'
function NewCampgroundPage() {
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [addedImages, setAddedImages] = useState([])
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
        images: addedImages,
        price,
        description
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    setName('')
    setLocation('')
    setAddedImages([])
    setPrice('')
    setDescription('')
  }

  return (
    <div className='max-w-7xl mt-28 mx-auto'>
      <div className='flex mt-26 px-12 justify-center items-center'>
        <div className='border border-1 border-black w-2/3 h-[60vh] rounded-3xl bg-black'>
          <form className='h-full'>
            <div className='h-[10%] border-b border-white flex items-center p-4'>
              <div className='flex justify-between w-full'>
                <button className='bg-black ' type='button'>
                  <img src={back} alt='' />
                </button>
                <p className='text-white font-bold text-xl'>
                  Create new campground
                </p>
                <button
                  className='bg-black text-white font-bold text-xl'
                  type='submit'
                >
                  Share
                </button>
              </div>
            </div>
            <div className='h-[90%] rounded-b-3xl'>
              <div className='flex flex-row h-full'>
                <div className=' flex-[1.5]'>
                  <ImagesUploader
                    addedImages={addedImages}
                    onChange={setAddedImages}
                  />
                </div>
                <div className='flex-1 p-4 h-full border-l border-white'>
                  <div className='h-3/5'>
                    <p className='text-lg text-white font-semibold'>
                      {user.username}
                    </p>
                    <textarea
                      type='text'
                      placeholder='Write a description'
                      className='bg-black text-white border-none  outline-none p-0 mt-2'
                    />
                  </div>
                  <div className='h-2/5 flex flex-col gap-4'>
                    <label htmlFor='' className='flex gap-2'>
                      <p className='text-white'>Add location</p>
                      <input
                        type='text'
                        className='bg-black text-white border-none  outline-none'
                      />
                    </label>
                    <label htmlFor='' className='flex gap-2'>
                      <p className='text-white'>Name:</p>
                      <input
                        type='text'
                        className='bg-black text-white border-none  outline-none'
                      />
                    </label>
                    <label htmlFor='' className='flex gap-2'>
                      <p className='text-white'>Price:</p>
                      <input
                        type='text'
                        className='bg-black text-white border-none  outline-none'
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* <div className='w-1/2'>
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
            <ImagesUploader
              addedImages={addedImages}
              onChange={setAddedImages}
            />
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
        </div> */}
      </div>
    </div>
  )
}
export default NewCampgroundPage
