import PropTypes from 'prop-types'
import Slider from './common/slider'
function CampgroundDetail({ campground }) {
  return (
    <div className=' border-1 border border-black px-8 py-6 '>
      <div className='flex flex-col gap-4'>
        <div className='object-cover flex-grow h-[400px] w-full'>
          <Slider addedImages={campground.images} />
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
                {campground.author.username}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
CampgroundDetail.propTypes = {
  campground: PropTypes.object.isRequired
}
export default CampgroundDetail
