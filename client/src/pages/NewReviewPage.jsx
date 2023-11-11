import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ReviewPage() {
  const [reviewContent, setReviewContent] = useState('')
  const { id: campgroundId } = useParams()

  const token = localStorage.getItem('token')
  async function postReview(e) {
    e.preventDefault()
    await axios.post(
      `/campgrounds/${campgroundId}/review`,
      { content: reviewContent },
      {
        headers: {
          Authorization: token
        }
      }
    )
    setReviewContent('')
  }

  return (
    <div className='max-w-7xl my-12 mx-auto'>
      <div className='flex mt-24 px-12 justify-center items-center'>
        <div className='w-1/2'>
          <h1 className='font-bold text-3xl text-center'>Give your reviews</h1>
          <form
            className='flex justify-center flex-col items-center'
            onSubmit={postReview}
          >
            <div className='flex flex-col gap-2 mt-4 w-full'>
              <label
                id='descrition'
                className='text-xl text-[#544848]'
                htmlFor='descrition'
              >
                Description
              </label>
              <textarea
                name='description'
                id=''
                cols='30'
                rows='10'
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              ></textarea>
            </div>
            <div className='w-full'>
              <button className='primary p-3 bg-black text-white mt-8 w-full '>
                Post review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ReviewPage
