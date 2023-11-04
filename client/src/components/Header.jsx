import logo from '../assets/logo.svg'
import { Link, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
function Header() {
  const [redirect, setRedirect] = useState(false)

  const { user } = useContext(UserContext)
  function Logout() {
    try {
      axios.post('/auth/logout').then((response) => {
        if (response.data) {
          localStorage.removeItem('token')
          setRedirect(true)
        }
      })
    } catch (error) {
      console.error(error)
      alert('logout fail, please check your username or password')
    }
  }
  if (redirect) {
    return <Navigate to={'/login'} />
  }

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

            <button
              className='primary p-3 bg-black text-white'
              onClick={Logout}
            >
              Logout
            </button>
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
