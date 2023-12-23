import arrow from '../assets/arrow.svg'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function CampgroundGallery({ campgrounds }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='grid grid-cols-4 gap-4 mt-16'>
        {campgrounds &&
          campgrounds.map((item, index) => (
            <Link key={index} to={'/campground/' + item._id}>
              <div className=' p-2'>
                <img
                  src={'http://localhost:5000/uploads/' + item.images[0]}
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
                        <span className='font-bold mr-1'>${item.price}</span>
                        night
                      </h3>
                    </div>
                    <h4 className='text-[#544848] text-ellipsis overflow-hidden break-words whitespace-nowrap'>
                      {item.location}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
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
CampgroundGallery.propTypes = {
  campgrounds: PropTypes.array.isRequired
}
export default CampgroundGallery
