import ImagesUploader from '../ImagesUploader'
import back from '../../assets/back.svg'
import PropTypes from 'prop-types'
function CampgroundForm({
  cancelOpenForm,
  user,
  submitEvent,
  title,
  addedImages,
  setAddedImages,
  description,
  setDescription,
  location,
  setLocation,
  price,
  setPrice,
  name,
  setName
}) {
  return (
    <div className='flex mt-26 px-12 justify-center items-center'>
      <div className='border border-1 border-black w-2/3 h-[60vh] rounded-md bg-black'>
        <form className='h-full' onSubmit={submitEvent}>
          <div className='h-[10%] border-b border-white flex items-center p-4'>
            <div className='flex justify-between w-full'>
              <button className='bg-black' onClick={cancelOpenForm}>
                <img src={back} alt='' />
              </button>
              <p className='text-white font-bold text-xl'>{title}</p>
              <button
                className='bg-black text-white font-bold text-xl'
                type='submit'
              >
                Share
              </button>
            </div>
          </div>
          <div className='h-[90%] rounded-b-3xl'>
            <div className='flex flex-row h-full'>
              <div className='flex items-center justify-center flex-[1.5]'>
                <ImagesUploader
                  addedImages={addedImages}
                  setAddedImages={setAddedImages}
                />
              </div>
              <div className='flex-1 p-4 h-full border-l border-white'>
                <div className='h-3/5'>
                  <p className='text-lg text-white font-semibold'>
                    {user ? user.username : 'Loading...'}
                  </p>
                  <textarea
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Write a description'
                    className='bg-black text-white border-none  outline-none p-0 mt-2'
                  />
                </div>
                <div className='h-2/5 flex flex-col gap-4'>
                  <label htmlFor='' className='flex gap-2'>
                    <p className='text-white'>Add location</p>
                    <input
                      type='text'
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className='bg-black text-white border-none  outline-none'
                    />
                  </label>
                  <label htmlFor='' className='flex gap-2'>
                    <p className='text-white'>Name:</p>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='bg-black text-white border-none  outline-none'
                    />
                  </label>
                  <label htmlFor='' className='flex gap-2'>
                    <p className='text-white'>Price:</p>
                    <input
                      type='text'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className='bg-black text-white border-none  outline-none'
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
CampgroundForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
    // Add other user properties as needed
  }),
  submitEvent: PropTypes.func.isRequired,
  title: PropTypes.string, // Assuming title is a string
  addedImages: PropTypes.arrayOf(PropTypes.string),
  setAddedImages: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  setPrice: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  cancelOpenForm: PropTypes.func
}
export default CampgroundForm
