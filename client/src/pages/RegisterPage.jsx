import logo from '../assets/logo.svg'
import backArrow from '../assets/backArrow.svg'
import { Link } from 'react-router-dom'
import testimonialAvatar from '../assets/testiAvatar.svg'
import { useState } from 'react'
import axios from 'axios'
function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  async function registerUser(e) {
    e.preventDefault()

    const response = await axios
      .post('/auth/register', {
        email,
        username,
        password
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
    if (response) {
      alert('Register sucessfully')
    }
    setUsername('')
    setPassword('')
    setEmail('')
  }
  return (
    <div className='max-w-7xl my-12 mx-auto'>
      <div className='flex justify-between'>
        <img src={logo} alt='aerocamp logo' />
        <Link to='/home'>
          <div className='flex items-center gap-3 cursor-pointer hover:underline'>
            <span>
              <img src={backArrow} alt='' />
            </span>
            <p>Back to campgrounds</p>
          </div>
        </Link>
      </div>
      <div className='flex mt-24 px-12'>
        <div className='w-1/2'>
          <h1 className='font-bold text-3xl'>
            Start exploring camp from all <br /> over the world.
          </h1>
          <form className='mt-8' onSubmit={registerUser}>
            <div className='flex flex-col gap-2'>
              <label
                id='username'
                className='text-xl text-[#544848]'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='primary w-3/4 p-3 rounded-sm'
                type='text'
                value={email}
                name='email'
                id='email'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                id='username'
                className='text-xl text-[#544848]'
                htmlFor='username'
              >
                Username
              </label>
              <input
                className='primary w-3/4 p-3 rounded-sm'
                type='text'
                value={username}
                name='username'
                id='username'
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
              <label
                id='password'
                className='text-xl text-[#544848]'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='primary w-3/4 p-3 rounded-sm'
                type='password'
                value={password}
                name='password'
                id='password'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div>
              <button className='primary w-3/4 p-3 bg-black text-white mt-8'>
                Sign up
              </button>
            </div>
          </form>
          <div className='mt-4'>
            <p>
              Already a user?
              <Link to='/login' className='text-blue-600 ml-1' href=''>
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className='w-1/2'>
          <div className='w-3/4'>
            <h1 className='font-bold text-3xl leading-10'>
              “YelpCamp has honestly saved me hours of research time, and the
              camps on here are definitely well picked and added.”{' '}
            </h1>
            <div className='flex items-center mt-4 gap-3'>
              <img src={testimonialAvatar} alt='' />
              <div>
                <h3 className='font-bold text-lg'>Nathaniel Ng</h3>
                <p className=' text-sm'>Professional Hiker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
