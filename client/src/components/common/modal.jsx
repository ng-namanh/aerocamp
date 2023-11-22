import { useState } from 'react'
import PropTypes from 'prop-types'
import CampgroundForm from './campgroundForm'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { useContext, useEffect } from 'react'
function Modal({ onChange, deleteCampground, campgroundId }) {
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [addedImages, setAddedImages] = useState([])
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const getCampgroundById = async (campgroundId) => {
    // Use the campgroundId parameter in your function
    await axios.get(`/campgrounds/${campgroundId}`).then(({ data }) => {
      console.log(data.campground)
      setName(data.campground.name)
      setLocation(data.campground.location)
      setPrice(data.campground.price)
      setDescription(data.campground.description)
      setAddedImages(data.campground.images)
    })
  }

  const handleEditClick = (campgroundId) => {
    setIsEditing(true)
    getCampgroundById(campgroundId)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    onChange(false)
  }
  const editCampground = async (e, campgroundId) => {
    e.preventDefault()
    await axios.put(
      `/campgrounds/${campgroundId}`,
      {
        name,
        location,
        images: addedImages,
        price,
        description
      },
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
  }
  useEffect(() => {
    if (isEditing) {
      // Only fetch data if editing
      getCampgroundById(campgroundId)
    }
  }, [isEditing, campgroundId])
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          {isEditing ? (
            <div className='flex flex-col w-full'>
              <CampgroundForm
                user={user}
                submitEvent={editCampground}
                title='Edit Campground'
                name={name}
                setName={setName}
                addedImages={addedImages}
                setAddedImages={setAddedImages}
                description={description}
                setDescription={setDescription}
                location={location}
                setLocation={setLocation}
                price={price}
                setPrice={setPrice}
              />
              <div>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col w-full'>
              <div className='px-4 py-3 sm:px-6 flex sm:flex-row-reverse items-center justify-center w-full text-lg'>
                <button
                  className='border-none p-2 w-full'
                  onClick={() => {
                    deleteCampground(campgroundId)
                  }}
                >
                  Delete
                </button>
              </div>
              <div className=' px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center border-black border-y-2 text-lg'>
                <button
                  className=' border-none p-2 w-full'
                  onClick={() => handleEditClick(campgroundId)}
                >
                  Edit
                </button>
              </div>
              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center text-lg'>
                <button
                  className=' border-none p-2 w-full'
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
Modal.propTypes = {
  onChange: PropTypes.func.isRequired,
  deleteCampground: PropTypes.func,
  campgroundId: PropTypes.string
}
export default Modal
