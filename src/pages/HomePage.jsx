import CampgroundGallery from '../components/CampgroundGallery'
import CampgroundSearch from '../components/CampgroundSearch'
function HomePage() {
  return (
    <div className='w-4/4 h-auto mt-20 mx-auto'>
      <CampgroundSearch />
      <CampgroundGallery />
    </div>
  )
}
export default HomePage
