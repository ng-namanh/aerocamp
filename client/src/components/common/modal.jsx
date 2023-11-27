import { useState } from 'react'
import PropTypes from 'prop-types'
import CampgroundForm from './campgroundForm'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { useContext, useEffect } from 'react'
function Modal({ onChange, deleteCampground, campgroundId, updateCampground }) {
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
      // console.log(data.campground)
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
    await axios
      .put(
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
      .then(({ data }) => {
        onChange(false)
        setIsEditing(false)
        updateCampground(data.updatedCampground)
        console.log(data.updatedCampground)
      })
  }
  useEffect(() => {
    if (isEditing) {
      // Only fetch data if editing
      getCampgroundById(campgroundId)
    }
  }, [isEditing, campgroundId])
  return (
    <div className='fixed inset-0 overflow-y-auto'>
      <div className='flex z-50 items-center justify-center absolute inset-0 min-h-screen pt-4 px-4 pb-20 text-center sm:p-0'>
        <div
          className={` ${
            isEditing
              ? ' max-w-screen-xl opacity-100'
              : 'sm:max-w-sm bg-black shadow-xl'
          }    align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:w-full`}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          {isEditing ? (
            <div className='flex flex-col w-full'>
              <CampgroundForm
                cancelOpenForm={handleCancelClick}
                user={user}
                submitEvent={(e) => {
                  e.preventDefault()
                  editCampground(e, campgroundId)
                }}
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
              <div className='bg-black px-4 py-3 sm:px-6 flex sm:flex-row-reverse items-center justify-center w-full text-lg'>
                <button
                  className='border-none bg-black text-white p-2 w-full'
                  onClick={() => {
                    deleteCampground(campgroundId)
                  }}
                >
                  Delete
                </button>
              </div>
              <div className=' px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center border-white border-y-2 text-lg'>
                <button
                  className='bg-black text-white border-none p-2 w-full'
                  onClick={() => handleEditClick(campgroundId)}
                >
                  Edit
                </button>
              </div>
              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center text-lg'>
                <button
                  className='bg-black text-white border-none p-2 w-full'
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
  updateCampground: PropTypes.func,
  campgroundId: PropTypes.string
}
export default Modal
