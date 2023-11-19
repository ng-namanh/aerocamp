import axios from 'axios'
import PropTypes from 'prop-types'
import imageSvg from '../assets/image.svg'
import Slider from './common/slider'

export default function ImagesUploader({ addedImages, setAddedImages }) {
  const token = localStorage.getItem('token')

  function uploadPhoto(event) {
    const files = event.target.files
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('images', files[i])
    }
    axios
      .post('/campgrounds/upload', data, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: token
        }
      })
      .then((response) => {
        const { data: filenames } = response
        setAddedImages((prev) => {
          return [...prev, ...filenames]
        })
      })
  }

  function UploadImage() {
    return (
      <div className='flex flex-col gap-4'>
        <img className=' w-40' src={imageSvg} alt='' />
        <label className='my-auto mx-auto w-full cursor-pointer flex items-center justify-center gap-2 border bg-white rounded-md p-2 text-base text-black '>
          <input
            type='file'
            multiple
            className='hidden'
            onChange={uploadPhoto}
          />
          Select from computer
        </label>
      </div>
    )
  }
  return (
    <>
      <div className='flex items-center justify-center w-full h-full'>
        {addedImages.length > 0 ? (
          <div className='rounded-bl-3xl w-full h-full'>
            <Slider addedImages={addedImages} />
          </div>
        ) : (
          <UploadImage />
        )}
      </div>
    </>
  )
}
ImagesUploader.propTypes = {
  addedImages: PropTypes.array.isRequired,
  setAddedImages: PropTypes.func
}
