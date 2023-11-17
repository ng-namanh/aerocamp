// import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import imageSvg from '../assets/image.svg'

export default function ImagesUploader({ addedImages, onChange }) {
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
          'Content-type': 'muiltipart/form-data',
          Authorization: token
        }
      })
      .then((response) => {
        const { data: filenames } = response
        console.log(data)
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
          addedImages.map((link) => (
            <div
              key={link}
              className='rounded-b-2xl w-full h-full object-cover relative'
            >
              <img
                className='rounded-bl-3xl w-full h-full object-cover '
                src={'http://localhost:5000/uploads/' + link}
                alt=''
              />
              <button
                onClick={(event) => {
                  removePhoto(event, link)
                }}
                className='cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'
              >
                delete
              </button>
            </div>
          ))
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
