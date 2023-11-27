import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { MoreHorizontal } from 'lucide-react'
import Modal from '../components/common/modal'
import { Navigate, Link } from 'react-router-dom'
function CampgroundProfilePage() {
  const { user } = useContext(UserContext)

  const [userCampgrounds, setUserCampground] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  //   const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get('/campgrounds').then(({ data }) => {
      setUserCampground(
        data.filter((campground) => {
          return user ? campground.author.username === user.username : null
        })
      )
      //   setLoading(false)
    })
  }, [user])
  // console.log(userCampgrounds)

  const deleteCampground = (campgroundId) => {
    axios
      .delete(`/campgrounds/${campgroundId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        const updatedCampgrounds = userCampgrounds.filter(
          (campground) => campground._id !== campgroundId
        )
        setUserCampground(updatedCampgrounds)
        setIsOpen(false)
        setRedirect(true)
      })
  }

  const updateCampground = (updatedCampground) => {
    const updatedCampgrounds = userCampgrounds.map((campground) =>
      campground._id === updatedCampground._id ? updatedCampground : campground
    )

    setUserCampground(updatedCampgrounds)
  }
  if (redirect) {
    return <Navigate to='/new-campground' />
  }

  return (
    <div className='max-w-7xl mt-28 mx-auto'>
      <div className='grid grid-cols-4 gap-4 mt-16'>
        {userCampgrounds &&
          userCampgrounds.map((userCampground) => (
            <div key={userCampground._id} className=''>
              <div className='group p-2 relative '>
                <Link to={'/campground/' + userCampground._id}>
                  <img
                    src={
                      'http://localhost:5000/uploads/' +
                      userCampground.images[0]
                    }
                    alt=''
                    className=' w-72 h-64 object-cover rounded-xl bg-transparent'
                  />
                </Link>
                <div className='my-4'>
                  <div>
                    <div className='flex justify-between '>
                      <h3 className='font-bold text-ellipsis overflow-hidden break-words whitespace-nowrap w-2/3'>
                        {userCampground.name}
                      </h3>
                      <h3>
                        <span className='font-bold mr-1'>
                          ${userCampground.price}
                        </span>
                        night
                      </h3>
                    </div>
                    <h4 className='text-[#544848] text-ellipsis overflow-hidden break-words whitespace-nowrap'>
                      {userCampground.location}
                    </h4>
                  </div>
                </div>
                <div className='hidden absolute top-2 right-4 group-hover:block cursor-pointer'>
                  <MoreHorizontal
                    size={30}
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      setIsOpen(userCampground._id)
                    }}
                  />
                </div>
              </div>
              <div className=''>
                {isOpen && (
                  <Modal
                    onChange={() => setIsOpen(false)}
                    campgroundId={isOpen}
                    deleteCampground={deleteCampground}
                    updateCampground={updateCampground}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
export default CampgroundProfilePage
