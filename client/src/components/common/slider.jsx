import PropTypes from 'prop-types'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
// import { MdDelete } from 'react-icons/md'
import { useState } from 'react'

function Slider({ addedImages }) {
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
  //   function removePhoto(event, filename) {
  //     event.preventDefault()
  //     onChange([...addedImages.filter((photo) => photo !== filename)])
  //   }
  return (
    <div
      style={{
        backgroundImage: `url(http://localhost:5000/uploads/${addedImages[currentIndex]})`
      }}
      className=' w-full h-full object-cover bg-cover bg-center relative group'
    >
      {/* <div className='cursor-pointer absolute bottom-1 right-1 text-white bg-black rounded-xl p-2'>
        <MdDelete
          onClick={(event) => {
            removePhoto(event, addedImages[currentIndex])
          }}
        />
      </div> */}
      {addedImages.length > 1 && (
        <>
          <div onClick={prevSlide} className='flex justify-center items-center'>
            <FaChevronCircleLeft
              size={30}
              onClick={prevSlide}
              className='hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 left-5 text-2xl rounded-full bg-black text-white cursor-pointer'
            />
          </div>
          <div onClick={nextSlide} className='flex justify-center items-center'>
            <FaChevronCircleRight
              size={30}
              onClick={nextSlide}
              className='hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 right-5 text-2xl rounded-full bg-black text-white cursor-pointer'
            />
          </div>
        </>
      )}
    </div>
  )
}
Slider.propTypes = {
  addedImages: PropTypes.array.isRequired
}
export default Slider
