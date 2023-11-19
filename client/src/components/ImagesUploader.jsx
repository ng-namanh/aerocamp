// import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import imageSvg from '../assets/image.svg'
import { useState } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export default function ImagesUploader({ addedImages, onChange }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? addedImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }
  const nextSlide = () => {
    const isLastSlide = currentIndex === addedImages.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

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
        onChange((prev) => {
          return [...prev, ...filenames]
        })
      })
  }
  function removePhoto(event, filename) {
    event.preventDefault()
    onChange([...addedImages.filter((photo) => photo !== filename)])
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
          <div
            style={{
              backgroundImage: `url(http://localhost:5000/uploads/${addedImages[currentIndex]})`
            }}
            className='rounded-bl-3xl w-full h-full object-cover bg-cover bg-center relative group'
          >
            <div className='cursor-pointer absolute bottom-1 right-1 text-white bg-black rounded-xl p-2'>
              <MdDelete
                onClick={(event) => {
                  removePhoto(event, addedImages[currentIndex])
                }}
              />
            </div>
            {addedImages.length > 1 && (
              <>
                <div
                  onClick={prevSlide}
                  className='flex justify-center items-center'
                >
                  <FaChevronCircleLeft
                    size={30}
                    onClick={prevSlide}
                    className='hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 left-5 text-2xl rounded-full bg-black text-white cursor-pointer'
                  />
                </div>
                <div
                  onClick={nextSlide}
                  className='flex justify-center items-center'
                >
                  <FaChevronCircleRight
                    size={30}
                    onClick={nextSlide}
                    className='hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 right-5 text-2xl rounded-full bg-black text-white cursor-pointer'
                  />
                </div>
              </>
            )}
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
  onChange: PropTypes.func.isRequired
}
