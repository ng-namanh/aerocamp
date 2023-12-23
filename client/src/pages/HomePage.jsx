import CampgroundGallery from '../components/CampgroundGallery'
import CampgroundSearch from '../components/CampgroundSearch'
import axios from 'axios'
import { useState, useEffect } from 'react'

function HomePage() {
  const [campgrounds, setCampgrounds] = useState(null)
  const [filteredCampgrounds, setFilteredCampgrounds] = useState(null)

  useEffect(() => {
    axios.get('/campgrounds').then(({ data }) => {
      setCampgrounds(data)
      setFilteredCampgrounds(data)
    })
  }, [])

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredCampgrounds(campgrounds)
    } else {
      const filteredData = campgrounds.filter((campground) =>
        campground.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredCampgrounds(filteredData)
    }
  }

  return (
    <div className='w-4/4 h-auto mt-20 mx-auto'>
      <CampgroundSearch onSearch={handleSearch} />
      {filteredCampgrounds && (
        <CampgroundGallery campgrounds={filteredCampgrounds} />
      )}
    </div>
  )
}

export default HomePage
