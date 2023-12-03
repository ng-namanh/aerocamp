import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import mapImg from '../assets/map.png'
import CampgroundDetail from '../components/CampgroundDetail'
import CampgroundReviewList from '../components/CampgroundReview'
import ReactMapGl, { Marker } from 'react-map-gl'

function CampgroundPage() {
  const { id } = useParams()
  const [campground, setCampground] = useState(null)
  const [reviews, setReviews] = useState([])
  // const [viewport, setViewport] = useState({
  //   latitude: 45.4211,
  //   longtitude: -75.6903,
  //   width: '200px',
  //   height: '200px',
  //   zoom: 10
  // })

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
        <ReactMapGl
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14
          }}
          style={{ width: 400, height: 500 }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
        >
          <Marker longitude={-122.4} latitude={37.8}>
            <div>Hello this is campground</div>
          </Marker>
        </ReactMapGl>
      </div>
      <div className='flex flex-col gap-2 w-3/5'>
        {campground && <CampgroundDetail campground={campground} />}
        <CampgroundReviewList reviews={reviews} />
      </div>
    </div>
  )
}
export default CampgroundPage
