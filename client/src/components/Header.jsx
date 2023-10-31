import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
function Header() {
  const { user } = useContext(UserContext)
  /*  console.log(user.username) */
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-6'>
        <img src={logo} alt='aerocamp logo' />
        <Link to='/home' className='text-lg text-[#544848] font-semibold'>
          Home
        </Link>
        <Link
          to='/new-campground'
          className='text-lg text-[#544848] font-semibold'
        >
          New Campground
        </Link>
      </div>
      {user ? (
        <div>
          <div className='flex gap-6 items-center'>
            <p className='text-lg text-[#544848] font-semibold'>
              {user.username}
            </p>
            <Link to='/register'>
              <button className='primary p-3 bg-black text-white'>
                Logout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex gap-6 items-center'>
          <Link to='/login' className='text-lg text-[#544848] font-semibold'>
            Login
          </Link>
          <Link to='/register'>
            <button className='primary p-3 bg-black text-white'>
              Create an account
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
export default Header
