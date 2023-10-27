import logo from '../assets/logo.svg'
import heroImg from '../assets/heroImg.svg'
import checkBox from '../assets/checkbox.svg'
import airBnb from '../assets/airbnb.svg'
import booking from '../assets/booking.svg'
import trivago from '../assets/trivago.svg'
import { Link } from 'react-router-dom'
function LandingPage() {
  return (
    <div className='max-w-7xl my-12 mx-auto'>
      <div>
        <img src={logo} alt='aerocamp logo' />
      </div>
      <div className=' lg:mt-4 2xl:mt-32'>
        <div className='flex flex-row'>
          <div className='flex-auto w-1/2'>
            <h1 className='text-6xl font-bold'>
              Explore the best <br />
              camps on Earth.
            </h1>
            <p className='my-6 text-[#544848] text-xl'>
              Yelp camp is a curated list of the best camping spots on <br />
              Earth. Unfiltered and unbiased reviews
            </p>
            <div>
              <div className='flex gap-3 my-1 items-center justify-start'>
                <img src={checkBox} alt='' />
                <p className='text-[#544848] text-lg'>
                  Add your own camp suggestion
                </p>
              </div>
              <div className='flex gap-3 my-1 items-center justify-start'>
                <img src={checkBox} alt='' />
                <p className='text-[#544848] text-lg'>
                  Leave review and expriences
                </p>
              </div>
              <div className='flex gap-3 my-1 items-center justify-start'>
                <img src={checkBox} alt='' />
                <p className='text-[#544848] text-lg'>
                  See location for all camps
                </p>
              </div>
              <div className='mt-12'>
                <Link to={'/home'}>
                  <button className='text-2xl secondary'>
                    View All Campgrounds
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className=' flex-grow'>
            <img src={heroImg} alt='' />
          </div>
        </div>
        <div
          className='flex gap-14
            mt-16'
        >
          <img src={airBnb} alt='' />
          <img src={booking} alt='' />
          <img src={trivago} alt='' />
        </div>
      </div>
    </div>
  )
}
export default LandingPage
