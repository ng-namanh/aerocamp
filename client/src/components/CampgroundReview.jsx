import commentIcon from '../assets/comment.svg'

function CampgroundReview() {
  const reviewData = [
    {
      id: 1,
      author: 'Adam Jones',
      content:
        'Honestly one of the best experience ever, took us a while to figure out how to get there but it was amazing',
      timestamp: '13'
    },
    {
      id: 2,
      author: 'Adam Jones',
      content:
        'Honestly one of the best experience ever, took us a while to figure out how to get there but it was amazing',
      timestamp: '13'
    },
    {
      id: 3,
      author: 'Adam Jones',
      content:
        'Honestly one of the best experience ever, took us a while to figure out how to get there but it was amazing',
      timestamp: '13'
    }
  ]

  return (
    <div className='border-1 border border-black py-4 px-8'>
      {reviewData.map((review) => (
        <div key={review.id} className=' border-b border-black pb-6 mt-6'>
          <div className='flex justify-between'>
            <h1 className='font-bold text-lg'>{review.author}</h1>
            <p>{review.timestamp}h ago</p>
          </div>
          <div className='mt-4'>
            <p className=' text-base'>{review.content}</p>
          </div>
        </div>
      ))}
      <div className='my-6'>
        <button className='primary p-3 bg-black text-white flex gap-3 text-lg'>
          <span>
            <img src={commentIcon} alt='' />
          </span>
          Leave a Review
        </button>
      </div>
    </div>
  )
}
export default CampgroundReview
