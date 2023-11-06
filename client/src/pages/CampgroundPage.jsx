import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import mapImg from '../assets/map.png'
import CampgroundDetail from '../components/CampgroundDetail'
import CampgroundReview from '../components/CampgroundReview'

function CampgroundPage() {
  const { id } = useParams()
  const [campground, setCampground] = useState(null)
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/campgrounds/${id}`).then((response) => {
      setCampground(response.data)
    })
  }, [id])
  console.log(campground)
  return (
    <div className='mt-16 flex justify-between '>
      <div>
        <img src={mapImg} alt='map' />
      </div>
      <div className='flex flex-col gap-2 w-3/5'>
        {campground && <CampgroundDetail campground={campground} />}
        <CampgroundReview />
      </div>
    </div>
  )
}
export default CampgroundPage
