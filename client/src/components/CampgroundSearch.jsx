import magnify from '../assets/magnify.svg'
import { Link } from 'react-router-dom'
import searchBanner from '../assets/search_banner.svg'
function CampgroundSearch() {
  return (
    <div className='flex items-center justify-center border-2 border-black box-shadow py-8'>
      <div className='w-1/2'>
        <h1 className='text-4xl font-bold'>Welcome to AeroCamp!</h1>
        <p className='text-[#544848] text-xl w-4/5 my-6'>
          View our hand-picked campgrounds from all over the world, or add your
          own
        </p>
        <div className='flex gap-4 items-center mb-6'>
          <div className='flex gap-2 w-3/5 border border-black text-black my-1 py-3 px-3'>
            <img src={magnify} alt='' />
            <input
              type='text'
              placeholder='Search for camps'
              className='w-full secondary placeholder-black outline-0'
            />
          </div>
          <button className='primary px-14 h-14 bg-black text-white'>
            Search
          </button>
        </div>
        <Link
          to='/new-campground'
          className='text-base underline text-[#544848] font-semibold'
        >
          Add your own campground
        </Link>
      </div>
      <div>
        <img src={searchBanner} alt='' />
      </div>
    </div>
  )
}
export default CampgroundSearch
