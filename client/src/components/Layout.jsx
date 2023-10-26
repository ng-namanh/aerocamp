import { Outlet } from 'react-router-dom'
import Header from './Header'
function Layout() {
  return (
    <div className='max-w-7xl my-12 mx-auto'>
      <Header />
      <Outlet />
    </div>
  )
}
export default Layout
