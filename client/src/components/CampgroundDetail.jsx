/* eslint-disable react/prop-types */
import campgroundImg from '../assets/campgroundDetailImg.png'

function CampgroundDetail({ campground }) {
  return (
    <div className=' border-1 border border-black px-8 py-6 '>
      <div className='flex flex-col gap-4'>
        <div>
          <img
            src={campgroundImg}
            alt=''
            className=' object-cover flex-grow h-full w-full'
          />
        </div>

        <div>
          <div>
            <div className='flex justify-between'>
              <h1 className='font-bold text-lg'>{campground.name}</h1>
              <p className=''>${campground.price}/night</p>
            </div>
            <p className='text-md text-[#544848]'>{campground.location}</p>
          </div>
          <div>
            <p className='my-4'>{campground.description}</p>
            <p className='text-lg'>
              Submitted by
              <span className='font-bold ml-1'>
                {/* {campground.author.username} */}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CampgroundDetail
