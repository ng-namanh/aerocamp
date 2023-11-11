import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import mapImg from '../assets/map.png'
import CampgroundDetail from '../components/CampgroundDetail'
import CampgroundReviewList from '../components/CampgroundReview'

function CampgroundPage() {
  const { id } = useParams()
  const [campground, setCampground] = useState(null)
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/campgrounds/${id}`).then((response) => {
      setCampground(response.data.campground)
      setReviews(response.data.campground.reviews)
    })
  }, [id])

  return (
    <div className='mt-16 flex justify-between '>
      <div>
        <img src={mapImg} alt='map' />
      </div>
      <div className='flex flex-col gap-2 w-3/5'>
        {campground && <CampgroundDetail campground={campground} />}
        <CampgroundReviewList reviews={reviews} />
      </div>
    </div>
  )
}
export default CampgroundPage
