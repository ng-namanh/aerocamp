import campgroundImage from '../assets/campground1.png'
import arrow from '../assets/arrow.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
function CampgroundGallery() {
  const [campgrounds, setCampgrounds] = useState([])
  useEffect(() => {
    axios.get('/campgrounds').then(({ data }) => {
      setCampgrounds(data)
    })
  }, [])
  console.log(campgrounds)
  return (
    <div className='flex flex-col items-center'>
      <div className='grid grid-cols-4 gap-4 mt-16'>
        {campgrounds.map((item, index) => (
          <div key={index} className=' p-2'>
            <img
              src={campgroundImage}
              alt=''
              className=' w-72 h-64 object-cover rounded-xl bg-transparent'
            />
            <div className='my-4'>
              <div>
                <div className='flex justify-between '>
                  <h3 className='font-bold text-ellipsis overflow-hidden break-words whitespace-nowrap w-2/3'>
                    {item.name}
                  </h3>
                  <h3>
                    <span className='font-bold mr-1'>${item.price}</span>night
                  </h3>
                </div>
                <h4 className='text-[#544848] text-ellipsis overflow-hidden break-words whitespace-nowrap'>
                  {item.location}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-12'>
        <button className='secondary flex gap-4 w-44 items-center justify-center'>
          View more
          <span>
            <img src={arrow} alt='' />
          </span>
        </button>
      </div>
    </div>
  )
}
export default CampgroundGallery
