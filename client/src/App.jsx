import Layout from './components/Layout'
import UserContextProvider from './context/UserContext'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import NewCampgroundPage from './pages/NewCampgroundPage'
import CampgroundPage from './pages/CampgroundPage'
import ReviewPage from './pages/NewReviewPage'
axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/new-campground' element={<NewCampgroundPage />} />
          <Route path='/campground/:id' element={<CampgroundPage />} />
          <Route path='/campground/:id/post-review' element={<ReviewPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
