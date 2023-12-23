import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { SendHorizontal } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'
import { formatTime } from '../helper/timeFormat'
function CampgroundReviewList({ reviews }) {
  const [reviewContent, setReviewContent] = useState('')

  const { id } = useParams()
  async function postReview(e) {
    e.preventDefault()
    await axios.post(
      `/campgrounds/${id}/review`,
      { content: reviewContent },
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
    setReviewContent('')
  }

  return (
    <div className='border-1 border border-black py-4 px-8'>
      {reviews.reverse().map((review) => (
        <div key={review._id} className=' border-b border-black pb-6 mt-6'>
          <div className='flex justify-between'>
            <h1 className='font-bold text-lg'>{review.author.username}</h1>
            <p className=' text-gray-500'>{formatTime(review.createdAt)}</p>
          </div>
          <div className='mt-4'>
            <p className=' text-base'>{review.content}</p>
          </div>
        </div>
      ))}
      <form className='my-6 flex gap-4' onSubmit={postReview}>
        <input
          type='text'
          className='outline-none flex-1'
          placeholder='Leave a review...'
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />

        <button className='p-3 flex gap-3 text-lg border-none hover:text-blue-500 transition-all'>
          <SendHorizontal />
        </button>
      </form>
    </div>
  )
}
CampgroundReviewList.propTypes = {
  reviews: PropTypes.array.isRequired
}
export default CampgroundReviewList
