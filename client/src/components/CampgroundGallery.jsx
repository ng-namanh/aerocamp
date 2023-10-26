import campgroundImg from '../assets/campground1.png'
import arrow from '../assets/arrow.svg'
function CampgroundGallery() {
  const campgroundData = [
    {
      title: 'Latik Riverside',
      img: campgroundImg,
      description:
        ' A paradise of island that can rival the white sand beauty of Boracay'
    },
    {
      title: 'Latik Riverside',
      img: campgroundImg,
      description:
        ' A paradise of island that can rival the white sand beauty of Boracay'
    },
    {
      title: 'Latik Riverside',
      img: campgroundImg,
      description:
        ' A paradise of island that can rival the white sand beauty of Boracay'
    },
    {
      title: 'Latik Riverside',
      img: campgroundImg,
      description:
        ' A paradise of island that can rival the white sand beauty of Boracay'
    }
  ]
  return (
    <div className='flex flex-col items-center'>
      <div className='grid grid-cols-4 gap-12 mt-16'>
        {campgroundData.map((item, index) => (
          <div key={index} className='border border-black rounded-md p-2'>
            <img src={item.img} alt='' />
            <div className='my-4'>
              <h3 className='font-bold'>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <button className='primary bg-white py-3 px-6 w-full'>
                View campground
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-12'>
        <button className='secondary flex gap-4 w-44 items-center justify-center'>
          View more
          <span>
            <img src={arrow} alt='' />
          </span>
        </button>
      </div>
    </div>
  )
}
export default CampgroundGallery
