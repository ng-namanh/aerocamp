import commentIcon from '../assets/comment.svg'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
function CampgroundReviewList({ reviews }) {
  const { id } = useParams()

  return (
    <div className='border-1 border border-black py-4 px-8'>
      {reviews.map((review) => (
        <div key={review._id} className=' border-b border-black pb-6 mt-6'>
          <div className='flex justify-between'>
            <h1 className='font-bold text-lg'>{review.author.username}</h1>
            <p>{review.createdAt}h ago</p>
          </div>
          <div className='mt-4'>
            <p className=' text-base'>{review.content}</p>
          </div>
        </div>
      ))}
      <div className='my-6'>
        <Link to={'/campground/' + id + '/post-review/'}>
          <button className='primary p-3 bg-black text-white flex gap-3 text-lg'>
            <span>
              <img src={commentIcon} alt='' />
            </span>
            Leave a Review
          </button>
        </Link>
      </div>
    </div>
  )
}
CampgroundReviewList.propTypes = {
  reviews: PropTypes.array.isRequired
}
export default CampgroundReviewList
