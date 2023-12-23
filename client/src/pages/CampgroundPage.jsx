import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import marker from '../assets/marker.svg'
import CampgroundDetail from '../components/CampgroundDetail'
import CampgroundReviewList from '../components/CampgroundReview'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

function CampgroundPage() {
  const { id } = useParams()
  const [campground, setCampground] = useState(null)
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)
  const [showCampgroundInfo, setShowCampgroundInfo] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/campgrounds/${id}`)
        setCampground(response.data.campground)
        setReviews(response.data.campground.reviews)
      } catch (err) {
        setError(err.message)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, reviews])

  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <div className='mt-16 flex justify-between '>
      {campground && campground.geometry && (
        <ReactMapGl
          mapLib={import('mapbox-gl')}
          initialViewState={{
            longitude: campground.geometry.coordinates[0],
            latitude: campground.geometry.coordinates[1],
            zoom: 14
          }}
          style={{ width: 400, height: 500 }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
        >
          <Marker
            longitude={campground.geometry.coordinates[0]}
            latitude={campground.geometry.coordinates[1]}
          >
            <div className='relative'>
              <button
                className=' bg-transparent cursor-pointer border-none'
                onMouseEnter={() => setShowCampgroundInfo(true)}
                onMouseLeave={() => setShowCampgroundInfo(false)}
              >
                <img src={marker} alt='campground marker' />
              </button>
            </div>
          </Marker>
          {showCampgroundInfo ? (
            <Popup
              longitude={campground.geometry.coordinates[0]}
              latitude={campground.geometry.coordinates[1]}
            >
              <div
                className='bg-white w-auto h-auto '
                onMouseEnter={() => setShowCampgroundInfo(true)}
                onMouseLeave={() => setShowCampgroundInfo(false)}
              >
                <div>
                  <div className='flex justify-between flex-col'>
                    <h1 className='font-bold text-lg whitespace-nowrap'>
                      {campground.name}
                    </h1>
                    <p className=''>${campground.price}/night</p>
                    <p className='text-md text-[#544848]'>
                      {campground.location}
                    </p>
                  </div>
                </div>
              </div>
            </Popup>
          ) : null}
        </ReactMapGl>
      )}

      <div className='flex flex-col gap-2 w-3/5'>
        {campground && <CampgroundDetail campground={campground} />}
        <CampgroundReviewList reviews={reviews} />
      </div>
    </div>
  )
}
export default CampgroundPage
