import { useContext, useState } from 'react'
import axios from 'axios'
// import ImagesUploader from '../components/ImagesUploader'
// import back from '../assets/back.svg'
import { UserContext } from '../context/UserContext'
import CampgroundForm from '../components/common/campgroundForm'
import { Navigate } from 'react-router-dom'
function NewCampgroundPage() {
  const { user } = useContext(UserContext)

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [addedImages, setAddedImages] = useState([])
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [redirect, setRedirect] = useState(false)
  const token = localStorage.getItem('token')

  const newCampground = async (e) => {
    e.preventDefault()
    await axios
      .post(
        '/campgrounds/new',
        {
          name,
          location,
          images: addedImages,
          price,
          description
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(() => {
        setRedirect(true)
      })
  }
  if (redirect) {
    return <Navigate to='/home' />
  }

  return (
    <div className='max-w-7xl mt-28 mx-auto'>
      <CampgroundForm
        title='New Campground'
        submitEvent={newCampground}
        user={user}
        name={name}
        location={location}
        price={price}
        addedImages={addedImages}
        setLocation={setLocation}
        description={description}
        setDescription={setDescription}
        setPrice={setPrice}
        setName={setName}
        setAddedImages={setAddedImages}
      />
    </div>
  )
}
export default NewCampgroundPage
